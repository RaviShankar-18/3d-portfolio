// src/components/ThreeScene/Scene.jsx
import { useEffect, useRef } from "react";
import styles from "./Scene.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

const Scene = ({ currentSection, onSectionChange }) => {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);
  const { initScene, startAnimation } = useThreeScene(
    currentSection,
    onSectionChange
  );

  useEffect(() => {
    if (canvasRef.current && !cleanupRef.current) {
      cleanupRef.current = initScene(canvasRef.current);
      startAnimation();
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  // Separate effect for section changes
  useEffect(() => {
    // This will handle any section-specific updates if needed
    // Currently the hook handles section changes internally
  }, [currentSection]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default Scene;
