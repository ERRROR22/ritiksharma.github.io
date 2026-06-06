import { describe, it, expect } from "vitest";
import {
  certifications,
  formatCertLabel,
  getCertLabels,
  type Certification,
} from "./certifications";

describe("formatCertLabel", () => {
  it("returns bare title when the title is unique in the list", () => {
    const list: Certification[] = [
      { title: "Unique Course", issuer: "Acme", color: "primary" },
      { title: "Another Course", issuer: "Beta", color: "skill" },
    ];
    expect(formatCertLabel(list[0], list)).toBe("Unique Course");
  });

  it("appends the issuer when multiple certs share the same title", () => {
    const list: Certification[] = [
      { title: "Prompt Engineering Masterclass", issuer: "Simplilearn", color: "primary" },
      { title: "Prompt Engineering Masterclass", issuer: "Great Learning", color: "experience" },
    ];
    expect(formatCertLabel(list[0], list)).toBe(
      "Prompt Engineering Masterclass (Simplilearn)",
    );
    expect(formatCertLabel(list[1], list)).toBe(
      "Prompt Engineering Masterclass (Great Learning)",
    );
  });

  it("normalizes casing, punctuation, and whitespace when detecting duplicates", () => {
    const list: Certification[] = [
      { title: "Cloud  Computing—Fundamentals", issuer: "Cloud Academy", color: "primary" },
      { title: "cloud computing - fundamentals", issuer: "IBM", color: "skill" },
    ];
    const labels = list.map((c) => formatCertLabel(c, list));
    expect(labels.every((l) => l.includes("("))).toBe(true);
  });

  it("defaults to the canonical certifications list", () => {
    const simplilearn = certifications.find(
      (c) => c.title === "Prompt Engineering Masterclass" && c.issuer === "Simplilearn",
    )!;
    expect(formatCertLabel(simplilearn)).toBe(
      "Prompt Engineering Masterclass (Simplilearn)",
    );
  });
});

describe("getCertLabels (cross-section consistency)", () => {
  const labels = getCertLabels();

  it("produces one label per certification", () => {
    expect(labels).toHaveLength(certifications.length);
  });

  it("produces no duplicate labels (Certifications ↔ Contact stay in sync)", () => {
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("disambiguates every shared-title certification with its issuer", () => {
    const titleCounts = new Map<string, number>();
    for (const c of certifications) {
      const key = c.title.toLowerCase().trim();
      titleCounts.set(key, (titleCounts.get(key) ?? 0) + 1);
    }
    for (const cert of certifications) {
      const key = cert.title.toLowerCase().trim();
      const label = formatCertLabel(cert);
      if ((titleCounts.get(key) ?? 0) > 1) {
        expect(label).toBe(`${cert.title} (${cert.issuer})`);
      } else {
        expect(label).toBe(cert.title);
      }
    }
  });
});
