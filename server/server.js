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

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
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
  localPort: 57121,
});

udpPort.on("ready", () => {
  var ipAddresses = getIPAddresses();
  console.log("Listening for OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpPort.options.localPort);
  });
});

udpPort.on("message", ({ address, args }) => {
  if (address === "/kick" && args[0] !== 0) {
    io.emit("kick-start", { velocity: args[0] });
  }

  if (address === "/kick" && args[0] === 0) {
    io.emit("kick-end", { veloity: args[0] });
  }
});

udpPort.open();
