import { useEffect, useState } from "react";
import type { RoadmapTask } from "@/data/roadmap";
import { loadRoadmapTasks, subscribeToRoadmapTasks } from "@/lib/roadmapState";

export const useRoadmapTasks = (): RoadmapTask[] => {
  const [tasks, setTasks] = useState(loadRoadmapTasks);

  useEffect(() => subscribeToRoadmapTasks(() => setTasks(loadRoadmapTasks())), []);

  return tasks;
};