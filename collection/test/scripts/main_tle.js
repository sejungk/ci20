// // Two-line array example.
// const tle = `ISS (ZARYA)
// 1 25544U 98067A   17206.18396726  .00001961  00000-0  36771-4 0  9993
// 2 25544  51.6400 208.9163 0006317  69.9862  25.2906 15.54225995 67660`;

// const { getGroundTracksSync } = require(["tle.js"]);//"../node_module/satellite.js/tle.js/dist/tlejs.cjs"
// const threeOrbitsArr = getGroundTracksSync({
//   tle: tleStr,

//   // Relative time to draw orbits from.  This will be used as the "middle"/current orbit.
//   startTimeMS: 1502342329860,

//   // Resolution of plotted points.  Defaults to 1000 (plotting a point once for every second).
//   stepMS: 1000,

//   // Returns points in [lng, lat] order when true, and [lng, lat] order when false.
//   isLngLatFormat: true
// });

// // Alternatively, if your setup doesn't support async/await:
// getGroundTracks({
//   tle: tleStr,
//   startTimeMS: 1502342329860,
//   stepMS: 1000,
//   isLngLatFormat: true
// }).then(function(threeOrbitsArr) {
//   // Do stuff with three orbits array here.
// });

// // threeOrbitsArr contents
// [
//   // previous orbit
//   [
//     [ -179.93297540317567, 45.85524291891481 ],
//     // etc...
//   ],

//   // current orbit
//   [
//     [ -179.9398612198045, 51.26165992503701 ],
//     // etc...
//   ],

//   // next orbit
//   [
//     [ -179.9190165549038, 51.0273714070371 ],
//     // etc...
//   ]
// ]