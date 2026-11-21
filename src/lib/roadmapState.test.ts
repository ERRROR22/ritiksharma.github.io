import { describe, expect, it } from "vitest";
import { roadmapTasks } from "@/data/roadmap";
import {
  loadRoadmapTasks,
  ROADMAP_STATUS_STORAGE_KEY,
  saveRoadmapStatuses,
  type RoadmapStorage,
} from "@/lib/roadmapState";

class MemoryStorage implements RoadmapStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("roadmap status storage", () => {
  it("persists valid status changes and reloads them for the Roadmap", () => {
    const storage = new MemoryStorage();
    const taskId = roadmapTasks[0]?.id;
    expect(taskId).toBeDefined();
    if (!taskId) return;

    expect(saveRoadmapStatuses({ [taskId]: "in-progress" }, storage)).toBe(true);
    expect(storage.getItem(ROADMAP_STATUS_STORAGE_KEY)).toBe(JSON.stringify({ [taskId]: "in-progress" }));
    expect(loadRoadmapTasks(storage).find((task) => task.id === taskId)?.status).toBe("in-progress");
  });

  it("rejects unknown task IDs and invalid statuses", () => {
    const storage = new MemoryStorage();
    expect(saveRoadmapStatuses({ missing: "done" }, storage)).toBe(false);
    expect(saveRoadmapStatuses({ [roadmapTasks[0]?.id ?? ""]: "blocked" }, storage)).toBe(false);
    expect(storage.getItem(ROADMAP_STATUS_STORAGE_KEY)).toBeNull();
  });

  it("ignores malformed saved values and keeps each task's default status", () => {
    const storage = new MemoryStorage();
    const firstTask = roadmapTasks[0];
    storage.setItem(ROADMAP_STATUS_STORAGE_KEY, JSON.stringify({
      [firstTask.id]: "blocked",
      unknown: "done",
    }));

    expect(loadRoadmapTasks(storage).find((task) => task.id === firstTask.id)?.status).toBe(firstTask.status);
  });
});