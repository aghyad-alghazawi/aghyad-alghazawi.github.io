// @ts-nocheck
"use client"

import React, { Suspense, useRef } from "react"
import { Canvas, extend, ThreeElements, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ShaderMaterial } from "three"

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;

void mainImage(out vec4 o, vec2 u) {
    vec2 v = iResolution.xy;
    u = .2*(u+u-v)/v.y;    
         
    vec4 z = o = vec4(1,-2,3,12);
     
    for (float a = .5, t = iTime, i; 
         ++i < 19.; 
         o += (1. + cos(z+t)) 
            / length((1.+i*dot(v,v)) 
                   * sin(1.5*u/(.5-dot(u,u)) - 9.*u.yx + t))
         )  
        v = cos(++t - 7.*u*pow(a += .03, i)) - 5.*u,                 
        u += tanh(40. * dot(u *= mat2(cos(i + .02*t - vec4(0,11,33,0)))
                           ,u)
                      * cos(1e2*u.yx + t)) / 2e2
           + .2 * a * u
           + cos(4./exp(dot(o,o)/1e2) + t) / 3e2;
              
     o = 26.6 / (min(o, 12.) + 200. / o) 
       - dot(u, u) / 260.;
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`

const shaderMaterial = new ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader,
  fragmentShader,
})

const Scene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)
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
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  )
}

const ShaderBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          style={{ background: "black" }}
          orthographic
          camera={{ zoom: 10, position: [0, 0, 10] }}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: true,
          }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default ShaderBackground
