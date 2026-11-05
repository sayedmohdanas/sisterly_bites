import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

async function addSamples() {
  // Sample spin
  await addDoc(collection(db, "spins"), {
    spinId: `sb_test_${Date.now()}`,
    userName: "Afzal Jamal",
    prizeId: "10-off",
    prizeName: "₹10 OFF",
    couponCode: "SB10TEST",
    isWinning: true,
    createdAt: serverTimestamp(),
    timestamp: new Date().toISOString(),
  });
  console.log("✅ Seeded sample spin in collection: spins");

  // Sample order
  await addDoc(collection(db, "orders"), {
    customerName: "Afzal Jamal",
    contactNumber: "7007130132",
    deliveryAddress: "Mirza Hadi Pura, Mau",
    landmark: "Near Chowk",
    items: [
      { name: "Classic Fries", quantity: 1, basePrice: 89 },
      { name: "Chicken Biryani (Half)", quantity: 1, basePrice: 70 }
    ],
    totalPrice: 159,
    activeOffer: {
      prizeName: "₹10 OFF",
      couponCode: "SB10TEST"
    },
    status: "sample_order",
    createdAt: serverTimestamp(),
  });
  console.log("✅ Seeded sample order in collection: orders");
}

addSamples().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });

