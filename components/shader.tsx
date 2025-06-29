"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ShaderMaterial } from "three"

import { Aurora } from "@/components/aurora"

const fragmentShader = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;
  
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

#define R iResolution.xy
#define T iTime
#define S smoothstep

uniform vec2 iResolution;
uniform float iTime;

float N(vec2 u, float o) {
    float t = (T + o) * .1;
    float n = snoise(vec3(u.x * .9 + t, u.y * .9 - t, t));
    return snoise(vec3(n * .2, n * .7, t * .05));
}

float C(vec2 u, float n, float s, float z) {
    return S(S(.1, s, length(u)), 0., length(u * vec2(z * .5, z) + n * .3) - .3);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    
    vec2 normalizedUV = gl_FragCoord.xy / iResolution.xy;
    vec2 ovalUV = vec2((normalizedUV.x - 0.5) * 1.5, normalizedUV.y - 0.5);
    float distanceFromCenter = length(ovalUV);
    float ovalGradient = smoothstep(1.3, 0.1, distanceFromCenter);
    
    float t = iTime * 0.4;
    float sinTime = sin(t);
    float cosTime = cos(t);
    
    float c1 = C(uv, N(uv * .6, 1.), 1.2, 1.1);
    float c2 = C(uv, N(uv * .5, 3.), 1.5, 1.4);
    float n = .08 * snoise(vec3(uv * 600., iTime * .05));
    
    vec3 amethyst = vec3(0.557, 0.329, 0.600);
    vec3 electricBlue = vec3(0.251, 0.718, 0.961);
    vec3 royalPurple = vec3(0.361, 0.251, 0.631);
    vec3 marianBlue = vec3(0.212, 0.325, 0.573);
    vec3 blueGreen = vec3(0.388, 0.675, 0.529);
    
    vec3 gradient1 = mix(amethyst, mix(electricBlue, blueGreen, sinTime * 0.5 + 0.5), 
        smoothstep(0.4, 1.2, normalizedUV.y + sinTime * 0.25));
    vec3 gradient2 = mix(amethyst, mix(marianBlue, blueGreen, cosTime * 0.5 + 0.5), 
        smoothstep(0.4, 1.2, normalizedUV.x + cosTime * 0.25));
    
    vec3 baseColor = mix(
        royalPurple + vec3(n * 0.1),
        n + mix(  
            mix(blueGreen, electricBlue, uv.y + 0.5),
            mix(mix(amethyst, marianBlue, uv.x + 0.5), marianBlue, uv.x + 0.5),
            clamp(-.1, .9, c1 - c2)
        ),
        clamp(0., 1., c1 + c2)
    );
    
    vec3 gradientColor = mix(gradient1, gradient2, 0.3 + 0.7 * sin(normalizedUV.x * 3.0 + sin(t)));
    vec3 finalColor = mix(baseColor, gradientColor, ovalGradient * 0.5);
    
    float saturation = 1.4;
    finalColor = mix(vec3(dot(finalColor, vec3(0.299, 0.587, 0.114))), finalColor, saturation);
    
    gl_FragColor = vec4(finalColor, 1.0);
} 
    `

const shaderMaterial = new ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
  },
  fragmentShader,
  vertexShader: "void main() { gl_Position = vec4(position, 1.0); }",
})

const Scene: React.FC = () => {
  const materialRef = useRef(shaderMaterial)

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.iResolution.value.set(
        size.width,
        size.height
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  )
}

const Shader: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Suspense fallback={<Aurora />}>
        <Canvas
          style={{ background: "hsl(var(--royal-purple))" }}
          orthographic
          camera={{ zoom: 10, position: [0, 0, 10] }}
          gl={{ antialias: true, preserveDrawingBuffer: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}

export { Shader }
