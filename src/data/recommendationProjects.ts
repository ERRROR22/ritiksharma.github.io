export interface RecommendationCandidate {
  id: string;
  kind: "project" | "article";
  title: string;
  category: string;
  summary: string;
  skills: string[];
  /** Optional public link shown on match cards when the item is recommended. */
  link?: string;
}

export const recommendationProjects: RecommendationCandidate[] = [
  {
    id: "newsverify",
    kind: "project",
    title: "NewsVerify — Multimodal Fake News Detection",
    category: "AI/ML · Full-Stack",
    summary:
      "A real-time misinformation checker that combines a Passive Aggressive text classifier with Gemini and live web grounding. The Expo app accepts text, URLs, and image screenshots for OCR-backed analysis.",
    skills: ["NLP", "scikit-learn", "Gemini", "React Native", "Express", "multimodal AI"],
    link: "https://truth-verifier--Techtitans999.replit.app",
  },
  {
    id: "wafinity",
    kind: "project",
    title: "WAFinity — Advanced Web Application Firewall",
    category: "Cybersecurity",
    summary:
      "A web application firewall combining signature rules with a Random Forest classifier trained on 50K labeled HTTP traffic samples to catch SQL injection, XSS, CSRF, and anomalous requests.",
    skills: [
      "application security",
      "Python",
      "Flask",
      "machine learning",
      "threat detection",
    ],
    link: "https://github.com/ERRROR22/Advanced-WAF-WAFinity",
  },
  {
    id: "text-to-image",
    kind: "project",
    title: "Text-to-Image Generator",
    category: "AI/ML",
    summary:
      "A Stable Diffusion image-generation project with a Flask API, an asynchronous worker queue, and LoRA-based prompt calibration.",
    skills: ["generative AI", "PyTorch", "Stable Diffusion", "Flask", "LoRA"],
    link: "https://github.com/ERRROR22/ML_Minor_Project",
  },
  {
    id: "ipl-prediction",
    kind: "project",
    title: "IPL Score Prediction System",
    category: "Machine Learning · Cricket",
    summary:
      "A cricket analytics project using ball-by-ball features and an LSTM model to estimate innings scores, with a FastAPI endpoint and monitoring.",
    skills: ["sports analytics", "cricket", "LSTM", "TensorFlow", "feature engineering"],
    link: "https://github.com/ERRROR22/IPL-Score-Prediction-ML-Project",
  },
  {
    id: "e-voting",
    kind: "project",
    title: "Secure Web-Based E-Voting Platform",
    category: "Cybersecurity · Full-Stack",
    summary:
      "A secure voting platform with AES-256 encryption, OAuth 2.0, role-based access, and a tamper-evident audit log.",
    skills: ["web security", "cryptography", "OAuth", "PHP", "MySQL"],
  },
];
