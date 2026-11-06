"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Radio, Cpu, Sparkles } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

// High-performance GPU WebGL Shader replicating the hypnotic 3D organic reactor sphere from the video
const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pulse;
varying vec2 vUv;

#define PI 3.14159265359

// Rotation matrix
mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

// 3D rotation around axis
vec3 rotateY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

vec3 rotateX(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

// Distance estimator for the organic ribbed reactor sphere
float map(vec3 p) {
  // Center radius
  float r = length(p);
  
  // Spherical coordinates
  float theta = atan(p.z, p.x);
  float phi = acos(clamp(p.y / (r + 0.0001), -1.0, 1.0));
  
  // Ribbed tentacle ridges (swirling into the core)
  float ribs = 42.0;
  float twist = theta * ribs + phi * 12.0 + u_time * 1.5;
  float ribDisplacement = sin(twist) * 0.045 * (1.0 - smoothstep(0.1, 1.3, r));
  
  // Inner torus / hollow core eye
  float sphere = r - (0.95 + ribDisplacement + u_pulse * 0.05);
  
  // Carve out center vortex tunnel
  float hole = length(p.xy) - 0.28 + sin(p.z * 5.0 + u_time) * 0.03;
  
  return max(sphere, -hole);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.003, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  
  // Camera & Mouse rotation
  vec3 ro = vec3(0.0, 0.0, 2.4);
  vec3 rd = normalize(vec3(uv, -1.2));
  
  // Mouse tilt
  float rotYAngle = (u_mouse.x - 0.5) * 1.6;
  float rotXAngle = (u_mouse.y - 0.5) * 1.2;
  
  ro = rotateY(ro, rotYAngle);
  ro = rotateX(ro, rotXAngle);
  rd = rotateY(rd, rotYAngle);
  rd = rotateX(rd, rotXAngle);
  
  // Raymarch loop
  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  
  for(int i = 0; i < 70; i++) {
    p = ro + rd * t;
    float d = map(p);
    if(d < 0.002) {
      hit = 1.0;
      break;
    }
    t += d * 0.7;
    if(t > 4.5) break;
  }
  
  vec3 color = vec3(0.0);
  
  // Background gradient
  float distFromCenter = length(uv);
  
  // Inner Fiery Reactor Eye Glow (The Core)
  float coreGlow = 0.08 / (distFromCenter * distFromCenter + 0.03);
  vec3 plasmaFire = vec3(1.0, 0.45, 0.1) * coreGlow * 1.2;
  vec3 emeraldAura = vec3(0.1, 0.9, 0.5) * (0.04 / (distFromCenter + 0.1));
  color += plasmaFire + emeraldAura;
  
  if(hit > 0.5) {
    vec3 n = calcNormal(p);
    vec3 lightDir = normalize(vec3(0.8, 1.2, 1.5));
    
    // Lighting components
    float diff = max(dot(n, lightDir), 0.0);
    float rim = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
    
    // Tentacle skin color (pearl white / titanium with ambient occlusion in crevice)
    float r = length(p);
    vec3 skin = mix(vec3(0.92, 0.94, 0.97), vec3(0.35, 0.38, 0.45), smoothstep(0.4, 1.0, r));
    
    // Internal thermal emissive light radiating from within the hollow eye
    float innerHeat = smoothstep(0.8, 0.25, length(p.xy));
    vec3 heatGlow = vec3(1.0, 0.6, 0.15) * innerHeat * 3.5;
    
    vec3 shaded = skin * (diff * 0.7 + 0.3) + rim * vec3(0.4, 0.8, 0.7) * 0.6 + heatGlow;
    color = mix(color, shaded, 0.92);
  }
  
  // Subtle vignette
  color *= smoothstep(1.2, 0.3, distFromCenter);
  
  // Alpha blending: transparent around the edges so it embeds seamlessly into the dark UI
  float alpha = smoothstep(1.3, 0.1, distFromCenter);
  
  gl_FragColor = vec4(color, alpha);
}
`;

export function QuantumReactorCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coreTemp, setCoreTemp] = useState(3412);
  const [isSurging, setIsSurging] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const pulseRef = useRef(0);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "high-performance" });
    if (!gl) return;

    // Helper: compile shader
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uPulse = gl.getUniformLocation(program, "u_pulse");

    // Sizing
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, 1.0 - y));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animId: number;
    const startTime = performance.now();

    // Render loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Pulse decay
      pulseRef.current *= 0.95;

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uPulse, pulseRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Subtle temp flicker interval
    const tempInterval = setInterval(() => {
      setCoreTemp(3400 + Math.floor(Math.random() * 25));
    }, 1200);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(tempInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleCoreClick = () => {
    pulseRef.current = 1.0;
    setIsSurging(true);
    sounds.playChirp(720, 0.15);
    setCoreTemp((prev) => prev + 120);

    setTimeout(() => {
      setIsSurging(false);
    }, 800);
  };

  return (
    <div className="relative w-full max-w-[460px] sm:max-w-[520px] aspect-square flex items-center justify-center select-none group">
      {/* Sci-Fi HUD Crosshairs & Telemetry Markers */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 font-mono text-[10px] text-slate-400 z-10">
        {/* Top telemetry brackets */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2 py-1 backdrop-blur-md">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">[CORE_TEMP: {coreTemp}&deg;K]</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2 py-1 backdrop-blur-md">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300">[QUANT_SYNC: 99.8%]</span>
          </div>
        </div>

        {/* Center alignment crosshair rings */}
        <div className="absolute inset-10 rounded-full border border-emerald-500/10 pointer-events-none border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-20 rounded-full border border-cyan-500/10 pointer-events-none" />

        {/* Bottom telemetry brackets */}
        <div className="flex items-center justify-between">
          <div className="rounded-lg border border-white/10 bg-black/60 px-2 py-1 backdrop-blur-md text-slate-400">
            <span>AXIS: 13.34&deg;N // 74.74&deg;E</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 backdrop-blur-md text-amber-300 font-semibold">
            <Zap className="w-3 h-3 fill-amber-300" />
            <span>{isSurging ? "PLASMA SURGE" : "FUSION ACTIVE"}</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCoreClick}
        className="w-full h-full cursor-pointer transition-transform duration-300 active:scale-95 z-0"
        title="Click to trigger energy pulse"
      />

      {/* Floating Interactive Badge */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCoreClick}
        className="absolute bottom-5 z-20 rounded-full border border-emerald-500/40 bg-[#070b14]/90 px-3.5 py-1 text-[11px] font-mono text-emerald-300 backdrop-blur-xl shadow-lg shadow-emerald-500/20 hover:border-emerald-400 hover:text-white transition-colors flex items-center gap-1.5"
      >
        <Sparkles className="w-3 h-3 text-emerald-400" />
        <span>Interact with 3D Core</span>
      </motion.button>
    </div>
  );
}
