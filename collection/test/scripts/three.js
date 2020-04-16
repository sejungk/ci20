THREE.OrbitControls = function (){
};  

var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xA6CDFB, 1, 1000);
  //40 = field of view, aspect ratio, 0.1, 1000 = near and far plane
  var camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight, 1, 1000)
  // var cameraAutoRotation = true;
  var orbitControls = new THREE.OrbitControls(camera);
  var textureLoader = new THREE.TextureLoader();
  camera.position.set(0, 0, 400);
  var rotSpeed = .02
  var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
        renderer.gammaInput = true;
        renderer.gammaOutput = true; 


  //background color
  // renderer.setClearColor("black");
  
  // set size of renderer
  renderer.setSize(window.innerWidth,window.innerHeight);
  
  // append child to renderer DOM element
  document.body.appendChild(renderer.domElement);
  
  //make background and camera responsive to browser size
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
  //create Earth
  var earth = new THREE.IcosahedronGeometry(4, 2);
  var earthmaterial = new THREE.MeshPhongMaterial({
    color: "grey",
    shininess: 150,
    flatShading: true } );

  var earthmesh = new THREE.Mesh(earth, earthmaterial);
  earthmesh.scale.x = earthmesh.scale.y = earthmesh.scale.z = 18;
  scene.add( earthmesh );

  //earth outline
  var outline = new THREE.MeshPhongMaterial({
    color: "darkgrey",
    wireframe: true,
    side: THREE.DoubleSide
  });

 var outlinemesh = new THREE.Mesh(earth, outline);
      outlinemesh.scale.x = outlinemesh.scale.y = outlinemesh.scale.z = 20;
      scene.add( outlinemesh );

  //Dodecahedron
  var dodGeometry = new THREE.DodecahedronGeometry( 5,0 ); 
  var dodMaterial = new THREE.MeshPhongMaterial( {
    color: 0xccff00,
    shininess: 150 } ); 
  var dod = new THREE.Mesh(dodGeometry, dodMaterial);
  dod.position.set( 100, 50, -50 );
  scene.add( dod );

  //Cylinder
  var cylinderGeometry = new THREE.CylinderGeometry( 4, 4, 10, 20 );
  var cylinderMaterial = new THREE.MeshPhongMaterial( {
    color: 0x00FFFF,
    shininess: 150 } );
  var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
  cylinder.position.set( -100, 50, -50 );
  scene.add( cylinder );

  //Octahedron
  var octGeometry = new THREE.OctahedronGeometry( 5,0);
  var octMaterial = new THREE.MeshPhongMaterial( {
    color: 0xFF0099,
    shininess: 150 } );
  var octahedron = new THREE.Mesh( octGeometry, octMaterial );
  octahedron.position.set( -150, 50, -50 );
  scene.add( octahedron );
  
   var texture = new THREE.TextureLoader().load( 'starfield.png' );
  // immediately use the texture for material creation
  var material = new THREE.MeshBasicMaterial( { map: texture } );
  //create Light
  var light = new THREE.PointLight(0xffffff, 3);
  light.position.set( 1, 1, 1 );
  light.castShadow = true;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.shadowCameraNear = 10;
  light.shadowCameraFar = 400;
  light.shadowCameraFov = 30;
  scene.add( light );
  // var ambientLight = new THREE.AmbientLight( 0xffffff );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );
    var angle = 50;
    var render = function() {
    requestAnimationFrame( render );

      earthmesh.rotation.x += 0.01;
      earthmesh.rotation.y += 0.01;
      earthmesh.rotation.z += .002;
      
      outlinemesh.rotation.x -= 0.01;
      outlinemesh.rotation.y -= .001;
      outlinemesh.rotation.z -= .001;

      cylinder.rotation.x += .007;
      cylinder.rotation.y -= 0.06;
      outlinemesh.rotation.z += .002;

      octahedron.rotation.x -= .005;
      octahedron.rotation.y += .006;
      octahedron.rotation.y -= .005;

      dod.rotation.x += .005;
      dod.rotation.y -= .006;
      dod.rotation.y += .003;

      angle -= 0.1;
      light.position.x = 10 + 10 * Math.sin(angle);
      light.position.y = 10 + 10 * Math.cos(angle);
 
       renderer.render( scene, camera );
}

render();
