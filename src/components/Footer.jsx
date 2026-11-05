import React from "react";
import { Phone, Mail, Heart, ShieldCheck, MessageSquare } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { config } from "../config/config";
import { trackEvent } from "../utils/analytics";
import { getWhatsAppOrderLink } from "../utils/whatsapp";
import sisterlyLogo from "../assets/sisterly_bites_logo.jpg";

export default function Footer({ onOpenTerms }) {
  const handleInstagramClick = () => {
    trackEvent("social_click", { platform: "instagram" });
    window.open(config.instagramUrl, "_blank");
  };

  const handleWhatsAppClick = () => {
    trackEvent("social_click", { platform: "whatsapp" });
    window.open(getWhatsAppOrderLink(), "_blank");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="footer-section">
      <div className="section-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <img src={sisterlyLogo} alt={config.brandName} className="footer-logo-img" />
              <div className="logo-text-group">
                <span className="brand-name">{config.brandName}</span>
                <span className="brand-tagline">HOMEMADE GOODNESS ALWAYS</span>
              </div>
            </div>

            <p className="footer-about-text">
              Sisterly Bites Cloud Kitchen brings you golden crispy fries, loaded specials, crunchy chicken zinger burgers, popcorn chicken, and tender malai chicken tikka made with love. Order directly on WhatsApp or join our Spin & Win campaign today!
            </p>

            {/* FSSAI Badge */}
            <div className="fssai-badge-card">
              <ShieldCheck className="fssai-icon" size={20} />
              <div className="fssai-details">
                <span className="fssai-title">FSSAI CERTIFIED</span>
                <span className="fssai-lic">{config.fssaiLicNo}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-menu">
              <li>
                <button onClick={() => scrollToSection("hero")}>Home & Spin</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("how-it-works")}>How It Works</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("promo")}>Offers & Menu</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("why-sisterly-bites")}>Why Sisterly Bites</button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Campaign & Legal</h4>
            <ul className="footer-menu">
              <li>
                <button onClick={onOpenTerms}>Terms & Conditions</button>
              </li>
              <li>
                <button onClick={onOpenTerms}>Privacy Policy</button>
              </li>
              <li>
                <button onClick={onOpenTerms}>Spin & Win Rules</button>
              </li>
              <li>
                <button onClick={onOpenTerms}>FSSAI License Info</button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect With Us</h4>
            <p className="contact-item">
              <Mail size={16} />
              <span>{config.supportEmail}</span>
            </p>
            <p className="contact-item">
              <Phone size={16} />
              <span>{config.supportPhone}</span>
            </p>

            <div className="social-icons-row">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-social-btn"
                onClick={handleInstagramClick}
                aria-label="Follow us on Instagram"
                title="Follow us on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <button
                type="button"
                className="social-btn whatsapp-social-btn"
                onClick={handleWhatsAppClick}
                aria-label="Order on WhatsApp"
                title="Order on WhatsApp"
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 {config.brandName}. All rights reserved. Crafted with <Heart size={14} className="heart-pink" /> for happier people.
          </p>
          <div className="bottom-legal-notes">
            <span>Stand-alone promotional landing page</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
