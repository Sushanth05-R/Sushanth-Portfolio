"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Radio, Sparkles } from "lucide-react";
import { sounds } from "@/utils/soundEffects";

// High-precision GPU shader replicating the crisp 3D woven tentacle reactor sphere from the video
const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_pulse;

#define PI 3.14159265359

mat3 rotateY(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

mat3 rotateX(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}

// Procedural surface displacement of the woven porcelain tentacle strands
float getDisplacement(vec3 p, out float outCavity, out float outRidge) {
  float r = length(p.xy);
  float theta = atan(p.y, p.x);
  
  // Center vortex / eye cavity
  float cavity = smoothstep(0.06, 0.38, r);
  outCavity = cavity;
  
  // Organic spiral twist for the strands
  float twist = theta * 52.0 + sin(r * 11.0 - u_time * 1.3) * 2.0 + u_pulse * sin(r * 25.0);
  
  // Rounded rope/tentacle ridge profile
  float s = sin(twist);
  float ridge = pow(clamp(0.5 + 0.5 * s, 0.0, 1.0), 0.5);
  outRidge = ridge;
  
  // Micro-groove texture
  float micro = sin(theta * 104.0 + r * 22.0) * 0.06;
  
  // Envelope tapering at outer edge and inner core
  float envelope = smoothstep(0.12, 0.45, r) * smoothstep(1.05, 0.72, r);
  
  // Inner funnel dip
  float dip = (1.0 - cavity) * -0.32;
  
  return (ridge * 0.095 + micro * 0.025) * envelope + dip;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  
  // Frame scaling so the sphere sits inside with elegant breathing room
  uv *= 2.15;
  
  // Smooth mouse tilt angles
  float rotY = (u_mouse.x - 0.5) * 1.6;
  float rotX = -(u_mouse.y - 0.5) * 1.3;
  mat3 rot = rotateX(rotX) * rotateY(rotY);
  
  vec3 ro = vec3(uv.x, uv.y, 2.5);
  vec3 rd = vec3(0.0, 0.0, -1.0);
  
  vec3 sphereCenter = vec3(0.0, 0.0, 0.0);
  float sphereRadius = 0.88 + u_pulse * 0.035;
  
  // Exact Ray-Sphere intersection
  vec3 oc = ro - sphereCenter;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sphereRadius * sphereRadius;
  float discriminant = b * b - c;
  
  vec3 finalColor = vec3(0.0);
  float finalAlpha = 0.0;
  
  float distFromCenter = length(uv);
  
  // Inner Radiant Plasma Core Bloom
  float centerBloom = 0.042 / (distFromCenter * distFromCenter + 0.022);
  vec3 coreFire = vec3(1.0, 0.45, 0.08) * centerBloom * 1.35;
  vec3 coreHotWhite = vec3(1.0, 0.95, 0.7) * (0.012 / (distFromCenter * distFromCenter + 0.007));
  
  if (discriminant > 0.0) {
    float t = -b - sqrt(discriminant);
    vec3 hitPoint = ro + rd * t;
    
    // Rotate hitpoint by user mouse rotation
    vec3 p = rot * hitPoint;
    
    float cavity = 0.0;
    float ridge = 0.0;
    float disp = getDisplacement(p, cavity, ridge);
    
    // Analytic surface gradient perturbation
    vec2 eps = vec2(0.004, 0.0);
    float d1, d2;
    float dX = getDisplacement(p + eps.xyy, d1, d2) - getDisplacement(p - eps.xyy, d1, d2);
    float dY = getDisplacement(p + eps.yxy, d1, d2) - getDisplacement(p - eps.yxy, d1, d2);
    
    vec3 baseNormal = normalize(p);
    vec3 perturbedNormal = normalize(baseNormal + vec3(-dX * 18.0, -dY * 18.0, 0.0));
    
    // Re-orient normal into world view space
    mat3 invRot = rotateY(-rotY) * rotateX(-rotX);
    vec3 worldNormal = invRot * perturbedNormal;
    
    // 3-point studio lighting
    vec3 light1 = normalize(vec3(0.65, 0.85, 1.2));  // Key light (top-left)
    vec3 light2 = normalize(vec3(-0.75, -0.4, 0.6)); // Soft fill light
    
    float diff1 = max(dot(worldNormal, light1), 0.0);
    float diff2 = max(dot(worldNormal, light2), 0.0) * 0.35;
    
    // Sharp specular shine on porcelain rope
    vec3 halfVec = normalize(light1 - rd);
    float spec = pow(max(dot(worldNormal, halfVec), 0.0), 34.0) * 0.45;
    
    // Ambient occlusion in strand grooves
    float ao = smoothstep(0.12, 0.88, ridge);
    
    // Clean porcelain/titanium body
    vec3 porcelain = mix(vec3(0.38, 0.42, 0.48), vec3(0.96, 0.97, 0.99), ridge);
    vec3 litSurface = porcelain * (diff1 * 0.78 + diff2 + 0.26) * ao + spec;
    
    // Rim lighting (Fresnel)
    float fresnel = pow(1.0 - max(dot(-rd, worldNormal), 0.0), 3.0);
    litSurface += vec3(0.35, 0.75, 0.7) * fresnel * 0.38;
    
    // Inner thermal glow radiating through the strands
    float r = length(p.xy);
    float innerHeat = smoothstep(0.52, 0.14, r);
    vec3 heatColor = mix(vec3(1.0, 0.32, 0.05), vec3(1.0, 0.86, 0.3), smoothstep(0.32, 0.08, r));
    litSurface = mix(litSurface, heatColor * 2.2, innerHeat * (1.0 - cavity * 0.55));
    
    // Deep center vortex plasma exposure
    if (cavity < 0.28) {
      float coreFactor = 1.0 - cavity / 0.28;
      vec3 plasma = mix(vec3(1.0, 0.5, 0.1), vec3(1.0, 0.98, 0.85), coreFactor);
      litSurface = mix(litSurface, plasma * 3.2, coreFactor);
    }
    
    // Anti-aliased outer edge
    float edgeDist = length(hitPoint.xy) / sphereRadius;
    float edgeAlpha = smoothstep(1.0, 0.975, edgeDist);
    
    finalColor = litSurface;
    finalAlpha = edgeAlpha;
  }
  
  // Add volumetric fiery bloom radiating outward
  finalColor += coreFire + coreHotWhite;
  finalAlpha = max(finalAlpha, clamp(centerBloom * 0.8, 0.0, 1.0));
  
  // Clean falloff at boundary
  finalColor *= smoothstep(1.8, 0.2, distFromCenter);
  finalAlpha *= smoothstep(1.9, 0.7, distFromCenter);
  
  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export function QuantumReactorCore() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coreTemp, setCoreTemp] = useState(3412);
  const [isSurging, setIsSurging] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const pulseRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, powerPreference: "high-performance" });
    if (!gl) return;

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

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uPulse = gl.getUniformLocation(program, "u_pulse");

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

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      pulseRef.current *= 0.94;

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uPulse, pulseRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

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
    <div className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center select-none">
      {/* Subtle outer tech telemetry brackets - placed cleanly away from the sphere */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 font-mono text-[10px] text-slate-400 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#070b14]/80 px-3 py-1 backdrop-blur-md">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">[CORE_TEMP: {coreTemp}&deg;K]</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#070b14]/80 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-medium">[QUANTUM_SYNC: 99.8%]</span>
          </div>
        </div>

        {/* Ambient dashed orbital rings */}
        <div className="absolute inset-6 rounded-full border border-emerald-500/10 pointer-events-none border-dashed animate-[spin_80s_linear_infinite]" />
        <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="rounded-full border border-white/10 bg-[#070b14]/80 px-3 py-1 backdrop-blur-md text-slate-400 text-[10px]">
            <span>COORDS: 13.34&deg;N // 74.74&deg;E</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-[#070b14]/80 px-3 py-1 backdrop-blur-md text-amber-300 font-semibold text-[10px]">
            <Zap className="w-3 h-3 fill-amber-300" />
            <span>{isSurging ? "PLASMA BURST" : "FUSION ACTIVE"}</span>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCoreClick}
        className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-95 z-0"
        title="Interactive 3D Quantum Reactor Sphere - Move mouse to rotate, click to pulse"
      />

      {/* Subtle Bottom Interactive Hint */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCoreClick}
        className="absolute -bottom-2 z-20 rounded-full border border-emerald-500/40 bg-[#070b14]/90 px-4 py-1.5 text-[11px] font-mono text-emerald-300 backdrop-blur-xl shadow-lg shadow-emerald-500/20 hover:border-emerald-400 hover:text-white transition-all flex items-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Click to Pulse Core</span>
      </motion.button>
    </div>
  );
}
