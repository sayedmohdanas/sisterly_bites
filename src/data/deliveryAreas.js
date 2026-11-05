/**
 * Default delivery areas for Sisterly Bites Cloud Kitchen in Mau (UP).
 * These areas are used across the Hero section, order checkout modal,
 * and review submission forms.
 */

export const DEFAULT_DELIVERY_AREAS = [
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

export const PREFERRED_DELIVERY_ORDER = DEFAULT_DELIVERY_AREAS.map(a => a.name.toLowerCase());

