import { describe, expect, it } from "vitest";
import { buildContributionHeatmap, levelForCount } from "./contributions";

const now = new Date("2026-10-29T12:00:00Z");

describe("levelForCount", () => {
  it("maps counts to the five GitHub-style intensity levels", () => {
    expect(levelForCount(0)).toBe(0);
    expect(levelForCount(1)).toBe(1);
    expect(levelForCount(3)).toBe(2);
    expect(levelForCount(6)).toBe(3);
    expect(levelForCount(7)).toBe(4);
    expect(levelForCount(25)).toBe(4);
  });
});

describe("buildContributionHeatmap", () => {
  it("counts events per UTC day and sums the total", () => {
    const events = [
      { created_at: "2026-10-29T01:00:00Z" },
      { created_at: "2026-10-29T09:00:00Z" },
      { created_at: "2026-10-28T15:00:00Z" },
    ];
    const heatmap = buildContributionHeatmap(events, { now, days: 7 });
    expect(heatmap.total).toBe(3);
    const flat = heatmap.weeks.flat();
    expect(flat.find((day) => day.date === "2026-10-29")?.count).toBe(2);
    expect(flat.find((day) => day.date === "2026-10-28")?.count).toBe(1);
  });

  it("ends the grid on today and starts each week on Sunday", () => {
    const heatmap = buildContributionHeatmap([], { now, days: 7 });
    const allDays = heatmap.weeks.flat();
    // 2026-10-29 is a Thursday; the grid must end there and the first
    // column must start on Sunday 2026-10-25.
    expect(allDays.at(-1)?.date).toBe("2026-10-29");
    expect(allDays[0].date).toBe("2026-10-25");
    expect(new Date(allDays[0].date + "T00:00:00Z").getUTCDay()).toBe(0);
    // Days after today are never rendered.
    expect(allDays.some((day) => day.date > "2026-10-29")).toBe(false);
  });

  it("ignores events older than the window", () => {
    const events = [
      { created_at: "2026-10-29T01:00:00Z" },
      { created_at: "2026-06-01T01:00:00Z" },
    ];
    const heatmap = buildContributionHeatmap(events, { now, days: 30 });
    expect(heatmap.total).toBe(1);
  });

  it("renders no future cells and one full week per column except the last", () => {
    const heatmap = buildContributionHeatmap([], { now, days: 91 });
    const fullWeeks = heatmap.weeks.slice(0, -1);
    expect(fullWeeks.every((week) => week.length === 7)).toBe(true);
    expect(heatmap.weeks.at(-1)!.length).toBeLessThanOrEqual(7);
  });
});
