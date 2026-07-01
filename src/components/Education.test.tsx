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

  it("does not render any other CGPA value like 7.8 or 8.0", () => {
    const { queryByText } = render(<Education />);
    expect(queryByText("7.8/10")).not.toBeInTheDocument();
    expect(queryByText("8.0/10")).not.toBeInTheDocument();
  });
});
