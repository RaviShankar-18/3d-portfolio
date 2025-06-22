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
    // Clear existing cubes
    cubesRef.current.forEach((cube) => {
      if (sceneRef.current) {
        sceneRef.current.remove(cube);
      }
    });
    cubesRef.current = [];

    const sections = Object.keys(sectionColors);
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 4 : 6;

    sections.forEach((section, index) => {
      const angle = (index / sections.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * (isMobile ? 1.5 : 2);

      const cube = createCube(x, y, z, section);
      cubesRef.current.push(cube);
      if (sceneRef.current) {
        sceneRef.current.add(cube);
      }
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
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 100 : 200; // Reduce particles on mobile for performance
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * (isMobile ? 60 : 100);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d4aa,
      size: isMobile ? 0.15 : 0.1, // Slightly larger particles on mobile
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    if (sceneRef.current) {
      sceneRef.current.add(particles);
    }
  }, []);

  const updateCameraForScreen = useCallback(() => {
    if (!cameraRef.current) return;

    const isMobile = window.innerWidth < 768;
    const aspect = window.innerWidth / window.innerHeight;

    cameraRef.current.aspect = aspect;

    // Adjust camera position based on screen size
    if (isMobile) {
      cameraRef.current.position.set(0, 0, 15); // Move camera further back on mobile

      // Adjust cube positions for mobile
      cubesRef.current.forEach((cube, index) => {
        const sections = Object.keys(sectionColors);
        const angle = (index / sections.length) * Math.PI * 2;
        const radius = 4; // Smaller radius for mobile
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 1.5; // Reduced vertical spread

        cube.position.set(x, y, z);
        cube.userData.originalPosition = { x, y, z };
      });
    } else {
      cameraRef.current.position.set(0, 0, 10);

      // Restore desktop positions
      cubesRef.current.forEach((cube, index) => {
        const sections = Object.keys(sectionColors);
        const angle = (index / sections.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 2;

        cube.position.set(x, y, z);
        cube.userData.originalPosition = { x, y, z };
      });
    }

    cameraRef.current.updateProjectionMatrix();
  }, []);

  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      updateCameraForScreen();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  }, [updateCameraForScreen]);

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

    // Skip cursor updates on touch devices
    if ("ontouchstart" in window) return;

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
      // Clean up existing scene
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Scene setup
      sceneRef.current = new THREE.Scene();
      sceneRef.current.fog = new THREE.Fog(0x1a1a2e, 10, 50);

      // Camera with mobile consideration
      const isMobile = window.innerWidth < 768;
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // Set initial camera position
      if (isMobile) {
        cameraRef.current.position.set(0, 0, 15);
      } else {
        cameraRef.current.position.set(0, 0, 10);
      }

      // Renderer with mobile optimizations
      rendererRef.current = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile, // Disable antialiasing on mobile for performance
        alpha: true,
        powerPreference: isMobile ? "low-power" : "high-performance",
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0);

      // Adjust pixel ratio for mobile
      const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 2 : 3);
      rendererRef.current.setPixelRatio(pixelRatio);

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 5);
      sceneRef.current.add(ambientLight, directionalLight);

      // Create objects
      createCubes();
      createParticles();

      // Initial camera setup
      updateCameraForScreen();

      // Add event listeners
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleCubeHover);
      window.addEventListener("click", handleCubeClick);
      window.addEventListener("mousemove", updateCursorStyle);

      // Add touch events for mobile
      if ("ontouchstart" in window) {
        canvas.addEventListener("touchstart", handleCubeClick, {
          passive: false,
        });
        canvas.addEventListener("touchmove", (e) => e.preventDefault(), {
          passive: false,
        });
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleCubeHover);
        window.removeEventListener("click", handleCubeClick);
        window.removeEventListener("mousemove", updateCursorStyle);

        if ("ontouchstart" in window && canvas) {
          canvas.removeEventListener("touchstart", handleCubeClick);
          canvas.removeEventListener("touchmove", (e) => e.preventDefault());
        }

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        // Clean up Three.js objects
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
        if (sceneRef.current) {
          sceneRef.current.clear();
        }
      };
    },
    [
      createCubes,
      createParticles,
      updateCameraForScreen,
      handleResize,
      handleCubeHover,
      handleCubeClick,
      updateCursorStyle,
    ]
  );

  return { initScene, startAnimation };
};
