/* eslint-disable */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

//listen to websocket messages for audio-reactive event

const AppInner = () => {
  const [kickPlaying, setKickPlaying] = useState(false);

  const Light = ({ kickPlaying }: { kickPlaying: boolean }) => {
    return (
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={kickPlaying ? 5 : 0}
      />
    );
  };

  const Box = (props: JSX.IntrinsicElements["mesh"], kickOn: boolean) => {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    // Rotate mesh every frame, this is outside of React without overhead

    useFrame((state, delta) => {
      ref.current.rotation.x += 0.01;
    });

    console.log(kickOn);

    const cubeSize = useState(0);

    socket.connect();

    socket.on("kick-start", () => setKickPlaying(true));
    socket.on("kick-end", () => setKickPlaying(false));

    return (
      <mesh {...props} ref={ref} scale={kickOn ? 3 : 1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
  };

  return (
    <>
      <Light kickPlaying={kickPlaying} />
      <Box position={[0, 0, 0]} />
    </>
  );
};

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <AppInner />
    </Canvas>
  );
}
