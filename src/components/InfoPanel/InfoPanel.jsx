// src/components/InfoPanel/InfoPanel.jsx
import { useEffect } from "react";
import styles from "./InfoPanel.module.css";
import { portfolioData } from "../../data/portfolioData";

const InfoPanel = ({ isVisible, onClose, currentSection }) => {
  const content = portfolioData[currentSection];

  return (
    <div className={`${styles.infoPanel} ${isVisible ? styles.active : ""}`}>
      <div className={styles.header}>
        <h2>{content.title}</h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </div>
    </div>
  );
};

export default InfoPanel;
