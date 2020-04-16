
// THREE.OrbitControls = function (){
// };  


// "use strict";
// // Scene, Camera, Renderer
// var renderer = new THREE.WebGLRenderer();
// var scene = new THREE.Scene();
// var aspect = window.innerWidth / window.innerHeight;
// var camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1500)
// var cameraRotation = 0;
// var cameraRotationSpeed = 0.005;
// var cameraAutoRotation = true;
// var orbitControls = new THREE.OrbitControls(camera); // Lights
// var spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2); // Texture Loader
// var textureLoader = new THREE.TextureLoader(); // Planet Proto

// var planetProto = {
//   Icosahedron: function Icosahedron(size) {
//     var Icosahedron = new THREE.IcosahedronGeometry(.5, 2);
//     return Icosahedron;
//   },
//   material: function material(options) {
//     var material = new THREE.MeshPhongMaterial({
//     color: "grey",
//     shininess: 20,
//     flatShading: true });

//     if (options) {
//       for (var property in options) {
//         material[property] = options[property];
//       }
//     }

//     return material;
//   },
//   glowMaterial: function glowMaterial(intensity, fade, color) {
//     // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
//     var glowMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         'c': {
//           type: 'f',
//           value: intensity
//         },
//         'p': {
//           type: 'f',
//           value: fade
//         },
//         glowColor: {
//           type: 'c',
//           value: new THREE.Color(color)
//         },
//         viewVector: {
//           type: 'v3',
//           value: camera.position
//         }
//       },
//       vertexShader: "\n        uniform vec3 viewVector;\n        uniform float c;\n        uniform float p;\n        varying float intensity;\n        void main() {\n          vec3 vNormal = normalize( normalMatrix * normal );\n          vec3 vNormel = normalize( normalMatrix * viewVector );\n          intensity = pow( c - dot(vNormal, vNormel), p );\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n        }",
//       fragmentShader: "\n        uniform vec3 glowColor;\n        varying float intensity;\n        void main() \n        {\n          vec3 glow = glowColor * intensity;\n          gl_FragColor = vec4( glow, 1.0 );\n        }",
//       side: THREE.BackSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true
//     });
//     return glowMaterial;
//   },
//   texture: function texture(material, property, uri) {
//     var textureLoader = new THREE.TextureLoader();
//     textureLoader.crossOrigin = true;
//     textureLoader.load(uri, function (texture) {
//       material[property] = texture;
//       material.needsUpdate = true;
//     });
//   }
// };

// var createPlanet = function createPlanet(options) {
//   // Create the planet's Surface
//   var surfaceGeometry = planetProto.Icosahedron(options.surface.size);
//   var surfaceMaterial = planetProto.material(options.surface.material);
//   var surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial); // Create the planet's Atmosphere

//   var atmosphereGeometry = planetProto.Icosahedron(options.surface.size + options.atmosphere.size);
//   var atmosphereMaterialDefaults = {
//     side: THREE.DoubleSide,
//     transparent: true
//   };
//   var atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
//   var atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
//   var atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial); // Create the planet's Atmospheric glow

//   var atmosphericGlowGeometry = planetProto.Icosahedron(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
//   var atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
//   var atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial); // Nest the planet's Surface and Atmosphere into a planet object

//   var planet = new THREE.Object3D();
//   surface.name = 'surface';
//   atmosphere.name = 'atmosphere';
//   atmosphericGlow.name = 'atmosphericGlow';
//   planet.add(surface);
//   planet.add(atmosphere);
//   planet.add(atmosphericGlow); 

//   // Load the Surface's textures
//   for (var textureProperty in options.surface.textures) {
//     planetProto.texture(surfaceMaterial, textureProperty, options.surface.textures[textureProperty]);
//   } 

//   // Load the Atmosphere's texture
//   for (var _textureProperty in options.atmosphere.textures) {
//     planetProto.texture(atmosphereMaterial, _textureProperty, options.atmosphere.textures[_textureProperty]);
//   }

//   return planet;
// };

// var earth = createPlanet({
//   surface: {
//     size: 0.5,
//     material: {
//       bumpScale: 0.05,
//       specular: new THREE.Color('grey'),
//       shininess: 10
//     },
//   },
//   atmosphere: {
//     size: 0.003,
//     material: {
//       opacity: 1
//     },
//     glow: {
//       size: 0.02,
//       intensity: 1,
//       fade: 7,
//       color: 0x93cfef
//     }
//   }
// }); 

//  // Galaxy


// var galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
// var galaxyMaterial = new THREE.MeshBasicMaterial({
//   side: THREE.BackSide
// });
// var galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial); 

// // Load Galaxy Textures
// // textureLoader.crossOrigin = true;
// // textureLoader.load(
// //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
// //   function(texture) {
// //     galaxyMaterial.map = texture;
// //     scene.add(galaxy);
// //   }) 
// var texture = new THREE.TextureLoader().load( 'starfield.png' );

// // immediately use the texture for material creation
// var material = new THREE.MeshBasicMaterial( { map: texture } );

//   // Scene, Camera, Renderer Configuration
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// camera.position.set(1, 1, 1);
// orbitControls.enabled = !cameraAutoRotation;
// scene.add(camera);
// scene.add(spotLight);
// scene.add(earth); 

// // Light Configurations
// spotLight.position.set(2, 0, 1); 

// // Mesh Configurations
// earth.receiveShadow = true;
// earth.castShadow = true;
// earth.getObjectByName('surface').geometry.center(); 

// // On window resize, adjust camera aspect ratio and renderer size
// window.addEventListener('resize', function () {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }); 

// // Main render function
// var render = function render() {
//   earth.getObjectByName('surface').rotation.y += 1 / 32 * 0.01;
//   earth.getObjectByName('atmosphere').rotation.y += 1 / 16 * 0.01;

//   if (cameraAutoRotation) {
//     cameraRotation += cameraRotationSpeed;
//     camera.position.y = 0;
//     camera.position.x = 2 * Math.sin(cameraRotation);
//     camera.position.z = 2 * Math.cos(cameraRotation);
//     camera.lookAt(earth.position);
//   }

//   requestAnimationFrame(render);
//   renderer.render(scene, camera);
// };

// render(); 