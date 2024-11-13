//Gets values from any UPD emitting device and packages them up into events the client can subscribe to.
//Server does not interpret any data only creates appropriate address, sends and parses starts and end events for example from MIDI notes.

const osc = require("osc");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

//#WEB SOCKET#//
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

//#OSC Handler#//
const getIPAddresses = () => {
  var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

  for (var deviceName in interfaces) {
    var addresses = interfaces[deviceName];
    for (var i = 0; i < addresses.length; i++) {
      var addressInfo = addresses[i];
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ipAddresses.push(addressInfo.address);
      }
    }
  }

  return ipAddresses;
};

// Bind to a UDP socket to listen for incoming OSC events.
var udpPort = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 2346,
});

udpPort.on("ready", () => {
  var ipAddresses = getIPAddresses();
  console.log("Listening for OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpPort.options.localPort);
  });
});

udpPort.on("message", ({ address, args }) => {
  //###TRIGGERS
  //filter kick triggers
  if (address === "/kick" && args[0] !== 0) {
    io.emit("kick-start", { velocity: args[0] });
  }

  if (address === "/kick" && args[0] === 0) {
    io.emit("kick-end", { velocity: args[0] });
  }

  //filter bass triggers
  if (address === "/bass" && args[0] !== 0) {
    io.emit("bass-start", { velocity: args[0] });
  }

  if (address === "/bass" && args[0] === 0) {
    io.emit("bass-end", { velocity: args[0] });
  }

  //###CONTOURS
  //filter hat contour
  if (address === "/hat-contour") {
    io.emit("hat-contour", { value: args[0] });
  }
});

udpPort.open();
