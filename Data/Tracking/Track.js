const SuperUser = require("../../Models/Tracking/SuperUser");
const FieldAgent = require("../../Models/Tracking/FieldAgent");
const Customer = require("../../Models/Tracking/Customer");
const Trip = require("../../Models/Tracking/Trip");

// one superUser
const superUser = new SuperUser("s1", "YipOnline", "/map-track");

// 5 Field Agents
const fieldAgent1 = new FieldAgent("f1", "Ada");
const fieldAgent2 = new FieldAgent("f2", "Fareedah");
const fieldAgent3 = new FieldAgent("f3", "Jacinta");
const fieldAgent4 = new FieldAgent("f4", "winner");
const fieldAgent5 = new FieldAgent("f5", "morakinyo");

//Super User has 5 Field Agents
superUser.addAgent(fieldAgent1);
superUser.addAgent(fieldAgent2);
superUser.addAgent(fieldAgent3);
superUser.addAgent(fieldAgent4);
superUser.addAgent(fieldAgent5);

// superUser(company) have 5 customers
const customer1 = new Customer("c1", "TestLimited", { lat: 99, lng: 123 });
const customer2 = new Customer("c2", "EasyWearu", { lat: 99, lng: 123 });
const customer3 = new Customer("c3", "BookMyWears", { lat: 99, lng: 123 });
const customer4 = new Customer("c4", "AshluxeWears", { lat: 99, lng: 123 });
const customer5 = new Customer("c5", "ShollyWears", { lat: 99, lng: 123 });

// superUser(company) has 5 Trips currently
const trip1 = new Trip("t1", "f1", "c1");
const trip2 = new Trip("t2", "f2", "c2");
const trip3 = new Trip("t3", "f3", "c3");
const trip4 = new Trip("t4", "f4", "c4");
const trip5 = new Trip("t5", "f5", "c5");

superUser.addTrip(trip1);
superUser.addTrip(trip2);
superUser.addTrip(trip3);
superUser.addTrip(trip4);
superUser.addTrip(trip5);

// Each Field Agent was assigned 1 trip each
fieldAgent1.addTrip(trip1);
fieldAgent2.addTrip(trip2);
fieldAgent3.addTrip(trip3);
fieldAgent4.addTrip(trip4);
fieldAgent5.addTrip(trip5);

// console.log(superUser);
// console.log(superUser.myAgents);
// console.log(superUser.myAgents[0].trips);

module.exports = {
  superUser: superUser,
};
