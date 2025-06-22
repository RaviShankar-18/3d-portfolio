// src/components/Layout/Navigation.jsx
import styles from "./Navigation.module.css";

const Navigation = ({ onSectionChange, currentSection }) => {
  const sections = ["about", "skills", "projects", "contact"];

  return (
    <div className={styles.navigation}>
      <div className={styles.navContainer}>
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`${styles.navButton} ${
              currentSection === section ? styles.active : ""
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
