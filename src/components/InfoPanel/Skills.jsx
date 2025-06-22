// src/components/InfoPanel/Skills.jsx
import styles from "./InfoPanel.module.css";

const Skills = () => {
  return (
    <div className={styles.section}>
      <h2 className="text-primary mb-4">Technical Skills</h2>

      <div className="skill-category mb-4">
        <h3 className="h5 text-light border-bottom pb-2">
          Frontend Development
        </h3>
        <div className="row g-3 mt-2">
          {["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"].map(
            (skill) => (
              <div key={skill} className="col-6 col-md-4">
                <div className={`${styles.skillBadge} p-2 text-center rounded`}>
                  {skill}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="skill-category mb-4">
        <h3 className="h5 text-light border-bottom pb-2">
          Backend Development
        </h3>
        <div className="row g-3 mt-2">
          {["Node.js", "Express.js", "MongoDB", "RESTful APIs"].map((skill) => (
            <div key={skill} className="col-6 col-md-4">
              <div className={`${styles.skillBadge} p-2 text-center rounded`}>
                {skill}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skill-category mb-4">
        <h3 className="h5 text-light border-bottom pb-2">Tools & Others</h3>
        <div className="row g-3 mt-2">
          {["Git", "VS Code", "Postman", "Vercel", "npm"].map((skill) => (
            <div key={skill} className="col-6 col-md-4">
              <div className={`${styles.skillBadge} p-2 text-center rounded`}>
                {skill}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
