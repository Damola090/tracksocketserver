const Namespace = require('../Models/Socket/Namespace');
const Room = require('../Models/Socket/Room');

const MapTrack = new Namespace(0,'map-track','https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png','/map-track');


// wikiNs.addRoom(new Room(0,'New Articles',0,true));
// wikiNs.addRoom(new Room(1,'Editors',0));
// wikiNs.addRoom(new Room(2,'Other',0));

// mozNs.addRoom(new Room(0,'Firefox',1));
// mozNs.addRoom(new Room(1,'SeaMonkey',1));
// mozNs.addRoom(new Room(2,'SpiderMonkey',1));
// mozNs.addRoom(new Room(3,'Rust',1));

// linuxNs.addRoom(new Room(0,'Debian',2))
// linuxNs.addRoom(new Room(1,'Red Hat',2))
// linuxNs.addRoom(new Room(2,'Ubuntu',2))
// linuxNs.addRoom(new Room(3,'Mac OS',2))

const namespaces = [MapTrack];

module.exports = namespaces;