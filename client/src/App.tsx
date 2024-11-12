/* eslint-disable */
//LIBRARIES
import * as THREE from "three";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";

//COMPONENTS
import AppInner from "./components/AppInner";

//listen to websocket messages for audio-reactive event

export default function App() {
  return (
    <Canvas>
      <AppInner />
    </Canvas>
  );
}
