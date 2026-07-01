import { describe, it, expect } from "vitest";
import { formatCgpa, getCgpaPercentage } from "./cgpa";

describe("CGPA formatting utilities", () => {
  describe("formatCgpa", () => {
    it("formats a whole number CGPA with one decimal place", () => {
      expect(formatCgpa(8)).toBe("8.0/10");
    });

    it("formats a fractional CGPA with one decimal place", () => {
      expect(formatCgpa(7.9)).toBe("7.9/10");
    });

    it("rounds to one decimal place", () => {
      expect(formatCgpa(7.85)).toBe("7.9/10");
    });
  });

  describe("getCgpaPercentage", () => {
    it("returns 79% for 7.9/10", () => {
      expect(getCgpaPercentage(7.9)).toBe("79%");
    });

    it("returns 80% for 8.0/10", () => {
      expect(getCgpaPercentage(8.0)).toBe("80%");
    });

    it("returns 100% for 10.0/10", () => {
      expect(getCgpaPercentage(10)).toBe("100%");
    });
  });
});
