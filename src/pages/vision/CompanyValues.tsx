import "./CompanyValues.css";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  HeartHandshake,
  Trophy,
  Sparkles,
} from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "Continuously improve and embrace new ideas.",
    icon: Lightbulb,
  },
  {
    title: "Integrity",
    description: "Be honest, transparent and accountable.",
    icon: ShieldCheck,
  },
  {
    title: "Teamwork",
    description: "Achieve success through collaboration.",
    icon: Users,
  },
  {
    title: "Customer First",
    description: "Deliver exceptional customer experiences.",
    icon: HeartHandshake,
  },
  {
    title: "Excellence",
    description: "Strive for the highest quality in everything.",
    icon: Trophy,
  },
  {
    title: "Growth",
    description: "Learn, adapt and improve every day.",
    icon: Sparkles,
  },
];

export default function CompanyValues() {
  return (
    <div className="company-values">

      <div className="section-title">
        <h2>Company Values</h2>
        <p>
          The principles that guide our decisions and shape our culture.
        </p>
      </div>

      <div className="values-grid">

        {values.map((value) => {
          const Icon = value.icon;

          return (
            <div className="value-card" key={value.title}>

              <div className="value-icon">
                <Icon size={28} />
              </div>

              <h3>{value.title}</h3>

              <p>{value.description}</p>

            </div>
          );
        })}

      </div>

    </div>
  );
}