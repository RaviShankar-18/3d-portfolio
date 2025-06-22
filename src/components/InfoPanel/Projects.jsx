// src/components/InfoPanel/Projects.jsx
import styles from "./InfoPanel.module.css";

const Projects = () => {
  const projects = [
    {
      title: "Resource Management System",
      description:
        "Full-stack MERN application for managing engineering team assignments",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://resource-pro.vercel.app",
      github: "https://github.com/YourUsername/resource-pro",
    },
    // Add more projects
  ];

  return (
    <div className={styles.section}>
      <h2 className="text-primary mb-4">Featured Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className={`${styles.projectCard} mb-4`}>
            <h3 className="h5 text-light">{project.title}</h3>
            <p className="text-muted">{project.description}</p>

            <div className="tech-stack mb-3">
              {project.tech.map((tech, i) => (
                <span key={i} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="d-flex gap-2">
              <a
                href={project.link}
                className="btn btn-sm btn-primary"
                target="_blank"
              >
                Live Demo
              </a>
              <a
                href={project.github}
                className="btn btn-sm btn-outline-light"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
