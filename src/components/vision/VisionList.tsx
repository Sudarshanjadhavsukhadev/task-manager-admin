import { useEffect, useState } from "react";
import "./VisionList.css";

import VisionCard from "./VisionCard";

import { getVisions } from "../../services/vision.service";
import { getGoals } from "../../services/goal.service";

type Props = {
  onSelect: (vision: any) => void;
  refresh: number;
};

export default function VisionList({
  onSelect,
  refresh,
}: Props) {
  const [visions, setVisions] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    loadData();
  }, [refresh]);

  async function loadData() {
    try {
      const visionData = await getVisions();
      const goalData = await getGoals();
      console.log("Visions:", visionData);
      console.log("Goals:", goalData);
      setVisions(visionData);
      setGoals(goalData);

      if (visionData.length > 0) {
        setSelectedId(visionData[0].id);
        onSelect(visionData[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="vision-list">

      {visions.map((vision) => {

        const totalGoals = goals.filter(
          (goal) => goal.vision_id === vision.id
        ).length;

        return (
          <VisionCard
            key={vision.id}
            vision={vision}
            goalCount={totalGoals}
            active={selectedId === vision.id}
            onClick={() => {
              setSelectedId(vision.id);
              onSelect(vision);
            }}
          />
        );
      })}

    </div>
  );
}