/* eslint-disable */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import OSC from "osc-js";

const websocketClientPlugin = new OSC.WebsocketClientPlugin({
  host: "127.0.0.1",
  port: 4567,
});

const clientOsc = new OSC({ plugin: websocketClientPlugin });
clientOsc.open({
  host: "127.0.0.1",
  port: 4567,
});

clientOsc.on("*", (message: { args: any }) => {
  console.log(message.args);
});

// const bridgePlugin = new OSC.BridgePlugin({
//   updServer: {
//     host: "localhost",
//     port: 41234,
//   },
//   wsServer: {
//     host: "localhost",
//     port: 3000,
//   },
// });
// bridgePlugin.open();
console.log(websocketClientPlugin.status());

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "red" : "orange"} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  );
}
