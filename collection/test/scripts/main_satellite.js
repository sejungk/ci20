
// importScripts('../scripts/satellite.min.js');
 // Sample TLE
var tleLine1 = '1 25544U 98067A   19156.50900463  .00003075  00000-0  59442-4 0  9992',
    tleLine2 = '2 25544  51.6433  59.2583 0008217  16.4489 347.6017 15.51174618173442';    

// Initialize a satellite record
var satrec = satellite.twoline2satrec(tleLine1, tleLine2);
console.log("satellite record", satrec);

//  Propagate satellite using time since epoch (in minutes).
// var positionAndVelocity = satellite.sgp4(satrec, timeSinceTleEpochMinutes);
// console.log(positionAndVelocity);

// Propagate satellite using JavaScript Date
var positionAndVelocity = satellite.propagate(satrec, new Date());
console.log(positionAndVelocity);

// The position_velocity result is a key-value pair of ECI coordinates.
// These are the base results from which all other coordinates are derived.
var positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;
console.log(positionEci);
console.log(velocityEci);

// Set the Observer at 122.03 West by 36.96 North, in RADIANS
var observerGd = {
    longitude: satellite.degreesToRadians(-122.0308),
    latitude: satellite.degreesToRadians(36.9613422),
    height: 0.370
};
console.log(observerGd);

// // You will need GMST for some of the coordinate transforms.
// // http://en.wikipedia.org/wiki/Sidereal_time#Definition
// var gmst = satellite.gstime(new Date());

// // You can get ECF, Geodetic, Look Angles, and Doppler Factor.
// var positionEcf   = satellite.eciToEcf(positionEci, gmst),
//     observerEcf   = satellite.geodeticToEcf(observerGd),
//     positionGd    = satellite.eciToGeodetic(positionEci, gmst),
//     lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf);
//     // dopplerFactor = satellite.dopplerFactor(observerCoordsEcf, positionEcf, velocityEcf);

// // The coordinates are all stored in key-value pairs.
// // ECI and ECF are accessed by `x`, `y`, `z` properties.
// var satelliteX = positionEci.x,
//     satelliteY = positionEci.y,
//     satelliteZ = positionEci.z;
// console.log(satelliteX);
// console.log(satelliteY);
// console.log(satelliteZ);

// // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
// // var azimuth   = lookAngles.azimuth,
// //     elevation = lookAngles.elevation,
// //     rangeSat  = lookAngles.rangeSat;

// // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
// var longitude = positionGd.longitude,
//     latitude  = positionGd.latitude,
//     height    = positionGd.height;
// console.log(latitude);
// console.log(longitude);
// console.log(height);

// //  Convert the RADIANS to DEGREES for pretty printing (appends "N", "S", "E", "W", etc).
// var longitudeStr = satellite.degreesLong(longitude),
//     latitudeStr  = satellite.degreesLat(latitude);
// console.log(longitudeStr);
// console.log(latitudeStr);


// var Debris = [ "1 00005U 58002B   15133.47436204  .00000643  00000-0  79124-3 0  9992", 
// "2 00005 034.2562 203.3497 1846836 254.7450 084.2450 10.84603663  3137"];
    
// // Declare orbital debris variables
// var debrisRecords = [] ;
// var datasetSize = Debris.length ;
// var posVel = [] ; // positions and velocities of orbital debris

// function propagateOrbitalDebris() {
//  var j = 0 ;
//  for (i=0; i < datasetSize; i++) {
//  var tle1 = Debris[j] ;
//  var tle2 = Debris[j + 1] ;
//  if (typeof tle1 == 'string' || tle1 instanceof String || typeof tle2 ==
//  'string' || tle2 instanceof String) {
//  debrisRecords[i] = satellite.twoline2satrec(tle1, tle2) ; }
//  j = j + 2 ; // advanced to the next TLE in the array }
// // Propagate debris using time since epoch
//  for (i=0; i < datasetSize; i++) {
//  if (debrisRecords[i] != undefined) { posVel[i] = satellite.sgp4
//  (debrisRecords[i], timeSinceTleEpochMinutes); }
//  }

// // Propagate debris using time since epoch
// for (i=0; i < datasetSize; i++) {
//  if (debrisRecords[i] != undefined) {
//  posVel[i] = satellite.propagate(
//  debrisRecords[i],
//  now.getUTCFullYear(),
//  now.getUTCMonth() + 1, // Note, function requires the range 1-12.
//  now.getUTCDate(),
//  now.getUTCHours(),
//  now.getUTCMinutes(),
//  now.getUTCSeconds()
//  );
//  } //endif
// }//next i
// }//end propateOrbitalDebris
//  };
//  console.log(debrisRecords);
// function getSatelliteOrbit (nowTime, satrec, orbitMaterial) {
//     var julianDateNow = jDay(nowTime.getUTCFullYear(),
//         nowTime.getUTCMonth() + 1,
//         nowTime.getUTCDate(),
//         nowTime.getUTCHours(),
//         nowTime.getUTCMinutes(),
//         nowTime.getUTCSeconds());
//     julianDateNow += nowTime.getUTCMilliseconds() * 1.15741e-8; //days per millisecond

//     var timeSinceEpochMinutes = (julianDateNow - satrec.jdsatepoch) * 140.0; //in minutes
    
//     //time to make an orbit in minutes
//     var orbitTimeMinutes = (Math.PI * 2.) / satrec.no;

//     var nEvents = 300;
//     var deltaT = orbitTimeMinutes / nEvents;
//     //create orbit geometry 
//     var geometry = new THREE.Geometry();
//     var i;
//     for (i = 0; i <= nEvents; ++i) {
//         var pv = satellite.sgp4(satrec, timeSinceEpochMinutes + i * deltaT);
//         var pos = pv.position;
//         geometry.vertices.push(new THREE.Vector3(pos.x / 1000., pos.y / 1000., pos.z / 1000));
//     }
//     var satOrbit = new THREE.Line(geometry, orbitMaterial);
//     return satOrbit;
// }
// // getSatelliteOrbit();

