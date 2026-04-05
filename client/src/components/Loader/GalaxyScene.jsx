import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  MathUtils,
  SRGBColorSpace,
  TextureLoader
} from "three";

function GalaxyBackdrop({ active }) {
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const texture = useLoader(TextureLoader, "/assets/galaxy.jpg");

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
  }, [texture]);

  useFrame((state, delta) => {
    if (!groupRef.current || !materialRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const targetScale = active ? 1.42 : 1.55;
    const nextScale = MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 0.38);
    groupRef.current.scale.setScalar(nextScale);
    groupRef.current.rotation.z = elapsed * 0.03;
    groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.06;
    materialRef.current.opacity = MathUtils.lerp(materialRef.current.opacity, active ? 1 : 0.7, delta * 1.8);
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -1.8]}>
        <planeGeometry args={[17.5, 10.5, 1, 1]} />
        <meshBasicMaterial ref={materialRef} map={texture} toneMapped={false} transparent />
      </mesh>
      <mesh position={[0, 0, -4.2]}>
        <planeGeometry args={[28, 18, 1, 1]} />
        <meshBasicMaterial color={new Color("#040814")} toneMapped={false} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const data = new Float32Array(900 * 3);

    for (let index = 0; index < 900; index += 1) {
      const stride = index * 3;
      data[stride] = (Math.random() - 0.5) * 24;
      data[stride + 1] = (Math.random() - 0.5) * 14;
      data[stride + 2] = (Math.random() - 0.5) * 16;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.16;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#fff7dd"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function SceneContent({ active }) {
  return (
    <>
      <color attach="background" args={["#01040d"]} />
      <fog attach="fog" args={["#01040d", 8, 24]} />
      <ambientLight intensity={1.2} color="#90a8ff" />
      <directionalLight position={[3, 2, 2]} intensity={1.8} color="#f6e0ac" />
      <pointLight position={[0, 0, 2]} intensity={8} color="#ffd99d" distance={10} />
      <GalaxyBackdrop active={active} />
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial
          color="#ffe8ab"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <FloatingParticles />
      <Stars
        radius={80}
        depth={32}
        count={2400}
        factor={2.2}
        saturation={0}
        fade
        speed={0.45}
      />
    </>
  );
}

function GalaxyScene({ active }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 38, position: [0, 0, 7.5] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <SceneContent active={active} />
    </Canvas>
  );
}

export default GalaxyScene;
