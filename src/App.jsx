// src/App.jsx
import { useState } from "react";
import Navigation from "./components/Layout/Navigation";
import Scene from "./components/ThreeScene/Scene";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import Controls from "./components/Layout/Controls";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles/App.module.css";

function App() {
  const [currentSection, setCurrentSection] = useState("about");
  const [isPanelVisible, setPanelVisible] = useState(true);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setPanelVisible(true);
  };

  return (
    <div className={styles.appContainer}>
      <Scene
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      <div className={styles.uiLayer}>
        <Navigation
          onSectionChange={handleSectionChange}
          currentSection={currentSection}
        />

        <InfoPanel
          isVisible={isPanelVisible}
          onClose={() => setPanelVisible(false)}
          currentSection={currentSection}
        />

        <Controls />
      </div>
    </div>
  );
}

export default App;
