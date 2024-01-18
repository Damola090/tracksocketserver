//Node - Http Core Module
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Socket.io Module
const socketIo = require("socket.io");

//Import Our Express Application
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create an Http Server onTop of the Express App
const server = http.createServer(app);

//Create a Socket-io Server onTop of The Http Server
const io = require("socket.io")(server, {
  pingInterval: 30000, // 30 seconds
  pingTimeout: 5000, // 5 seconds
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Socket.io Server is running on port ${PORT}`);
});

//STEP 1-------.Create a Namespace Object
const namespaces = require("../Data/NameSpaces");

//STEP 2A--------.open default connection
io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  const userName = socket.handshake.query.userName;
  const jwt = socket.handshake.query.jwt;

  //STEP 4--- listen for client connect-------------------
  socket.on("clientConnect", () => {
    console.log("connected to Tracking Namespace");

    //STEP 6 emit the map Namespace object----------------------
    socket.emit("MapNameSpace", namespaces[0]);
  });

  // STEP 8.Listen For Socket Disconnection
  socket.on("disconnect", () => {
    console.log("User Has diconnected");
  });
});

//STEP 2B--------.open default connection
io.of(namespaces[0].endpoint).on("connection", (socket) => {
  console.log(socket.id);

  //STEP 9. Listen For Socket TO JOIN TRIP ROOM FOR TRACKING
  socket.on("joinTripRoom", async (TripObject, callback) => {
    console.log("server - joinTripRoom event");
    console.log(TripObject, "server - join trip object");

    socket.join(TripObject._id.toString());

    callback({
      TripObject: TripObject,
    });
  });

  //STEP 11 ----------
  socket.on("sendCoordsToTripRoom", async (CoordsObject, callback) => {
    console.log(CoordsObject, "server - coordinate passed object");

    //STEP 13. SEND COORDINATES TO SECOND PARTY
    io.of(namespaces[0].endpoint)
      .in(CoordsObject.tripRoom_id.toString())
      .emit("rawCoordsToSecondParty", CoordsObject);

    callback({
      CoordsObject: CoordsObject,
    });
  });
});
