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
  const pointLightRed = useRef<PointLight>(null!);
  const pointLightBlue = useRef<PointLight>(null!);
  const ambientLightRef = useRef<AmbientLight>(null!);

  let kickIntensity = 0;
  let bassIntensity = 0;
  let hatIntensity = 0;

  socket.on("kick-start", () => {
    kickIntensity = 50;
  });

  socket.on("bass-start", () => {
    bassIntensity = 10;
  });

  //to-do figure out how to get discrete data through the WS to get a contour
  socket.on("hat-contour", ({ value }) => {
    hatIntensity = value;
  });

  useFrame((state, delta) => {
    pointLightRed.current.intensity = kickIntensity;
    if (kickIntensity > 0) {
      kickIntensity = kickIntensity - 1;
    }

    if (kickIntensity < 0) {
      kickIntensity = 0;
    }

    pointLightBlue.current.intensity = bassIntensity;
    if (bassIntensity > 0) {
      bassIntensity = bassIntensity - 0.1;
    }

    if (bassIntensity < 0) {
      bassIntensity = 0;
    }

    ambientLightRef.current.intensity = hatIntensity / 4;
  });

  return (
    <>
      <OrbitControls />
      <Models />
      <pointLight ref={pointLightRed} position={[0, 5, 0]} color="#EF6F6C" />
      {/* <pointLight ref={pointLightBlue} position={[0, 20, 0]} color="blue" /> */}
      <pointLight ref={pointLightBlue} position={[0, -5, 0]} color="#59C9A5" />
      <ambientLight ref={ambientLightRef} color="red" />
      {/* <ambientLight
        ref={ambientLightRef}
        intensity={100000}
        position={[0, 0, 0]}
        color="blue"
      /> */}
    </>
  );
};

export default AppInner;
