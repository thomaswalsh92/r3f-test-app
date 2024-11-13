//LIBS
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as io from "socket.io-client";
import { Models } from "./Models";
import { AmbientLight, Color, PointLight } from "three";
import { OrbitControls } from "@react-three/drei";

const socket = io.connect("http://localhost:3001");
socket.connect();

export const AppInner = () => {
  const pointLightRef = useRef<PointLight>(null!);
  const ambientLightRef = useRef<AmbientLight>(null!);

  useFrame((state, delta) => {
    pointLightRef.current.intensity = kickOn ? 100 : 0;
    const red = new Color("red");
    const blue = new Color("blue");
    ambientLightRef.current.color = kickOn ? red : blue;
  });

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

  return (
    <>
      <OrbitControls />
      <Models />
      <pointLight ref={pointLightRef} position={[0, 20, 0]} color="red" />
      <ambientLight ref={ambientLightRef} color="white" />
      {/* <ambientLight ref={ambientLight} /> */}
    </>
  );
};

export default AppInner;
