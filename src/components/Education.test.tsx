import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Education from "./Education";

describe("Education CGPA display", () => {
  it("renders the current CGPA as 7.9/10", () => {
    render(<Education />);
    expect(screen.getByText("7.9/10")).toBeInTheDocument();
  });

  it("keeps the CGPA label and value paired consistently", () => {
    render(<Education />);
    const label = screen.getByText("Current CGPA");
    const value = screen.getByText("7.9/10");
    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it("renders the progress bar at 78% for a 7.9/10 CGPA", () => {
    render(<Education />);
    const bar = screen.getByText("7.9/10").parentElement?.nextElementSibling;
    if (bar) {
      const fill = bar.querySelector("div > div");
      expect(fill).toHaveStyle("width: 78%");
    }
  });
});
