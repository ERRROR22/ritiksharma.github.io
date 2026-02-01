import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";
import ScrollReveal from "./animations/ScrollReveal";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

const courses = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "Cybersecurity",
  "Database Management",
  "Computer Networks",
  "Operating Systems",
  "Web Development",
  "Artificial Intelligence",
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary glass glass-border rounded-full">
              {"<Education />"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Academic <span className="text-gradient">Background</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building a strong foundation in Computer Science with focus on emerging technologies.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {/* Main Education Card */}
          <ScrollReveal>
            <motion.div
              className="p-8 glass glass-border rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-xl bg-primary/10">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">
                    Bachelor of Technology
                  </h3>
                  <p className="text-lg text-primary font-medium">
                    Computer Science & Engineering
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    Baba Ghulam Shah Badshah University (BGSBU)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">2022 - 2026 (Expected)</span>
                </div>
              </div>

              {/* GPA */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-project/10 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Current CGPA</span>
                  <span className="text-2xl font-bold text-primary">8.5/10</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Relevant Courses */}
        <ScrollReveal delay={0.2}>
          <div className="mt-8 p-8 glass glass-border rounded-2xl max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-project" />
              <h3 className="text-xl font-bold">Relevant Coursework</h3>
            </div>

            <StaggerContainer className="flex flex-wrap gap-3">
              {courses.map((course, index) => (
                <StaggerItem key={index}>
                  <motion.span
                    className="px-4 py-2 text-sm font-medium bg-secondary/50 text-foreground rounded-lg border border-border hover:border-project/50 hover:bg-project/10 transition-all cursor-default"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {course}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Education;
