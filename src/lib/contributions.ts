export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  /** UTC date key, e.g. "2026-10-29" */
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionHeatmap = {
  /** Weeks (columns) of 7 days each, aligned so weeks start on Sunday. */
  weeks: ContributionDay[][];
  total: number;
};

const DAY_MS = 86_400_000;

const dateKey = (value: Date) => value.toISOString().slice(0, 10);

export const levelForCount = (count: number): ContributionLevel => {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
};

/**
 * Builds a GitHub-style contribution heatmap from public events.
 * The unauthenticated events API only covers roughly the last 90 days,
 * so the default window is 91 days. The grid is built from whole
 * Sunday-started week columns and always ends with the current
 * (partial) week, so it never renders future days.
 */
export function buildContributionHeatmap(
  events: Array<{ created_at: string }>,
  options: { days?: number; now?: Date } = {},
): ContributionHeatmap {
  const days = options.days ?? 91;
  const now = options.now ?? new Date();

  const counts = new Map<string, number>();
  for (const event of events) {
    const time = new Date(event.created_at).getTime();
    if (Number.isNaN(time)) continue;
    const key = dateKey(new Date(time));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);

  // The last column is the current week (starting on its Sunday), and
  // enough full week columns precede it to cover the requested window.
  const weekCount = Math.ceil(days / 7);
  const firstDay = new Date(today);
  firstDay.setUTCDate(firstDay.getUTCDate() - today.getUTCDay() - (weekCount - 1) * 7);

  const weeks: ContributionDay[][] = [];
  let total = 0;
  const cursor = new Date(firstDay);
  while (cursor.getTime() <= today.getTime()) {
    const week: ContributionDay[] = [];
    for (let dayIndex = 0; dayIndex < 7 && cursor.getTime() <= today.getTime(); dayIndex += 1) {
      const key = dateKey(cursor);
      const count = counts.get(key) ?? 0;
      total += count;
      week.push({ date: key, count, level: levelForCount(count) });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    weeks.push(week);
  }

  return { weeks, total };
}
