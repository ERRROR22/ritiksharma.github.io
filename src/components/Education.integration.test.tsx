import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Education from "./Education";
import { formatCgpa } from "@/lib/cgpa";

const CURRENT_CGPA = 7.9;

describe("Education section integration", () => {
  it("renders the CGPA label paired with the formatted value from cgpa.ts", () => {
    const { getByText } = render(<Education />);

    const label = getByText("Current CGPA");
    const value = getByText(formatCgpa(CURRENT_CGPA));

    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(value.textContent).toBe("7.9/10");

    // Label and value should live in the same CGPA card row.
    expect(label.parentElement).toBe(value.parentElement);
  });

  it("keeps the rendered CGPA in sync with formatCgpa output", () => {
    const { getByText } = render(<Education />);
    expect(getByText(formatCgpa(CURRENT_CGPA))).toBeInTheDocument();
  });
});
