export interface BlogSeoEntry {
  title: string;
  description: string;
}

export const blogSeo: Record<string, BlogSeoEntry> = {
  "prompt-injection-defense-checklist-2026": {
    title: "Prompt-Injection Defense Checklist for LLM Apps",
    description: "A seven-point production checklist for defending agentic LLM apps against prompt injection: input fencing, schema validation, scoped tools, and canaries.",
  },
  "my-2026-ai-engineering-stack-full-breakdown": {
    title: "My 2026 AI Engineering Stack: Full Breakdown",
    description: "The complete AI engineering stack of a 2026 graduate — Gemini, ONNX, XGBoost, LangChain, MCP, and React — with honest notes on what survived production.",
  },
  "building-agentic-rag-portfolio-cms-2026": {
    title: "Adding a Live CMS and Edge 404s to a Static Portfolio",
    description: "How a static portfolio gained a database-backed CMS, email-delivering contact form, and real HTTP 404 handling via edge middleware.",
  },
  "cricket-analytics-ipl-score-prediction-2026": {
    title: "IPL Score Prediction: Sports ML Lessons from Cricket",
    description: "Feature engineering ball-by-ball IPL data for score prediction, modeling momentum swings, and why domain knowledge beats bigger models.",
  },
  "llm-evaluation-fake-news-detection-2026": {
    title: "Evaluating Fake News Detectors Beyond Accuracy",
    description: "Per-class F1, calibration curves, and adversarial paraphrasing — how NewsVerify is evaluated on the LIAR dataset beyond vanity accuracy.",
  },
  "capstone-to-production-newsverify-2026": {
    title: "Scaling NewsVerify from Capstone to Production",
    description: "How NewsVerify evolved into a production-ready multimodal fact-checking platform using React Native, Express, Gemini, and typed APIs.",
  },
  "waf-lessons-llm-attack-era-2026": {
    title: "WAF Security in the Era of LLM-Generated Attacks",
    description: "Lessons from upgrading WAFinity to detect polymorphic, AI-generated attacks with behavioral analysis, embeddings, and human feedback.",
  },
  "new-grad-engineering-playbook-2026": {
    title: "The 2026 New-Grad Software Engineering Playbook",
    description: "Practical advice for new engineering graduates on building projects, shipping publicly, choosing a stack, and learning through internships.",
  },
  "on-device-ml-next-frontier-2026": {
    title: "On-Device ML for Privacy-First Apps in 2026",
    description: "Explore how quantization and mobile AI runtimes make private, low-latency machine learning practical on phones and edge devices.",
  },
  "mcp-agents-in-production-2026": {
    title: "Shipping MCP Agents in Production: 2026 Lessons",
    description: "Production lessons for Model Context Protocol agents, covering tool design, sandboxing, evaluations, observability, and cost controls.",
  },
  "portfolio-perf-budget-2026": {
    title: "A Performance Budget for Modern React Portfolios",
    description: "A practical guide to improving mobile LCP in a React portfolio with lazy loading, image budgets, measured animation, and bundle control.",
  },
  "llm-eval-harness-2026": {
    title: "How to Build a Practical LLM Evaluation Harness",
    description: "Build a maintainable LLM evaluation harness with useful test cases, repeatable scoring, regression checks, and a workflow teams will keep using.",
  },
  "newsverify-multimodal-fake-news-2026": {
    title: "NewsVerify: Multimodal Fake-News Detection",
    description: "Inside NewsVerify's dual-engine fact-checking system using a 96%-accurate PAC model and Gemini 2.5 Flash across text, URLs, and images.",
  },
  "rag-with-gemini-flash-2026": {
    title: "Production RAG with Gemini 2.5 Flash",
    description: "Patterns for combining vector retrieval and live search grounding to build factual, responsive, and production-ready AI applications.",
  },
  "ai-firewall-llm-waf-2026": {
    title: "Building an AI Firewall for LLM-Generated Attacks",
    description: "Learn how behavioral signals, machine learning, and adaptive detection can strengthen web application firewalls against AI-generated attacks.",
  },
  "ai-engineer-roadmap-2027": {
    title: "AI Engineer Roadmap for 2027",
    description: "A practical roadmap of AI engineering skills, tools, and projects for agents, multimodal systems, evaluation, and on-device inference.",
  },
  "ai-powered-threat-detection": {
    title: "Build AI-Powered Threat Detection Systems",
    description: "Learn how transformers and machine learning can detect anomalies in network traffic and support intelligent cybersecurity monitoring.",
  },
  "lstm-networks-time-series": {
    title: "LSTM Networks for Time Series Prediction",
    description: "A practical guide to designing and training LSTM neural networks for sequential forecasting, with examples from sports analytics.",
  },
  "owasp-security-guide": {
    title: "OWASP Top 10 Security Guide for Developers",
    description: "Essential practices for preventing common web vulnerabilities and building safer applications with guidance from the OWASP Top 10.",
  },
  "kubernetes-production-guide": {
    title: "Kubernetes Production Deployment Guide",
    description: "Learn production Kubernetes patterns for cluster setup, autoscaling, service networking, observability, and zero-downtime deployments.",
  },
  "serverless-cloud-architectures": {
    title: "Serverless Architecture on AWS and Azure",
    description: "Design scalable, event-driven cloud applications with AWS Lambda, API Gateway, DynamoDB, and Azure Functions while controlling costs.",
  },
  "modern-web-dev-2026": {
    title: "Modern Web Development in 2026",
    description: "Explore the tools, architecture patterns, performance practices, and platform trends shaping modern web development in 2026.",
  },
  "ci-cd-pipelines-github-actions": {
    title: "Build CI/CD Pipelines with GitHub Actions",
    description: "Automate testing, security checks, builds, and deployments with reliable GitHub Actions workflows for modern software projects.",
  },
  "react-performance-optimization": {
    title: "React Performance Optimization Techniques",
    description: "Improve React speed by reducing unnecessary renders, controlling bundle size, optimizing assets, and applying modern performance patterns.",
  },
  "docker-containerization-best-practices": {
    title: "Docker Best Practices for Production",
    description: "Use multi-stage builds, secure images, health checks, and reliable orchestration patterns to ship production-ready Docker containers.",
  },
  "typescript-advanced-patterns": {
    title: "Advanced TypeScript Patterns for Developers",
    description: "Use conditional types, template literal types, generics, and type-safe API patterns to build maintainable TypeScript applications.",
  },
  "cloud-native-microservices": {
    title: "Cloud-Native Microservices with Event-Driven Design",
    description: "Design resilient microservices with event sourcing, CQRS, message brokers, and cloud-native patterns for scalable distributed systems.",
  },
  "ai-agents-langchain-2026": {
    title: "Build Autonomous AI Agents with LangChain",
    description: "Create AI agents that reason, plan, use tools, and retrieve knowledge with LangChain, RAG pipelines, guardrails, and structured outputs.",
  },
};

export const getBlogSeo = (slug: string, title: string, excerpt: string): BlogSeoEntry =>
  blogSeo[slug] ?? {
    title: title.length <= 60 ? title : `${title.slice(0, 57).trimEnd()}…`,
    description: excerpt.length <= 160 ? excerpt : `${excerpt.slice(0, 157).trimEnd()}…`,
  };