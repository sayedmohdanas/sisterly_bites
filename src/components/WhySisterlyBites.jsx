import React from "react";
import { UtensilsCrossed, Bike, Sparkles, Heart } from "lucide-react";

export default function WhySisterlyBites() {
  const features = [
    {
      icon: UtensilsCrossed,
      title: "🍟 Homemade Goodness",
      description: "Authentic homemade recipes prepared fresh with high-grade spices and care in every single bite.",
      color: "#E63946",
    },
    {
      icon: Bike,
      title: "🚴 Fast Delivery",
      description: "Piping hot delivery straight from our cloud kitchen to your doorstep without delay.",
      color: "#FF9F1C",
    },
    {
      icon: Sparkles,
      title: "✨ Crispy & Fresh",
      description: "Crispy fries, juicy zinger patties & tender chicken popcorn made to order with zero compromises.",
      color: "#2A9D8F",
    },
    {
      icon: Heart,
      title: "❤️ Made With Love",
      description: "Good food for brighter days. Thoughtfully crafted to bring joy and smile to your table.",
      color: "#D90429",
    },
  ];

  return (
    <section id="why-sisterly-bites" className="why-sisterly-bites-section">
      <div className="section-container">
        <div className="section-header text-center">
          <span className="section-badge">OUR PROMISE</span>
          <h2 className="section-title">WHY SISTERLY BITES?</h2>
          <p className="section-subtitle">
            Homemade Goodness, Always ♡ Good Food, Brighter Days.
          </p>
        </div>

        <div className="why-grid">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="why-card">
                <div
                  className="why-icon-bubble"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <IconComp size={32} />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
