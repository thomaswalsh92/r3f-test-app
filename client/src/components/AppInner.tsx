import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import * as io from "socket.io-client";
import { AmbientLight } from "three";

const socket = io.connect("http://localhost:3001");

socket.connect();

export const AppInner = () => {
  const light = useRef<THREE.AmbientLight>(null!);
  let kickOn = false;

  socket.on("kick-start", () => {
    if (!kickOn) kickOn = true;
  });

  socket.on("kick-end", () => {
    if (kickOn) kickOn = false;
  });

  useFrame((state, delta) => {
    console.log(kickOn);
  });
  const Box = (props: JSX.IntrinsicElements["mesh"]) => {
    // This reference will give us direct access to the THREE.Mesh object
    const box = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
      box.current.rotation.x += 0.01;
      light.current.intensity = kickOn ? 5 : 0;
    });

    return (
      <mesh {...props} ref={box}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
  };

  return (
    <>
      <Box position={[0, 0, 0]} />
      <ambientLight ref={light} />
    </>
  );
};

export default AppInner;
