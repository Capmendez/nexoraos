import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SignalStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Video texture
    const video = document.createElement('video');
    video.src = '/videos/wave.mp4';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Custom sinusoidal tube geometry using PlaneGeometry
    const planeGeom = new THREE.PlaneGeometry(16, 4, 200, 50);
    const posAttribute = planeGeom.attributes.position;
    const vertexCount = posAttribute.count;

    for (let i = 0; i < vertexCount; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);

      // Map x from [-8, 8] to t [0, 1]
      const t = (x + 8) / 16;
      const pathY = Math.sin(2 * Math.PI * t);

      // Offset vertices perpendicular to the path based on original y
      const newY = pathY + y * 0.5;

      posAttribute.setY(i, newY);
    }

    planeGeom.computeVertexNormals();

    // Shader material
    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y += sin(uTime + position.x) * 0.08;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec4 texColor = texture2D(uTexture, vUv);
          // Teal color grading: #00E5C7
          vec3 finalColor = texColor.rgb * vec3(0.0, 0.9, 0.78);
          // Edge glow
          float edge = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          finalColor += vec3(0.0, 0.5, 0.4) * (1.0 - edge) * 0.3;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(planeGeom, material);
    scene.add(mesh);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      0.6,
      0.5,
      0.7
    );
    composer.addPass(bloomPass);

    let time = 0;
    let rafId: number;

    function animate() {
      time += 0.005;
      uniforms.uTime.value = time;
      mesh.rotation.y = Math.sin(time * 0.2) * 0.1;
      mesh.rotation.x = Math.cos(time * 0.15) * 0.05;
      composer.render();
      rafId = requestAnimationFrame(animate);
    }

    if (isVisible) {
      video.play().catch(() => {});
      animate();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      video.pause();
      video.src = '';
      renderer.dispose();
      material.dispose();
      planeGeom.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.reveal-item');
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signal-stream"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p className="section-label reveal-item">MODULE: SIGNAL_STREAM</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          The system is alive.
        </h2>
      </div>

      <div
        className="reveal-item"
        ref={containerRef}
        style={{
          maxWidth: '900px',
          margin: '3rem auto 0',
          height: 'clamp(200px, 35vw, 400px)',
          position: 'relative',
        }}
      />

      <p
        className="font-mono reveal-item"
        style={{
          fontSize: '0.6875rem',
          color: '#A1A1A1',
          textAlign: 'center',
          marginTop: '1.5rem',
          letterSpacing: '0.08em',
        }}
      >
        LIVE SYSTEM FEED ● PROCESSING
      </p>
    </section>
  );
}