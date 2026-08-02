import "./FutureRoadmap.css";
import {
  Rocket,
  Globe,
  Brain,
  Smartphone,
  Building2,
} from "lucide-react";

const roadmap = [
  {
    year: "2026",
    title: "Foundation",
    description:
      "Launch the platform, onboard customers and establish a strong market presence.",
    icon: Rocket,
  },
  {
    year: "2027",
    title: "Expansion",
    description:
      "Expand across India, introduce enterprise features and grow the customer base.",
    icon: Globe,
  },
  {
    year: "2028",
    title: "AI Automation",
    description:
      "Integrate AI-powered assistants, automation and predictive analytics.",
    icon: Brain,
  },
  {
    year: "2029",
    title: "Mobile Ecosystem",
    description:
      "Deliver complete Android and iOS experiences with offline capabilities.",
    icon: Smartphone,
  },
  {
    year: "2030",
    title: "Global Leadership",
    description:
      "Become a globally recognized productivity platform for teams and enterprises.",
    icon: Building2,
  },
];

export default function FutureRoadmap() {
  return (
    <div className="future-roadmap">

      <div className="section-title">
        <h2>Future Roadmap</h2>
        <p>
          Our strategic vision for the coming years.
        </p>
      </div>

      <div className="roadmap-list">

        {roadmap.map((item) => {
          const Icon = item.icon;

          return (
            <div className="roadmap-card" key={item.year}>

              <div className="roadmap-year">
                {item.year}
              </div>

              <div className="roadmap-icon">
                <Icon size={26} />
              </div>

              <div className="roadmap-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}