import "./Reports.css";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ReportsHeader from "./ReportsHeader";
import ReportFilters from "./ReportFilters";
import ReportCards from "./ReportCards";
import TaskTrendChart from "./TaskTrendChart";
import ProjectChart from "./ProjectChart";
import PriorityChart from "./PriorityChart";
import TopPerformers from "./TopPerformers";
import RecentActivity from "./RecentActivity";
import MonthlyReport from "./MonthlyReport";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="reports-page">

        <ReportsHeader />

        <ReportFilters />

        <ReportCards />

        <TaskTrendChart />

        <div className="reports-chart-grid">

          <ProjectChart />

          <PriorityChart />

        </div>

        <TopPerformers />

        <RecentActivity />

        <MonthlyReport />

      </div>
    </DashboardLayout>
  );
}