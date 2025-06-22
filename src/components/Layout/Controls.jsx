// src/components/Layout/Controls.jsx
import styles from "./Controls.module.css";

const Controls = () => {
  return (
    <div className={styles.controls}>
      <h4 className={styles.title}>Controls</h4>
      <ul className={styles.controlsList}>
        <li>🖱️ Click & Drag: Rotate view</li>
        <li>🔍 Scroll: Zoom in/out</li>
        <li>📦 Click cubes: View details</li>
        <li>📱 Mobile: Touch & swipe</li>
      </ul>
    </div>
  );
};

export default Controls;
