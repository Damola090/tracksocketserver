class Trip {
  // id: any
  // agentId: any
  // customerId: any
  // startLocation: { lat: any, lng: any }
  // currentLocation: { lat: any, lng: any }
  // endLocation: { lat: any, lng: any }
  // startTime: any
  // endTime: any
  // currentTime: any
  // status: "ongoing" | "completed," | "canceled" | "NotStarted"
  // driverDetails: any
  // route: { lat: any, lng: any }[] // ... more coordinates for polyline
  // eventLog: any

  constructor(
    id,
    agentId,
    customerId,
    startTime,
    endTime,
    currentTime,
    status,
    driverDetails
  ) {
    this.id = id;
    this.agentId = agentId;
    this.customerId = customerId;
    (this.startLocation = { lat: 0, lng: 0 }),
      (this.currentLocation = { lat: 0, lng: 0 });
    this.endLocation = { lat: 0, lng: 0 };
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentTime = currentTime;
    this.status = status;
    this.driverDetails = driverDetails;
    this.route = [];
  }

  addStartLocation(coordinate) {
    this.startLocation = coordinate;
  }

  addEndLocation(coordinate) {
    this.endLocation = coordinate;
  }

  updateLocation(coordinate) {
    this.route = [...this.route, coordinate];
  }

  planTrip() {}

  startTrip() {}
}

module.exports = Trip;
