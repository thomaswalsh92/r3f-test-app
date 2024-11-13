import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

export const Models = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useLoader(
    GLTFLoader,
    "./models/objects.glb"
  ) as GLTFResult;
  console.log(nodes);

  const material = <meshStandardMaterial color="black" />;
  return (
    <group {...props} dispose={null}>
      <mesh name="inner" geometry={nodes.inner.geometry}>
        {material}
      </mesh>
      <mesh name="outer1Top" geometry={nodes.outer1Top.geometry}>
        {material}
      </mesh>
      <mesh name="outer1Bottom" geometry={nodes.outer1Bottom.geometry}>
        {material}
      </mesh>
      <mesh name="outer2Top" geometry={nodes.outer2Top.geometry}>
        {material}
      </mesh>
      <mesh name="outer2Bottom" geometry={nodes.outer2Bottom.geometry}>
        {material}
      </mesh>
      <mesh name="outer3Top" geometry={nodes.outer3Top.geometry}>
        {material}
      </mesh>
      <mesh name="outer3Bottom" geometry={nodes.outer3Bottom.geometry}>
        {material}
      </mesh>
    </group>
  );
};
