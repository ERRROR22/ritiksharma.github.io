/**
 * Resume file lives in /public so it is served by any host (Lovable, GitHub Pages, etc.).
 * BASE_URL keeps the link correct when the app is deployed under a sub-path.
 */
export const RESUME_FILENAME = "RitikSharma-Resume.pdf";

export const resumeUrl = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${RESUME_FILENAME}`;
