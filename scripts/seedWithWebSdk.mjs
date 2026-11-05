import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyVWWfhnb_izENSSGFfjpFnM280t0tQNY",
  authDomain: "sisterlybites-94628.firebaseapp.com",
  projectId: "sisterlybites-94628",
  storageBucket: "sisterlybites-94628.firebasestorage.app",
  messagingSenderId: "153432873617",
  appId: "1:153432873617:web:0308cc05dd918ec8bffd30",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runSeed() {
  console.log("🚀 Testing write to sisterlybites-94628...");

  try {
    // 1. Seed campaign
    const campaignRef = doc(db, "campaigns", "spin_and_win");
    await setDoc(campaignRef, {
      enabled: true,
      campaignName: "Spin & Win",
      spinDurationMs: 8500,
      repeatEnabled: true,
      repeatAfterDays: 2,
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Seeded campaigns/spin_and_win");

    // 2. Seed 7 prizes
    const prizes = [
      { id: "25-off-combo", name: "₹25 OFF ON BURGER & FRIES COMBO", weight: 10, enabled: true, couponPrefix: "SB25", isWinning: true },
      { id: "10-off", name: "₹10 OFF", weight: 50, enabled: true, couponPrefix: "SB10", isWinning: true },
      { id: "20-off", name: "₹20 OFF", weight: 15, enabled: true, couponPrefix: "SB20", isWinning: true },
      { id: "better-luck", name: "BETTER LUCK NEXT TIME", weight: 10, enabled: true, couponPrefix: null, isWinning: false },
      { id: "15-off", name: "₹15 OFF", weight: 10, enabled: true, couponPrefix: "SB15", isWinning: true },
      { id: "30-off-meal", name: "₹30 OFF ON ORDERS ABOVE ₹299", weight: 5, enabled: true, couponPrefix: "SB30", isWinning: true },
      { id: "free-campa-10", name: "FREE DRINK WORTH ₹10", weight: 55, enabled: true, couponPrefix: "SBFREE", isWinning: true }
    ];

    for (const p of prizes) {
      await setDoc(doc(db, "prizes", p.id), { ...p, updatedAt: serverTimestamp() });
      console.log(`✅ Seeded prizes/${p.id}`);
    }

    // 3. Seed 10 delivery areas
    const areas = [
      { id: "mirza-hadi-pura", name: "Mirza Hadi Pura" },
      { id: "astupura", name: "Astupura" },
      { id: "domanpura", name: "Domanpura" },
      { id: "keyari-tola", name: "Keyari Tola" },
      { id: "malik-tahir-pura", name: "Malik Tahir Pura" },
      { id: "munshi-pura", name: "Munshi Pura" },
      { id: "sahadatpura", name: "Sahadatpura" },
      { id: "bulaki-pura", name: "Bulaki Pura" },
      { id: "chitanpura-bagh", name: "Chitanpura Bagh" },
      { id: "mirzahadipura-chowk", name: "Mirzahadipura Chowk" },
    ];

    for (const a of areas) {
      await setDoc(doc(db, "villages", a.id), { name: a.name, active: true, updatedAt: serverTimestamp() });
      console.log(`✅ Seeded villages/${a.id}`);
    }

    // 4. Seed initial review
    await addDoc(collection(db, "reviews"), {
      name: "Afzal Jamal",
      village: "Mirza Hadi Pura",
      rating: 5,
      text: "Crispy fries, juicy zinger burger and aromatic biryani! Super fast delivery in Mau.",
      createdAt: serverTimestamp(),
    });
    console.log("✅ Seeded initial review in reviews collection");

    console.log("\n🎉 ALL COLLECTIONS SUCCESSFULLY SEEDED IN FIRESTORE!");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Firestore write error:", err.code, "-", err.message);
    process.exit(1);
  }
}

runSeed();
