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

describe("edge cases", () => {
  it("treats trailing/leading whitespace as the same title", () => {
    const list: Certification[] = [
      { title: "  RAG Bootcamp  ", issuer: "Acme", color: "primary" },
      { title: "RAG Bootcamp", issuer: "Beta", color: "skill" },
    ];
    expect(formatCertLabel(list[0], list)).toBe("  RAG Bootcamp   (Acme)");
    expect(formatCertLabel(list[1], list)).toBe("RAG Bootcamp (Beta)");
  });

  it("handles issuer collisions — same issuer, distinct titles stay bare", () => {
    const list: Certification[] = [
      { title: "Intro to MCP", issuer: "Anthropic", color: "experience" },
      { title: "Advanced MCP", issuer: "Anthropic", color: "skill" },
    ];
    expect(formatCertLabel(list[0], list)).toBe("Intro to MCP");
    expect(formatCertLabel(list[1], list)).toBe("Advanced MCP");
  });

  it("handles issuer collisions — same title and same issuer still disambiguates", () => {
    const list: Certification[] = [
      { title: "Prompt Engineering", issuer: "Acme", color: "primary" },
      { title: "Prompt Engineering", issuer: "Acme", color: "skill" },
    ];
    const labels = list.map((c) => formatCertLabel(c, list));
    expect(labels[0]).toBe("Prompt Engineering (Acme)");
    expect(labels[1]).toBe("Prompt Engineering (Acme)");
  });

  it("is case-insensitive when detecting duplicate titles", () => {
    const list: Certification[] = [
      { title: "deep learning", issuer: "Acme", color: "primary" },
      { title: "Deep Learning", issuer: "Beta", color: "skill" },
    ];
    expect(formatCertLabel(list[0], list)).toBe("deep learning (Acme)");
    expect(formatCertLabel(list[1], list)).toBe("Deep Learning (Beta)");
  });

  it("treats unicode dashes (en/em) as ASCII hyphen", () => {
    const list: Certification[] = [
      { title: "AI–Security", issuer: "Acme", color: "primary" },
      { title: "AI-Security", issuer: "Beta", color: "skill" },
      { title: "AI—Security", issuer: "Gamma", color: "experience" },
    ];
    const labels = list.map((c) => formatCertLabel(c, list));
    expect(labels.every((l) => l.includes("("))).toBe(true);
  });

  it("returns a stable label when the list contains only one cert", () => {
    const list: Certification[] = [
      { title: "Solo Course", issuer: "Acme", color: "primary" },
    ];
    expect(formatCertLabel(list[0], list)).toBe("Solo Course");
  });

  it("handles an empty list by treating the cert as unique", () => {
    const cert: Certification = { title: "Orphan", issuer: "Acme", color: "primary" };
    expect(formatCertLabel(cert, [])).toBe("Orphan (Acme)");
  });

  it("getCertLabels output stays in the same order as the source list", () => {
    const labels = getCertLabels();
    labels.forEach((label, i) => {
      expect(label.startsWith(certifications[i].title)).toBe(true);
    });
  });
});
