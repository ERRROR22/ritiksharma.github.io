import { roadmapTasks, type RoadmapStatus, type RoadmapTask } from "@/data/roadmap";

export const ROADMAP_STATUS_STORAGE_KEY = "ritik-roadmap-task-statuses-v1";
const ROADMAP_CHANGE_EVENT = "ritik-roadmap-statuses-change";

export type RoadmapStorage = Pick<Storage, "getItem" | "setItem">;
export type RoadmapStatusMap = Record<string, RoadmapStatus>;

const getBrowserStorage = (): RoadmapStorage | null => {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
};

export const isRoadmapStatus = (value: unknown): value is RoadmapStatus =>
  value === "done" || value === "in-progress" || value === "planned";

const readStatusOverrides = (storage: RoadmapStorage | null): RoadmapStatusMap => {
  if (!storage) return {};

  try {
    const raw = storage.getItem(ROADMAP_STATUS_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};

    const knownIds = new Set(roadmapTasks.map((task) => task.id));
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([id, status]) => knownIds.has(id) && isRoadmapStatus(status),
      ),
    ) as RoadmapStatusMap;
  } catch {
    return {};
  }
};

export const loadRoadmapTasks = (storage = getBrowserStorage()): RoadmapTask[] => {
  const overrides = readStatusOverrides(storage);
  return roadmapTasks.map((task) => ({ ...task, status: overrides[task.id] ?? task.status }));
};

export const saveRoadmapStatuses = (
  statuses: Record<string, unknown>,
  storage = getBrowserStorage(),
): boolean => {
  if (!storage || typeof statuses !== "object" || statuses === null || Array.isArray(statuses)) return false;

  const knownIds = new Set(roadmapTasks.map((task) => task.id));
  const entries = Object.entries(statuses);
  if (entries.some(([id, status]) => !knownIds.has(id) || !isRoadmapStatus(status))) return false;

  try {
    storage.setItem(ROADMAP_STATUS_STORAGE_KEY, JSON.stringify(Object.fromEntries(entries)));
    if (typeof window !== "undefined") window.dispatchEvent(new Event(ROADMAP_CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
};

export const subscribeToRoadmapTasks = (listener: () => void): (() => void) => {
  if (typeof window === "undefined") return () => undefined;

  const notify = () => listener();
  window.addEventListener("storage", notify);
  window.addEventListener(ROADMAP_CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(ROADMAP_CHANGE_EVENT, notify);
  };
};