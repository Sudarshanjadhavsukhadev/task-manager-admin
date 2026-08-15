import "./VisionBoard.css";

import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import VisionList from "../../components/vision/VisionList";
import CreateVisionModal from "../../components/vision/CreateVisionModal";

export default function VisionBoard() {
  const [, setSelectedVision] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(0);
  return (
    <DashboardLayout>
      <div className="vision-board-page">

        <div className="vision-page-header">
          <div>
            <h1>Vision Board</h1>
            <p>Manage your company visions</p>
          </div>

          <button
            className="create-vision-btn"
            onClick={() => setOpenModal(true)}
          >
            + Create Vision
          </button>
        </div>

        <VisionList
          onSelect={setSelectedVision}
          refresh={refresh}
        />

      </div>
      <CreateVisionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreated={() => {
          setOpenModal(false);
          setRefresh((prev) => prev + 1);
        }}
      />
    </DashboardLayout>
  );
}