"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Earth
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const dayMaterial = new THREE.MeshPhongMaterial({
        map: createDayTexture(),
        shininess: 10,
    });
    const nightMaterial = new THREE.MeshPhongMaterial({
        map: createNightTexture(),
        shininess: 10,
    });
    const earth = new THREE.Mesh(geometry, theme === 'dark' ? nightMaterial : dayMaterial);
    scene.add(earth);
    
    // Stars for night mode
    let stars: THREE.Points | null = null;
    if (theme === 'dark') {
      stars = createStars();
      scene.add(stars);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.1 : 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y += 0.0005;
      if (stars) {
        stars.rotation.y -= 0.0002;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      dayMaterial.dispose();
      nightMaterial.dispose();
    };
  }, [theme]);

  const createDayTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    if(!context) return new THREE.CanvasTexture(canvas);
    
    context.fillStyle = '#4682B4'; // Ocean
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = '#228B22'; // Continents
    context.fillRect(200, 300, 400, 250); 
    context.fillRect(800, 200, 500, 400); 
    context.fillRect(1500, 500, 300, 200);

    return new THREE.CanvasTexture(canvas);
  }

  const createNightTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    if(!context) return new THREE.CanvasTexture(canvas);
    
    context.fillStyle = '#000033'; // Dark Ocean
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = '#1a1a1a'; // Dark Continents
    context.fillRect(200, 300, 400, 250); 
    context.fillRect(800, 200, 500, 400); 
    context.fillRect(1500, 500, 300, 200);
    
    // City lights
    context.fillStyle = 'yellow';
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        if(context.getImageData(x, y, 1, 1).data[0] < 30) { // only on continents
            context.fillRect(x, y, 2, 2);
        }
    }
    
    return new THREE.CanvasTexture(canvas);
  }
  
  const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
          const x = (Math.random() - 0.5) * 2000;
          const y = (Math.random() - 0.5) * 2000;
          const z = (Math.random() - 0.5) * 2000;
          const dist = x*x + y*y + z*z;
          if (dist > 100*100) { // avoid stars inside the sphere
            starVertices.push(x, y, z);
          }
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      return new THREE.Points(starGeometry, starMaterial);
  }

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default ThreeScene;
