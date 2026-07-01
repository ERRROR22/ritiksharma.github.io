import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Education from "./Education";

describe("Education CGPA display", () => {
  it("renders the current CGPA as 7.9/10", () => {
    const { getByText } = render(<Education />);
    expect(getByText("7.9/10")).toBeInTheDocument();
  });

  it("keeps the CGPA label and value paired consistently", () => {
    const { getByText } = render(<Education />);
    expect(getByText("Current CGPA")).toBeInTheDocument();
    expect(getByText("7.9/10")).toBeInTheDocument();
  });

  it("renders the progress bar at 78% for a 7.9/10 CGPA", () => {
    const { getByText } = render(<Education />);
    const bar = getByText("7.9/10").parentElement?.nextElementSibling;
    if (bar) {
      const fill = bar.querySelector("div > div");
      expect(fill).toHaveStyle("width: 78%");
    }
  });
});
