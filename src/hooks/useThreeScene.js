// src/hooks/useThreeScene.js
import { useCallback, useRef, useEffect } from "react";
import * as THREE from "three";
import { sectionColors } from "../data/portfolioData";

export const useThreeScene = (currentSection, onSectionChange) => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cubesRef = useRef([]);
  const animationFrameRef = useRef(null);

  const createCube = (x, y, z, section) => {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshPhongMaterial({
      color: sectionColors[section],
      transparent: true,
      opacity: 0.8,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    cube.userData = { section, originalPosition: { x, y, z } };
    return cube;
  };

  const createCubes = useCallback(() => {
    const sections = Object.keys(sectionColors);
    const radius = 6;

    sections.forEach((section, index) => {
      const angle = (index / sections.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 2;

      const cube = createCube(x, y, z, section);
      cubesRef.current.push(cube);
      sceneRef.current.add(cube);
    });
  }, []);

  const handleCubeClick = useCallback(
    (event) => {
      if (!cameraRef.current) return;

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(cubesRef.current);

      if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        const section = clickedCube.userData.section;
        onSectionChange(section);

        // Visual feedback
        clickedCube.scale.set(1.4, 1.4, 1.4);
        setTimeout(() => {
          clickedCube.scale.set(1, 1, 1);
        }, 200);
      }
    },
    [onSectionChange]
  );

  const handleCubeHover = useCallback((event) => {
    if (!cameraRef.current) return;

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(cubesRef.current);

    cubesRef.current.forEach((cube) => {
      if (intersects.length > 0 && intersects[0].object === cube) {
        cube.scale.set(1.2, 1.2, 1.2);
        cube.material.opacity = 1;
      } else {
        cube.scale.set(1, 1, 1);
        cube.material.opacity = 0.8;
      }
    });
  }, []);

  const createParticles = useCallback(() => {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d4aa,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
  }, []);

  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    animationFrameRef.current = requestAnimationFrame(animate);

    // Animate cubes
    cubesRef.current.forEach((cube, index) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      const time = Date.now() * 0.001;
      cube.position.y =
        cube.userData.originalPosition.y + Math.sin(time + index) * 0.5;
    });

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const startAnimation = useCallback(() => {
    animate();
  }, [animate]);

  const updateCursorStyle = useCallback((event) => {
    if (!cameraRef.current) return;

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const intersects = raycaster.intersectObjects(cubesRef.current);
    document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
  }, []);

  const initScene = useCallback(
    (canvas) => {
      // Scene setup
      sceneRef.current = new THREE.Scene();
      sceneRef.current.fog = new THREE.Fog(0x1a1a2e, 10, 50);

      // Camera
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.set(0, 0, 10);

      // Renderer
      rendererRef.current = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      sceneRef.current.add(ambientLight, directionalLight);

      // Create objects
      createCubes();
      createParticles();

      // Add event listeners
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleCubeHover);
      window.addEventListener("click", handleCubeClick);
      window.addEventListener("mousemove", updateCursorStyle);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleCubeHover);
        window.removeEventListener("click", handleCubeClick);
        window.removeEventListener("mousemove", updateCursorStyle);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    },
    [
      handleCubeHover,
      handleCubeClick,
      createCubes,
      createParticles,
      handleResize,
      updateCursorStyle,
    ]
  );

  return { initScene, startAnimation };
};
