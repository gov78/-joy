import React, { useEffect, useRef } from 'react';

interface ShaderSphereProps {
  className?: string;
  size?: number | string;
  interactive?: boolean;
}

export const ShaderSphere: React.FC<ShaderSphereProps> = ({
  className = '',
  size = '100%',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      void main() {
        vec2 uv = (v_texCoord - 0.5) * 2.0;
        uv.x *= u_resolution.x / max(u_resolution.y, 1.0);
        
        // Base Glow (Breathing Champagne Gold)
        float breathe = sin(u_time * 0.8) * 0.5 + 0.5;
        vec3 color = vec3(0.0);
        
        float dist = length(uv);
        
        // Core Pulse (Warm Aurelian Gold #C5A059)
        float core = smoothstep(0.42, 0.0, dist);
        color += vec3(0.77, 0.63, 0.35) * core * (0.32 + 0.18 * breathe);
        
        // Layered Rings (Champagne Gold Highlight #E5C583)
        for(float i = 0.0; i < 3.0; i++) {
          vec2 rv = uv;
          rv *= rot(u_time * (0.2 + i * 0.12));
          float ring = abs(length(rv) - (0.42 + i * 0.06)) - 0.0025;
          ring = smoothstep(0.012, 0.0, ring);
          color += vec3(0.90, 0.77, 0.48) * ring * 0.65;
        }
        
        // Neural Particles/Lines
        vec2 gv = uv * 5.0;
        gv *= rot(u_time * 0.1);
        float lines = 0.0;
        for(float i = 0.0; i < 4.0; i++) {
          vec2 id = floor(gv);
          vec2 fv = fract(gv) - 0.5;
          float n = hash(id + i);
          if(n > 0.78) {
            float pulse = sin(u_time * 2.5 + n * 10.0) * 0.5 + 0.5;
            lines += smoothstep(0.12, 0.0, length(fv)) * pulse;
          }
          gv *= rot(0.5);
        }
        color += vec3(0.85, 0.70, 0.40) * lines * 0.4;
        
        // Vignette
        color *= smoothstep(1.2, 0.45, dist);
        
        gl_FragColor = vec4(color, core * 0.75 + lines * 0.35);
      }
    `;

    function compileShader(type: number, src: string): WebGLShader | null {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouseX = nx * canvas.width;
        mouseY = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    function syncSize() {
      if (!canvas || !gl) return;
      const w = canvas.clientWidth || 400;
      const h = canvas.clientHeight || 400;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => syncSize());
      resizeObserver.observe(canvas);
    }
    syncSize();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let startTime = performance.now();
    function render(t: number) {
      if (!gl || !canvas) return;
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (uTime) gl.uniform1f(uTime, (t - startTime) * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (gl && prog) {
        gl.deleteProgram(prog);
        if (vertShader) gl.deleteShader(vertShader);
        if (fragShader) gl.deleteShader(fragShader);
        if (buf) gl.deleteBuffer(buf);
      }
    };
  }, [interactive]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
