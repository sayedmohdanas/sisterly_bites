import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

// Helper to locate Firebase service account JSON key file in root directory
const findServiceAccountKey = () => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }

  const rootDir = process.cwd();
  const candidates = [
    path.join(rootDir, "serviceAccountKey.json"),
    path.join(rootDir, "firebase-service-account.json"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // Look for any file matching *-service-account*.json or sisterly-*.json in root
  try {
    const files = fs.readdirSync(rootDir);
    const keyFile = files.find(f => (f.includes("service-account") || f.includes("firebase-adminsdk")) && f.endsWith(".json"));
    if (keyFile) return path.join(rootDir, keyFile);
  } catch (e) {
    // Ignore read directory error
  }

  return null;
};

const serviceAccountPath = findServiceAccountKey();

if (!serviceAccountPath) {
  console.error("\n❌ Firebase Service Account JSON key missing!");
  console.error("==========================================================================");
  console.error("To seed Firestore securely using Firebase Admin SDK:");
  console.error("1. Go to Firebase Console → Project Settings → Service accounts tab");
  console.error("2. Click 'Generate new private key'");
  console.error("3. Save the downloaded JSON file as 'serviceAccountKey.json' in project root.");
  console.error("==========================================================================");
  process.exit(1);
}

console.log("🔒 Loading Firebase Admin Service Account Key from:", serviceAccountPath);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

async function seedAdminData() {
  console.log("📌 Seeding campaign document: campaigns/spin_and_win");
  const campaignRef = db.collection("campaigns").doc("spin_and_win");
  await campaignRef.set({
    enabled: true,
    campaignName: "Spin & Win",
    spinDurationMs: 8500,
    repeatEnabled: true,
    repeatAfterDays: 2,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const seedPrizes = [
    {
      id: "25-off-combo",
      name: "₹25 OFF ON BURGER & FRIES COMBO",
      weight: 10,
      enabled: true,
      couponPrefix: "SB25",
      isWinning: true,
    },
    {
      id: "10-off",
      name: "₹10 OFF",
      weight: 50,
      enabled: true,
      couponPrefix: "SB10",
      isWinning: true,
    },
    {
      id: "20-off",
      name: "₹20 OFF",
      weight: 15,
      enabled: true,
      couponPrefix: "SB20",
      isWinning: true,
    },
    {
      id: "better-luck",
      name: "BETTER LUCK NEXT TIME",
      weight: 10,
      enabled: true,
      couponPrefix: null,
      isWinning: false,
    },
    {
      id: "15-off",
      name: "₹15 OFF",
      weight: 10,
      enabled: true,
      couponPrefix: "SB15",
      isWinning: true,
    },
    {
      id: "30-off-meal",
      name: "₹30 OFF ON ORDERS ABOVE ₹299",
      weight: 5,
      enabled: true,
      couponPrefix: "SB30",
      isWinning: true,
    },
    {
      id: "free-campa-10",
      name: "FREE DRINK WORTH ₹10",
      weight: 55,
      enabled: true,
      couponPrefix: "SBFREE",
      isWinning: true,
    }
  ];

  console.log(`📌 Seeding ${seedPrizes.length} prize documents in collection: prizes`);
  for (const prize of seedPrizes) {
    const { id, ...prizeData } = prize;
    const prizeRef = db.collection("prizes").doc(id);
    await prizeRef.set({
      ...prizeData,
      updatedAt: FieldValue.serverTimestamp(),
    });
    console.log(`   ✓ Seeded prize: prizes/${id} (${prize.name} - Weight: ${prize.weight})`);
  }

  // 3. Seed delivery villages / areas
  const defaultVillages = [
    "Mirza Hadi Pura",
    "Astupura",
    "Domanpura",
    "Keyari Tola",
    "Malik Tahir Pura",
    "Munshi Pura",
    "Sahadatpura",
    "Bulaki Pura",
    "Chitanpura Bagh",
    "Mirzahadipura Chowk"
  ];
  console.log(`📌 Seeding ${defaultVillages.length} delivery areas in collection: villages`);
  for (const villageName of defaultVillages) {
    const slug = villageName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const villageRef = db.collection("villages").doc(slug);
    await villageRef.set({
      name: villageName,
      active: true,
      createdAt: FieldValue.serverTimestamp(),
    });
    console.log(`   ✓ Seeded village: ${villageName}`);
  }

  // 4. Seed initial review
  console.log("📌 Seeding sample customer review in collection: reviews");
  const reviewRef = db.collection("reviews").doc();
  await reviewRef.set({
    name: "Mohd Anas",
    village: "Mirza Hadi Pura",
    rating: 5,
    text: "Crispy fries, juicy zinger burger and aromatic biryani! Super fast delivery in Mau.",
    createdAt: FieldValue.serverTimestamp(),
  });
  console.log("   ✓ Seeded sample review");

  console.log("✅ Firestore database seeding via Firebase Admin SDK completed successfully!");
  process.exit(0);
}

seedAdminData().catch((err) => {
  console.error("❌ Admin Seeding Failed:", err.message);
  process.exit(1);
});
