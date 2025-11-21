import React from "react";
import "./Subscription.css";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

interface Plan {
  title: string;
  price: string;
  details: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    title: "Plan",
    price: "Free",
    details: "Limited time deals",
    features: ["1 deals per day", "2 order tracing per day", "slow delivery"],
  },
  {
    title: "Popular",
    price: "2000",
    details: "First popular choice of Distributor and consumers",
    features: [
      "10 times deal per day",
      "20 order tracing per day",
      "Faster delivery",
      "Quick Response",
      "2 x 10 customer support",
    ],
    popular: true,
  },
  {
    title: "Business",
    price: "50000",
    details: "Product details for Product Type 3",
    features: [
      "Unlimited deals per day",
      "Unlimited order tracing",
      "Fastest delivery ever seen",
      "Developer will reach out",
      "CEO customer support",
    ],
  },
];

const SubscriptionCards: React.FC = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Handle click for different plans
  const handleOrderClick = (planTitle: string) => {
    if (planTitle === "Plan") {
      // Free plan → Go to homepage
      navigate("/homePage");
    } else {
      // Other plans → Just alert
      alert(`You have clicked on the ${planTitle} plan.`);
    }
  };

  return (
    <div className="subscription-container">
      {plans.map((plan, idx) => (
        <div key={idx} className={`card ${plan.popular ? "popular" : ""}`}>
          {plan.popular && <div className="badge">Most popular</div>}
          <h3>{plan.title}</h3>
          <p className="details">{plan.details}</p>cd
          <h2 className="price">
            ₹ {plan.price} <span>/ lifetime</span>
          </h2>

          {/* ✅ Click handler added */}
          <button
            className={`order-btn ${plan.popular ? "highlight" : ""}`}
            onClick={() => handleOrderClick(plan.title)}
          >
            Order Now
          </button>

          <ul className="features">
            {plan.features.map((feature, i) => (
              <li key={i}>✓ {feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCards;
