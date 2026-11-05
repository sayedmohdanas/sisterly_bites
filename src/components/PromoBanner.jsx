import React from "react";
import { Flame, Star, MessageSquare, Heart } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { config } from "../config/config";
import { trackEvent } from "../utils/analytics";
import { getWhatsAppOrderLink } from "../utils/whatsapp";
import sisterlyMenuPoster from "../assets/sisterly_bites_menu.jpg";

export default function PromoBanner() {
  const handleWhatsAppOrder = () => {
    trackEvent("order_clicked", { source: "promo_banner_whatsapp" });
    window.open(getWhatsAppOrderLink(), "_blank");
  };

  const handleInstagramClick = () => {
    trackEvent("instagram_clicked", { source: "promo_banner" });
    window.open(config.instagramUrl, "_blank");
  };

  return (
    <section id="promo" className="promo-banner-section">
      <div className="section-container">
        <div className="promo-card">
          <div className="promo-card-glow" />

          <div className="promo-content-grid">
            {/* Left Content */}
            <div className="promo-text-column">
              <div className="promo-tag">
                <Flame size={16} className="flame-icon" />
                <span>HOMEMADE GOODNESS ALWAYS</span>
              </div>

              <h2 className="promo-title">
                Good Food, Brighter Days <Heart size={28} className="heart-inline-icon" />
              </h2>

              <p className="promo-subtitle">
                Fresh ingredients. Delicious flavors. Made with love. Every meal at Sisterly Bites Cloud Kitchen is hand-crafted with crunchy fries, succulent chicken, secret seasoning, and sizzling hot freshness.
              </p>

              <div className="promo-highlights">
                <div className="highlight-pill">
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span>Crispy Peri Peri Fries</span>
                </div>
                <div className="highlight-pill">
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span>Juicy Zinger Burger</span>
                </div>
                <div className="highlight-pill">
                  <Star size={16} fill="#FFD700" color="#FFD700" />
                  <span>Creamy Malai Chicken Tikka</span>
                </div>
              </div>

              <div className="promo-btn-group">
                <button
                  type="button"
                  className="promo-order-cta"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageSquare size={20} />
                  <span>ORDER ON WHATSAPP</span>
                </button>

                <button
                  type="button"
                  className="promo-instagram-cta"
                  onClick={handleInstagramClick}
                >
                  <InstagramIcon size={18} />
                  <span>FOLLOW US ON INSTAGRAM</span>
                </button>
              </div>
            </div>

            {/* Right Food Showcase Poster Image */}
            <div className="promo-image-column">
              <div className="poster-preview-card" style={{ borderRadius: "18px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
                <img
                  src={sisterlyMenuPoster}
                  alt="Sisterly Bites Cloud Kitchen Menu"
                  style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", borderRadius: "18px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
