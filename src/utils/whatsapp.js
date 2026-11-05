import { config } from "../config/config.js";

/**
 * Generates a wa.me URL with a pre-filled, URL-encoded message for Sisterly Bites WhatsApp ordering.
 * 
 * @param {object|string|null} prize 
 * @param {string|null} couponCode 
 * @param {string|null} userName 
 * @returns {string}
 */
export const getWhatsAppOrderLink = (prize = null, couponCode = null, userName = null, selectedItem = null, selectedSize = null, selectedPrice = null) => {
  const number = config.whatsappNumber;

  let greeting = `Hi ${config.brandName}! 🍟🍔`;
  if (userName && String(userName).trim().length > 0) {
    greeting = `Hi ${config.brandName}! I'm ${String(userName).trim()} 🍟🍔`;
  }

  let messageText = "";
  const isWinning = prize ? (typeof prize === "string" ? true : prize.isWinningPrize !== false) : false;
  const prizeLabel = typeof prize === "string" ? prize : (prize ? prize.label || prize.name : null);
  
  let finalOfferText = prizeLabel;
  if (prize && typeof prize !== "string" && prize.subLabel) {
    if (prizeLabel && !prizeLabel.toLowerCase().includes(prize.subLabel.toLowerCase())) {
      finalOfferText = `${prizeLabel} (${prize.subLabel})`;
    }
  }

  let itemText = "";
  if (selectedItem) {
    itemText = `\n\nI'd like to order:\nItem: ${selectedItem}`;
    if (selectedSize && selectedSize !== "regular" && selectedSize !== "portion") {
      itemText += `\nPortion: ${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}`;
    }
    if (selectedPrice) {
      itemText += `\nPrice: ₹${selectedPrice}`;
    }
  }

  if (isWinning && finalOfferText && couponCode) {
    messageText = `${greeting}\n\nI have an active Spin & Win offer 🎉\n\nOffer: ${finalOfferText}\nCoupon Code: ${couponCode}${itemText ? itemText : "\n\nI'd like to place an order."}`;
  } else {
    messageText = `${greeting}${itemText ? itemText : "\n\nI'd like to place an order."}`;
  }

  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

/**
 * Generates a WhatsApp order link for single or multi-item orders
 * with portions, quantities, addons, delivery details, coupon offers, and total bill.
 */
export const getWhatsAppPizzaOrderLink = ({
  items = null,
  pizzaName,
  size,
  basePrice,
  hasExtraCheese,
  extraCheesePrice = 20,
  quantity = 1,
  totalPrice,
  customerName = "",
  contactNumber = "",
  deliveryAddress = "",
  landmark = "",
  locationUrl = "",
  activeOffer = null,
}) => {
  const number = config.whatsappNumber;
  const nameTrimmed = String(customerName || "").trim();

  let deliverySection = "";
  const addressTrimmed = String(deliveryAddress || "").trim();
  const contactTrimmed = String(contactNumber || "").trim();
  const landmarkTrimmed = String(landmark || "").trim();
  const urlTrimmed = String(locationUrl || "").trim();

  if (nameTrimmed || contactTrimmed || addressTrimmed || landmarkTrimmed || urlTrimmed) {
    deliverySection = "\n\n📍 Delivery Details:";
    if (nameTrimmed) deliverySection += `\nName: ${nameTrimmed}`;
    if (contactTrimmed) deliverySection += `\nContact: ${contactTrimmed}`;
    if (addressTrimmed) deliverySection += `\nAddress: ${addressTrimmed}`;
    if (landmarkTrimmed) deliverySection += `\nLandmark: ${landmarkTrimmed}`;
    if (urlTrimmed) deliverySection += `\nCurrent Location:\n${urlTrimmed}`;
  }

  let offerText = "";
  if (activeOffer && activeOffer.couponCode) {
    offerText = `\n\n🎉 Active Offer: ${activeOffer.prizeName}\n🎟️ Coupon Code: ${activeOffer.couponCode}`;
  }

  // Multi-item formatting
  if (Array.isArray(items) && items.length > 0) {
    const formattedItems = items
      .map((it, idx) => {
        const isTikka = String(it.name || "").toLowerCase().includes("tikka");
        const isBiryani = String(it.name || "").toLowerCase().includes("biryani");
        const isFries = String(it.name || "").toLowerCase().includes("fries");
        const isBurger = String(it.name || "").toLowerCase().includes("burger");
        const icon = isFries ? "🍟" : (isBurger ? "🍔" : (isBiryani ? "🍲" : (isTikka ? "🍗" : "✨")));

        let sizeText = "";
        if ((isTikka || isBiryani) && it.size) {
          sizeText = `\n   Portion: ${it.size.charAt(0).toUpperCase() + it.size.slice(1)}`;
        }

        const safeItemQty = Math.max(1, Number(it.quantity) || 1);
        const addonText = it.hasExtraCheese ? `\n   🧀 Extra Cheese Dip: Yes (+₹${extraCheesePrice * safeItemQty})` : "";
        const unitText = safeItemQty > 1 ? `₹${it.basePrice} each` : `₹${it.basePrice}`;

        return `${idx + 1}. ${icon} *${it.name}*${sizeText}\n   Quantity: ${safeItemQty} • ${unitText}${addonText}`;
      })
      .join("\n\n");

    const greeting = nameTrimmed
      ? `Hi ${config.brandName}! I'm ${nameTrimmed} 🍟🍔`
      : `Hi ${config.brandName}! 🍟🍔`;

    const messageText = `${greeting}\n\nI'd like to order:\n\n${formattedItems}\n\n💰 *Total Bill:* ₹${totalPrice}${deliverySection}${offerText}\n\nPlease confirm my order. Thank you!`;

    return `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
  }

  // Single-item fallback
  const isTikka = String(pizzaName).toLowerCase().includes("tikka");
  const isBiryani = String(pizzaName).toLowerCase().includes("biryani");
  const isFries = String(pizzaName).toLowerCase().includes("fries");
  const isBurger = String(pizzaName).toLowerCase().includes("burger");
  const icon = isFries ? "🍟" : (isBurger ? "🍔" : (isBiryani ? "🍲" : (isTikka ? "🍗" : "✨")));

  const isPortioned = isTikka || isBiryani;
  const sizeLabel = isPortioned && size ? `Portion: ${size.charAt(0).toUpperCase() + size.slice(1)}\n` : "";
  const safeQty = Math.max(1, Number(quantity) || 1);
  const extraDipText = hasExtraCheese
    ? (safeQty > 1 ? `Yes (+₹${extraCheesePrice * safeQty})` : `Yes (+₹${extraCheesePrice})`)
    : "No";

  let greeting = nameTrimmed
    ? `Hi ${config.brandName}! I'm ${nameTrimmed} ${icon}`
    : `Hi ${config.brandName}! ${icon}`;

  const qtyLine = safeQty > 1 ? `Quantity: ${safeQty}\n` : "";
  const priceLine = safeQty > 1 ? `₹${basePrice} each` : `₹${basePrice}`;

  const itemDetails = `Item: ${pizzaName}\n${sizeLabel}${qtyLine}Price: ${priceLine}`;

  const messageText = `${greeting}\n\nI'd like to order:\n\n${itemDetails}\nExtra Dip: ${extraDipText}\n\nTotal: ₹${totalPrice}${deliverySection}${offerText}\n\nPlease confirm my order. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
};
