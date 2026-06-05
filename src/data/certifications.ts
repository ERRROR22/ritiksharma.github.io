export type CertColor = "primary" | "experience" | "project" | "skill";

export type Certification = {
  title: string;
  issuer: string;
  color: CertColor;
};

/**
 * Canonical certifications list — single source of truth for both the
 * Certifications section and the Contact achievements panel.
 *
 * Keep titles in their full, official form here. Use `formatCertLabel`
 * (or `getCertLabels`) anywhere a compact, de-duplicated label is needed.
 */
export const certifications: Certification[] = [
  { title: "Generative AI for Beginners", issuer: "Simplilearn", color: "primary" },
  { title: "Prompt Engineering Masterclass", issuer: "Simplilearn", color: "experience" },
  { title: "Prompt Engineering Masterclass", issuer: "Great Learning", color: "experience" },
  { title: "Python for Data Science", issuer: "SkillUp", color: "project" },
  { title: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", color: "skill" },
  { title: "Introduction to Model Context Protocol", issuer: "Anthropic", color: "experience" },
  { title: "Cloud Computing Fundamentals", issuer: "Cloud Academy", color: "primary" },
  { title: "Cloud Computing Fundamentals", issuer: "IBM", color: "skill" },
  { title: "Cloud Essentials", issuer: "Cloud Academy", color: "experience" },
  { title: "Google Analytics Certification", issuer: "Google", color: "project" },
  { title: "TCS iON Career Edge - Young Professional", issuer: "TCS iON", color: "skill" },
  { title: "Master Data Management for Beginners", issuer: "TCS", color: "primary" },
  { title: "Generative AI Engineering: Foundations, RAG & Deployment", issuer: "HCL GUVI", color: "project" },
  { title: "Amazon Interview Preparation", issuer: "Unstop", color: "skill" },
  { title: "How to Start a UI/UX Design Career Without Prior Experience", issuer: "HCL GUVI", color: "primary" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM", color: "project" },
];

/** Normalize whitespace/punctuation for equality checks. */
const normKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-") // unicode dashes -> hyphen
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * Returns a display label for a certification. When multiple certs share
 * the same normalized title, the issuer is appended in parentheses so the
 * two entries are distinguishable. Otherwise the bare title is returned.
 *
 * This keeps the Certifications grid and the Contact chips visually
 * consistent and prevents near-duplicate wording for the same course.
 */
export const formatCertLabel = (
  cert: Certification,
  list: Certification[] = certifications,
): string => {
  const key = normKey(cert.title);
  const duplicates = list.filter((c) => normKey(c.title) === key);
  return duplicates.length > 1 ? `${cert.title} (${cert.issuer})` : cert.title;
};

/** Convenience: all certifications rendered as normalized labels. */
export const getCertLabels = (list: Certification[] = certifications): string[] =>
  list.map((c) => formatCertLabel(c, list));
