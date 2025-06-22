// src/components/ThreeScene/Scene.jsx
import { useEffect, useRef } from "react";
import styles from "./Scene.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

const Scene = ({ currentSection, onSectionChange }) => {
  const canvasRef = useRef(null);
  const { initScene, startAnimation } = useThreeScene(
    currentSection,
    onSectionChange
  );

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initScene(canvasRef.current);
      startAnimation();
      return cleanup;
    }
  }, [initScene, startAnimation]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Scene;
