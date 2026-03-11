import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x,289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v,C.yy));
  vec2 x0 = v - i + dot(i,C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i,289.0);
  vec3 p = permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m = max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0*fract(p*C.www)-1.0;
  vec3 h = abs(x)-0.5;
  vec3 ox = floor(x+0.5);
  vec3 a0 = x-ox;
  m *= 1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x *x0.x  +h.x *x0.y;
  g.yz = a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 c0 = uColorStops[0], c1 = uColorStops[1], c2 = uColorStops[2];
  vec3 ramp = uv.x < 0.5 ? mix(c0, c1, uv.x*2.0) : mix(c1, c2, (uv.x-0.5)*2.0);
  float height = snoise(vec2(uv.x*2.0 + uTime*0.1, uTime*0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y*2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float auroraAlpha = smoothstep(0.20 - uBlend*0.5, 0.20 + uBlend*0.5, intensity);
  vec3 auroraColor = intensity * ramp;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}`

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255]
}

interface Props {
  colorStops?: [string, string, string]
  amplitude?: number
  blend?: number
  speed?: number
  opacity?: number
  style?: React.CSSProperties
}

export default function AuroraBackground({
  colorStops = ['#1a4080', '#6d28d9', '#0e7490'],
  amplitude = 1.2,
  blend = 0.55,
  speed = 0.08,
  opacity = 0.6,
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return // WebGL2 not available — canvas stays transparent

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    const uTime      = gl.getUniformLocation(prog, 'uTime')
    const uAmplitude = gl.getUniformLocation(prog, 'uAmplitude')
    const uColorStops = gl.getUniformLocation(prog, 'uColorStops')
    const uResolution = gl.getUniformLocation(prog, 'uResolution')
    const uBlend     = gl.getUniformLocation(prog, 'uBlend')

    gl.uniform3fv(uColorStops, colorStops.flatMap(hexToRgb))
    gl.uniform1f(uAmplitude, amplitude)
    gl.uniform1f(uBlend, blend)

    function resize() {
      const p = canvas!.parentElement
      if (!p) return
      canvas!.width  = p.offsetWidth
      canvas!.height = p.offsetHeight
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    let rafId = 0
    function frame() {
      const t = (performance.now() - t0) / 1000
      gl!.uniform1f(uTime, t * speed)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, []) // intentionally empty — props are stable at mount time

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        opacity,
        ...style,
      }}
    />
  )
}
