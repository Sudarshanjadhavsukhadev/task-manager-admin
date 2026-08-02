import "./VisionBoard.css";

import DashboardLayout from "../../components/layout/DashboardLayout";

import VisionHeader from "./VisionHeader";
import GoalsSection from "./GoalsSection";
import Milestones from "./Milestones";
import VisionProgress from "./VisionProgress";
import CompanyValues from "./CompanyValues";
import FutureRoadmap from "./FutureRoadmap";

export default function VisionBoard() {
  return (
    <DashboardLayout>
      <div className="vision-board-page">
        <VisionHeader />
        <GoalsSection />

        <div className="vision-grid">
          <Milestones />
          <VisionProgress />
        </div>

        <CompanyValues />
        <FutureRoadmap />
      </div>
    </DashboardLayout>
  );
}