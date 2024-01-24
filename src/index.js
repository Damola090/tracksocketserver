//Node - Http Core Module
const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const bodyParser = require("body-parser");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

//Socket.io Module
const socketIo = require("socket.io");

// console.log(superUser);

//Import Our Express Application
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create an Http Server onTop of the Express App
const server = http.createServer(app);

//Create a Socket-io Server onTop of The Http Server

const io = socketio(server,{
  cors:{
    origin: 'https://tracksocketserver-dev-chke.1.us-1.fl0.io:8080',
    credentials: true,
    methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
  }
});


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Socket.io Server is running on port ${PORT}`);
});

// WE ALREADY HAVE A CUSTOMER

// AGENT HAS ALREADY PLANNED THE TRIP

// NOW WE CAN -
// START ----- A ----- TRIP -----  //

//STEP 1-------.Create a SuperUser Object
const { superUser } = require("../Data/Tracking/Track");

// Remember to log the activity for timer

//STEP 2A--------.open default connection
io.on("connection", (socket) => {
  console.log("Connected", socket.id);

  const userName = socket.handshake.query.userName;
  const jwt = socket.handshake.query.jwt;

  //STEP 4----listen for client connect-------------------
  socket.on("clientConnect", () => {
    console.log("connected to Tracking Namespace");

    //STEP 6 emit the SuperUser object(company)----------------------
    // if he is a super user
    // he gets all the trips and agent to track
    // if he is an agent , he gets only his trip
    socket.emit("MapNameSpace", superUser);
  });

  // STEP 8.Listen For Socket Disconnection
  socket.on("disconnect", () => {
    console.log("User Has diconnected");
  });
});

//STEP 2B--------.open Namespace connection
io.of(superUser.namespaceEndpoint).on("connection", (socket) => {
  console.log(socket.id);

  //STEP 9. Listen For Socket TO JOIN TRIP ROOM FOR TRACKING
  socket.on("joinTripRoom", async (TripObject, callback) => {
    console.log("server - joinTripRoom event");
    console.log(TripObject, "server - join trip object");

    // could be the agent trying to check the trip
    // could be the super user trying to check the trip
    const selectedTrip = superUser.trips.find(
      (singleTrip) => singleTrip.id === TripObject.id
    );

    const agentIncharge = superUser.myAgents.find(
      (singleAgent) => singleAgent.id === selectedTrip.agentId
    );

    console.log(selectedTrip, "selected Trip to join");

    // Auth to make sure the socket has right to be in this room
    socket.join(TripObject.id.toString());

    //fetch the number of sockets in this room
    const sockets = await io
      .of(superUser.namespaceEndpoint)
      .in(TripObject.id.toString())
      .fetchSockets();

    const socketCount = sockets.length;

    callback({
      numberOfSockets: socketCount,
      TripObject: TripObject,
    });
  });

  //STEP 11 ----------
  socket.on("sendCoordsToTripRoom", async (CoordsObject, callback) => {
    console.log(CoordsObject, "server - coordinate passed object");

    const uniqueId = uuidv4();
    const selectedTrip = superUser.trips.find(
      (singleTrip) => singleTrip.id === CoordsObject.tripRoom_id
    );
    
    const agentIncharge = superUser.myAgents.find(
      (singleAgent) => singleAgent.id === selectedTrip.agentId
    );

    const newCoord = {
      id: uniqueId,
      lat: CoordsObject.lat,
      lng: CoordsObject.lng,
    };

    selectedTrip.updateCurrentLocation(newCoord);
    agentIncharge.updateMovement(newCoord);

    //STEP 13. SEND COORDINATES TO SECOND PARTY
    io.of(superUser.namespaceEndpoint)
      .in(CoordsObject.tripRoom_id.toString())
      .emit("rawCoordsToSecondParty", newCoord);

    console.log(selectedTrip, "updated Trip");
    console.log(agentIncharge, "updated Agent Movement");

    callback({
      CoordsObject: CoordsObject,
    });
  });
});
