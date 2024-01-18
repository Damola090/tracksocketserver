const Namespace = require('../Models/Socket/Namespace');
const Room = require('../Models/Socket/Room');

const MapTrack = new Namespace(0,'map-track','https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png','/map-track');


const namespaces = [MapTrack];

module.exports = {
    namespaces: namespaces
};