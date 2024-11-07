import OSC from "osc-js";

const bridgePlugin = new OSC.BridgePlugin({
  wsServer: { host: "127.0.0.1", port: 3456 },
  updServer: { host: "127.0.0.1", post: 2345 },
});

const bridge = new OSC({ plugin: bridgePlugin });
bridge.open();

const message = new OSC.Message();

bridge.on("open", () => {
  console.log("bridge open");
});

const webSocketPlugin = new OSC.WebsocketServerPlugin({
  host: "127.0.0.1",
  port: 4567,
});

const webSocket = new OSC({ plugin: webSocketPlugin });

webSocket.open();

webSocket.on("open", () => bridge.send(message));
