// Sisterly Bites Spin & Win Central Prize Configuration
const prizes = [
  {
    id: "25-off-combo",
    label: "₹25 OFF ON BURGER & FRIES COMBO",
    wheelLabel: "₹25 OFF",
    subLabel: "Burger & Fries Combo",
    type: "discount",
    value: 25,
    weight: 10,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SB25",
    bgColor: "#E63946", // Sisterly Crimson
    textColor: "#FFFFFF",
    badge: "COMBO DEAL",
    accentColor: "#FFD700"
  },
  {
    id: "10-off",
    label: "₹10 OFF",
    wheelLabel: "₹10 OFF",
    subLabel: "On Any Order",
    type: "discount",
    value: 10,
    weight: 50,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SB10",
    bgColor: "#FF9F1C", // Warm Amber
    textColor: "#1E293B",
    badge: "SAVINGS",
    accentColor: "#FFFFFF"
  },
  {
    id: "20-off",
    label: "₹20 OFF",
    wheelLabel: "₹20 OFF",
    subLabel: "On Orders Above ₹199",
    type: "discount",
    value: 20,
    weight: 15,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SB20",
    bgColor: "#FFB703", // Golden Yellow
    textColor: "#1E293B",
    badge: "BONUS",
    accentColor: "#E63946"
  },
  {
    id: "better-luck",
    label: "BETTER LUCK NEXT TIME",
    wheelLabel: "BETTER LUCK",
    subLabel: "NEXT TIME",
    type: "no_win",
    value: null,
    weight: 10,
    enabled: true,
    isWinningPrize: false,
    couponPrefix: null,
    bgColor: "#334155", // Charcoal Slate
    textColor: "#F8FAFC",
    badge: "TRY AGAIN",
    accentColor: "#94A3B8"
  },
  {
    id: "15-off",
    label: "₹15 OFF",
    wheelLabel: "₹15 OFF",
    subLabel: "Super Saver",
    type: "discount",
    value: 15,
    weight: 10,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SB15",
    bgColor: "#2A9D8F", // Fresh Teal
    textColor: "#FFFFFF",
    badge: "BIG DEAL",
    accentColor: "#FFD700"
  },
  {
    id: "30-off-meal",
    label: "₹30 OFF ON ORDERS ABOVE ₹299",
    wheelLabel: "₹30 OFF",
    subLabel: "On Orders Above ₹299",
    type: "discount",
    value: 30,
    weight: 5,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SB30",
    bgColor: "#F4A261", // Sunset Orange
    textColor: "#1E293B",
    badge: "YUMMY",
    accentColor: "#E63946"
  },
  {
    id: "free-campa-10",
    label: "FREE DRINK WORTH ₹10",
    wheelLabel: "FREE DRINK",
    subLabel: "Worth ₹10",
    type: "freebie",
    value: 10,
    weight: 55,
    enabled: true,
    isWinningPrize: true,
    couponPrefix: "SBFREE",
    bgColor: "#D90429", // Festive Red
    textColor: "#FFFFFF",
    badge: "FREE DRINK",
    accentColor: "#F1FAEE"
  }
];

export default prizes;
