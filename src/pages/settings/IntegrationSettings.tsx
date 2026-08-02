import "./IntegrationSettings.css";
import {
  Calendar,
  GitBranch,
  MessageSquare,
  Video,
  Workflow,
  Link2,
} from "lucide-react";

const integrations = [
  {
    name: "Google Calendar",
    description: "Sync tasks with your Google Calendar.",
    icon: Calendar,
    connected: true,
  },
  {
    name: "GitHub",
    description: "Connect repositories and track issues.",
    icon: GitBranch,
    connected: false,
  },
  {
    name: "Slack",
    description: "Receive notifications in Slack channels.",
    icon: MessageSquare,
    connected: true,
  },
  {
    name: "Microsoft Teams",
    description: "Collaborate with your team efficiently.",
    icon: Video,
    connected: false,
  },
  {
    name: "Zapier",
    description: "Automate workflows across apps.",
    icon: Workflow,
    connected: false,
  },
  {
    name: "Zoom",
    description: "Schedule meetings directly from tasks.",
    icon: Link2,
    connected: true,
  },
];

export default function IntegrationSettings() {
  return (
    <div className="integration-settings">

      <div className="settings-card-header">
        <h2>Integrations</h2>

        <p>
          Connect your favorite productivity tools with your workspace.
        </p>
      </div>

      <div className="integration-grid">

        {integrations.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="integration-card"
              key={item.name}
            >
              <div className="integration-icon">
                <Icon size={30} />
              </div>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <button
                className={
                  item.connected
                    ? "connected-btn"
                    : "connect-btn"
                }
              >
                {item.connected ? "Connected" : "Connect"}
              </button>
            </div>
          );
        })}

      </div>

    </div>
  );
}