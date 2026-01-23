import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";

const experiences = [
  {
    title: "Cyber Security Intern",
    company: "National Institute of Electronics & Information Technology (NIELIT)",
    location: "Jammu, J&K",
    period: "June 2025 – July 2025",
    highlights: [
      "Spearheaded vulnerability assessments across network infrastructure, identifying and remediating 10 critical security vulnerabilities",
      "Engineered AI-powered threat detection system using Hugging Face Transformers, improving anomaly detection accuracy by 25%",
      "Authored comprehensive quarterly security reports with actionable threat intelligence and risk mitigation strategies",
      "Collaborated with cross-functional teams to implement security best practices and incident response protocols",
    ],
    color: "experience",
  },
  {
    title: "Machine Learning Intern",
    company: "WinnoVation",
    location: "Jammu, J&K",
    period: "June 2024 – July 2024",
    highlights: [
      "Architected predictive maintenance ML pipeline using TensorFlow and Keras, achieving 15% increase in equipment uptime",
      "Designed and optimized neural network models with hyperparameter tuning, achieving 92% prediction accuracy",
      "Implemented robust data preprocessing pipeline including feature engineering and outlier detection",
      "Deployed scalable ML models in production, reducing maintenance costs by $50K annually",
    ],
    color: "primary",
  },
  {
    title: "Data Science Intern",
    company: "LearnTube.ai",
    location: "Remote, India",
    period: "May 2024 – July 2024",
    highlights: [
      "Conducted exploratory data analysis on 1M+ user records, improving data quality by 35%",
      "Built ML-driven recommendation system that increased user engagement by 20%",
      "Created interactive data visualization dashboards using Plotly and Seaborn",
      "Performed statistical analysis and A/B testing to optimize platform features",
    ],
    color: "project",
  },
];

const Experience = () => {
  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/30",
        text: "text-primary",
        dot: "bg-primary",
      },
      experience: {
        bg: "bg-experience/10",
        border: "border-experience/30",
        text: "text-experience",
        dot: "bg-experience",
      },
      project: {
        bg: "bg-project/10",
        border: "border-project/30",
        text: "text-project",
        dot: "bg-project",
      },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-experience glass glass-border rounded-full">
            {"<Experience />"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building expertise through hands-on experience in leading tech organizations
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ originY: 0 }}
          />

          {experiences.map((exp, index) => {
            const colorClasses = getColorClass(exp.color);
            const isLeft = index % 2 === 0;

            return (
              <ScrollReveal
                key={exp.title}
                delay={index * 0.2}
                direction={isLeft ? "left" : "right"}
                className="relative mb-12 md:mb-16 pl-8 md:pl-0"
              >
                {/* Timeline dot */}
                <motion.div 
                  className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full ${colorClasses.dot} md:-translate-x-1/2 -translate-y-1 ring-4 ring-background`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 300 }}
                />

                {/* Card */}
                <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <motion.div 
                    className="p-6 glass glass-border rounded-2xl hover:shadow-elevated transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div 
                        className={`p-3 rounded-xl ${colorClasses.bg}`}
                        whileHover={{ rotate: 10 }}
                      >
                        <Briefcase className={`w-5 h-5 ${colorClasses.text}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                        <p className={`font-medium ${colorClasses.text}`}>{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                        >
                          <span className={`mt-2 w-1.5 h-1.5 rounded-full ${colorClasses.dot} flex-shrink-0`} />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
