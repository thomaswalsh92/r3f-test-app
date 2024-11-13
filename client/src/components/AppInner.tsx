//LIBS
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as io from "socket.io-client";
import { Models } from "./Models";

const socket = io.connect("http://localhost:3001");
socket.connect();

// const Models = () => {
//   const { scene } = useLoader(
//     GLTFLoader,
//     "./models/abstract-cylinders.glb"
//   ) as GLTF;

//   // scene as any as IGLTFData;
// };

export const AppInner = () => {
  useFrame((state, delta) => {
    // ambientLight.current.intensity = kickOn ? 5 : 0;
    spotLight.current.intensity = kickOn ? 10 : 0;
  });

  const ambientLight = useRef<THREE.AmbientLight>(null!);
  const spotLight = useRef<THREE.SpotLight>(null!);
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
      <Models />
      <ambientLight intensity={0.02} color="white" />
      <pointLight ref={spotLight} position={[2, 0, 0]} color="red" />
      {/* <ambientLight ref={ambientLight} /> */}
    </>
  );
};

export default AppInner;
