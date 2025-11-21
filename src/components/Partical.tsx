"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const ParticleMorph = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const particlesRef = useRef<THREE.Points<
    THREE.BufferGeometry,
    THREE.PointsMaterial
  > | null>(null);
  const initialized = useRef(false);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);

  const count = 10000;

  // Hidden canvas for text
  const textCanvas = document.createElement("canvas");
  const ctx = textCanvas.getContext("2d")!;

  // ------------------------------------------------------------------------
  // INIT : SPHERE + AUDIO + ANIMATION
  // ------------------------------------------------------------------------
  useEffect(() => {
    if (!mountRef.current) return;
    if (initialized.current) return;
    initialized.current = true;

    initAudio();
    initThree();
    createSphereParticles();
    animate();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ------------------------------------------------------------------------
  // INIT AUDIO INPUT (MIC)
  // ------------------------------------------------------------------------
  async function initAudio() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    analyserRef.current = analyser;
    source.connect(analyser);
    frequencyDataRef.current = new Uint8Array(
      analyser.frequencyBinCount,
    ) as Uint8Array;
  }

  // ------------------------------------------------------------------------
  // INIT THREE.JS
  // ------------------------------------------------------------------------
  function initThree() {
    sceneRef.current = new THREE.Scene();

    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    cameraRef.current.position.z = 25;

    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.setClearColor(0x000000, 0);

    mountRef.current!.appendChild(rendererRef.current.domElement);
  }

  // ------------------------------------------------------------------------
  // CREATE SPHERE SHAPE PARTICLES
  // ------------------------------------------------------------------------
  function createSphereParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    function spherical(i: number) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      return {
        x: 8 * Math.cos(theta) * Math.sin(phi),
        y: 8 * Math.sin(theta) * Math.sin(phi),
        z: 8 * Math.cos(phi),
      };
    }

    for (let i = 0; i < count; i++) {
      const p = spherical(i);
      positions[i * 3 + 0] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    particlesRef.current = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.06 }),
    );

    sceneRef.current!.add(particlesRef.current);
  }

  // ------------------------------------------------------------------------
  // ANIMATION LOOP
  // ------------------------------------------------------------------------
  function animate() {
    requestAnimationFrame(animate);

    const particles = particlesRef.current;
    const analyser = analyserRef.current;
    const freq = frequencyDataRef.current;

    if (particles && analyser && freq) {
      analyser.getByteFrequencyData(freq);

      // Average amplitude
      let avg = freq.reduce((a, b) => a + b, 0) / freq.length;

      // Low frequencies = Bass
      let bass = freq[1] / 255;

      // High frequencies = Treble
      let treble = freq[freq.length - 10] / 255;

      // ----------------------------------------------------
      // 🎉 FUNNY ANIMATIONS
      // ----------------------------------------------------

      // 1️⃣ BOUNCE like a jellyball on bass
      const bounceScale = 1 + bass * 0.8;
      particles.scale.set(bounceScale, bounceScale, bounceScale);

      // 2️⃣ WOBBLE ROTATION (funny shaky spin)
      particles.rotation.y += 0.004 + treble * 0.02;
      particles.rotation.x += 0.002 + bass * 0.015;

      // 3️⃣ WAVE distortion inside sphere
      const pos = particles.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let ix = i * 3;

        pos.array[ix + 0] += Math.sin(avg * 0.03 + i * 0.02) * 0.003; // x wiggle
        pos.array[ix + 1] += Math.cos(avg * 0.03 + i * 0.015) * 0.003; // y wiggle
        pos.array[ix + 2] += Math.sin(avg * 0.05 + i * 0.01) * 0.003; // z wiggle
      }
      pos.needsUpdate = true;

      // 4️⃣ COLOR CHANGE — reacts to high frequency
      const color = new THREE.Color();

      color.setHSL((treble + bass) % 1, 1, 0.6);
      particles.material.color = color;
    }

    rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
  }

  // ------------------------------------------------------------------------
  // RESIZE HANDLER
  // ------------------------------------------------------------------------
  function handleResize() {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }

  // ------------------------------------------------------------------------
  // GENERATE POINTS FOR TEXT
  // ------------------------------------------------------------------------
  function textToPoints(text: string) {
    const size = 300;
    textCanvas.width = size;
    textCanvas.height = size;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "white";
    ctx.font = "bold 140px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);

    const data = ctx.getImageData(0, 0, size, size).data;
    const points: THREE.Vector3[] = [];

    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        const index = (y * size + x) * 4;
        if (data[index] > 150) {
          points.push(
            new THREE.Vector3((x - size / 2) * 0.12, (size / 2 - y) * 0.12, 0),
          );
        }
      }
    }

    return points;
  }

  // ------------------------------------------------------------------------
  // MORPH INTO TEXT
  // ------------------------------------------------------------------------
  const handleMorph = () => {
    const text = inputRef.current?.value.trim() || "";
    if (!text) return;

    const particles = particlesRef.current;
    if (!particles) return;

    const target = textToPoints(text);
    const pos = particles.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const src = {
        x: pos.array[i * 3 + 0],
        y: pos.array[i * 3 + 1],
        z: pos.array[i * 3 + 2],
      };

      const trg = target[i % target.length];

      gsap.to(src, {
        x: trg.x,
        y: trg.y,
        z: trg.z,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          pos.array[i * 3 + 0] = src.x;
          pos.array[i * 3 + 1] = src.y;
          pos.array[i * 3 + 2] = src.z;
          pos.needsUpdate = true;
        },
      });
    }
  };

  // ------------------------------------------------------------------------
  // JSX
  // ------------------------------------------------------------------------
  return (
    <>
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      />

    </>
  );
};

export default ParticleMorph;
