// src/components/InfoPanel/About.jsx
import styles from "./InfoPanel.module.css";

const About = () => {
  return (
    <div className={styles.section}>
      <h2 className="text-primary mb-4">About Me</h2>
      <div className="mb-4">
        <h3 className="h5 text-light">MERN Stack Developer</h3>
        <p>
          React.js developer with hands-on experience building full-stack
          applications using the MERN stack. Skilled in building scalable UIs
          with React, managing state with Context API, and deploying responsive
          web apps.
        </p>
      </div>
      <div className="mb-4">
        <h3 className="h5 text-light">Education</h3>
        <p>
          B.Tech in Computer Science & Engineering
          <br />
          Galgotias University, Greater Noida, India (2019 – 2023)
        </p>
      </div>
    </div>
  );
};

export default About;
