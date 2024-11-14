import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { degToRad } from "three/src/math/MathUtils";
import * as io from "socket.io-client";
import { Euler } from "three";
//import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    inner: THREE.Mesh;
    outer1Top: THREE.Mesh;
    outer1Bottom: THREE.Mesh;
    outer2Top: THREE.Mesh;
    outer2Bottom: THREE.Mesh;
    outer3Top: THREE.Mesh;
    outer3Bottom: THREE.Mesh;
  };
  materials: {};
  //   animations: GLTFAction[];
};

const socket = io.connect("http://localhost:3001");
socket.connect();

export const Models = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "./models/objects.glb"
  ) as GLTFResult;

  let kickAnimFrame = 0;

  //kickStart message happens
  socket.on("kick-start", () => {
    kickAnimFrame = 0;
  });

  useFrame((state, delta) => {
    kickAnimFrame = kickAnimFrame + 1;

    // outer1Bottom.current.position.set(0, -kickCurve, 0);

    // if (kickCurve > 0) {
    //   kickCurve -= 0.04;
    // }
    // console.log(kickCurve);
  });

  const inner = useRef<THREE.Mesh>(null!);
  const outer1Top = useRef<THREE.Mesh>(null!);
  const outer1Bottom = useRef<THREE.Mesh>(null!);
  const outer2Top = useRef<THREE.Mesh>(null!);
  const outer2Bottom = useRef<THREE.Mesh>(null!);
  const outer3Top = useRef<THREE.Mesh>(null!);
  const outer3Bottom = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {});

  const material = (
    <meshStandardMaterial color="#6f7987" metalness={0} roughness={0.4} />
  );
  return (
    <group rotation={new Euler(0, degToRad(180), 0)} {...props} dispose={null}>
      <mesh ref={inner} name="inner" geometry={nodes.inner.geometry}>
        {material}
      </mesh>
      <mesh
        name="outer1Top"
        ref={outer1Top}
        geometry={nodes.outer1Top.geometry}
      >
        {material}
      </mesh>
      <mesh
        ref={outer1Bottom}
        name="outer1Bottom"
        geometry={nodes.outer1Bottom.geometry}
      >
        {material}
      </mesh>
      <mesh
        ref={outer2Top}
        name="outer2Top"
        geometry={nodes.outer2Top.geometry}
      >
        {material}
      </mesh>
      <mesh
        ref={outer2Bottom}
        name="outer2Bottom"
        geometry={nodes.outer2Bottom.geometry}
      >
        {material}
      </mesh>
      <mesh
        ref={outer3Top}
        name="outer3Top"
        geometry={nodes.outer3Top.geometry}
      >
        {material}
      </mesh>
      <mesh
        ref={outer3Bottom}
        name="outer3Bottom"
        geometry={nodes.outer3Bottom.geometry}
      >
        {material}
      </mesh>
    </group>
  );
};
