import "./Reports.css";

import DashboardLayout from "../../components/layout/DashboardLayout";
import TopPerformers from "./TopPerformers";
import ProductivityTrend from "./ProductivityTrend";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="reports-page">

        <TopPerformers />

        <ProductivityTrend />

      </div>
    </DashboardLayout>
  );
}