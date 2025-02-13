"use client"

import React, { Suspense, useRef } from "react"
import fragmentShader from "@/public/assets/waves.glsl"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { ShaderMaterial } from "three"

import { Aurora } from "@/components/aurora"

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
