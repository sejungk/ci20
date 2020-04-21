var renderer, scene, camera, canvas;
var random = Math.random() * (.01 -0);
var xmlhttp = new XMLHttpRequest();
var satellite_debris = "TLE.json"
var TLE_data = [];
var i = 0;
var random =  (Math.random() * 360 ) * Math.PI / 180; 

  //SCENE
    canvas = document.getElementById("canvas");
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xA6CDFB, 1, 150000);

  //RENDER
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.gammaInput = true;
    renderer.gammaOutput = true; 
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor("black");

  //RESIZE WINDOW
    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    })
    
  //LIGHTNING
    light = new THREE.PointLight(0xffffff, 1);
    light.position.set( 1, 1, 1 );
    light.castShadow = true;
  
  //LIGHTING #2
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight, light );

  //CREATE EARTH
      var earth = new THREE.IcosahedronGeometry(4000, 2);
      var earthmaterial = new THREE.MeshPhongMaterial({
        opacity: 1,
        color: "grey",
        shininess: 150,
        flatShading: true } );
      var mesh = new THREE.Mesh(earth, earthmaterial);
      mesh.position.set( 0, 0, 0 );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;

  //EARTH OUTLINE
      var outline = new THREE.MeshPhongMaterial({
        color: "darkgrey",
        wireframe: true,
        side: THREE.DoubleSide
        });
       var outlinemesh = new THREE.Mesh(earth, outline);
          outlinemesh.scale.x = outlinemesh.scale.y = outlinemesh.scale.z = 1.07;
          outlinemesh.rotation.x += 1;
          scene.add( mesh, outlinemesh );
 
//PARSE JSON
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        TLE_data = JSON.parse(this.responseText);
        ////action////
        buildIndex(TLE_data);
    }
    };
    xmlhttp.open("GET", satellite_debris, true);
    xmlhttp.send();

function buildIndex (TLE_data) {
    for ( i = 0; i < TLE_data.length; i++ ) {
        // console.log (TLE_data[i].OBJECT_TYPE);
    }
       
//PROPAGATIONS
     var j = 0 ;
     for ( i = 0; i <= TLE_data.length; i++ ) {

//TLE DATA 2 LINES

     var tle1 = TLE_data[j].TLE_LINE1;
     var tle2 = TLE_data[j].TLE_LINE2;
     // console.log("TLE1", tle1);
     // console.log("TLE2", tle2);

//POSITION AND VELOCITY
     var satrec = satellite.twoline2satrec(tle1, tle2);
     var positionAndVelocity = satellite.propagate(satrec, new Date());
     // console.log(positionAndVelocity );

//POSITION X,Y,Z
     var positionEci = positionAndVelocity.position;
     // console.log(positionEci);

//SEPARATED POS X, POS Y, POS Z
    var satelliteX = positionEci.x,
        satelliteY = positionEci.y,
        satelliteZ = positionEci.z;
        // console.log(satelliteX);
        // console.log(satelliteY);
        // console.log(satelliteZ);

//IF DEBRIS = CREATE DODECAHEDRON
     if (TLE_data[i].OBJECT_TYPE === "DEBRIS") {
      // console.log("DEBRIS TLE= ", TLE_data[i].TLE_LINE1);      
      var dodGeometry = new THREE.DodecahedronBufferGeometry( 180,0 ); 
      var dodMaterial = new THREE.MeshPhongMaterial( {
        color: 0xccff00,
        shininess: 150 } ); 
      var dod = new THREE.Mesh(dodGeometry, dodMaterial);
        dod.position.x = satelliteX;
        dod.position.y = satelliteY;
        dod.position.z = satelliteZ;
        // console.log("DOD", satelliteX);
        // console.log("DOD", satelliteY);
        // console.log("DOD", satelliteZ);
      scene.add( dod );
  
    }

//IF ROCKET BODY = CREATE CYLINDER   
    if (TLE_data[i].OBJECT_TYPE === "ROCKET BODY") {
    // console.log("ROCKET BODY TLE= ", TLE_data[i].TLE_LINE1);
    rocketbody =  new THREE.Object3D();
     var cylinderGeometry = new THREE.CylinderBufferGeometry( 300, 300, 500, 20 );
     var cylinderMaterial = new THREE.MeshPhongMaterial( {
        color: 0x00FFAC,
        shininess: 150 } );
      var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        cylinder.position.x = satelliteX;
        cylinder.position.y = satelliteY;
        cylinder.position.z = satelliteZ;

        // cylinder.rotation.x = random;
        // cylinder.rotation.y = random;
        // cylinder.rotation.z = random;

        cylinder.rotation.x += Math.random() * (.02 -0);
        cylinder.rotation.y -= Math.random() * (.02 -0);
        cylinder.rotation.z += Math.random() * (.02 -0);
        // console.log("CYL", satelliteX);
        // console.log("CYL", satelliteY);
        // console.log("CYL", satelliteZ);
        scene.add( cylinder);

     };

//IF PAYLOAD = CREATE OCTAHEDRON
   if (TLE_data[i].OBJECT_TYPE === "PAYLOAD") {
          // console.log("PAYLOAD TLE= ", TLE_data[i].TLE_LINE1);
    var octGeometry = new THREE.OctahedronBufferGeometry( 400,0);
    var octMaterial = new THREE.MeshPhongMaterial( {
        color: 0xFF0099,
        shininess: 150 } );
    var octahedron = new THREE.Mesh( octGeometry, octMaterial );
      octahedron.position.x = satelliteX;
      octahedron.position.y = satelliteY;
      octahedron.position.z = satelliteZ;
      // octahedron.rotation.x = random;
      // octahedron.rotation.y = random;
      // octahedron.rotation.z = random;
      // console.log("OCT", satelliteX);
      // console.log("OCT", satelliteY);
      // console.log("OCT", satelliteZ);
      scene.add( octahedron );
    //ROTATE
    };

     if (typeof tle1 == 'string' || tle1 instanceof String || typeof tle2 ==
     'string' || tle2 instanceof String) {
//MOVE TO NEXT 2 LINES OF TLE
     j = j + 1 ;  
        }
    }
};
//END PROPAGATION

//CAMERA 
    camera = new THREE.PerspectiveCamera(130, canvas.clientWidth / canvas.clientWidth, .00000000001, 10000000000000000000000000000000)
    camera.position.set (0, 0, 12000);
    camera.lookAt(0, 0, 0);

//ORBIT CONTROL
    var controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;
    controls.target = new THREE.Vector3(0, 0, 0);
    scene.add(camera);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(), INTERSECTED;
    var tooltipDisplayTimeout;
    var latestMouseProjection;

      function render() {
        requestAnimationFrame(render);
        controls.update();
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.001;
        mesh.rotation.z += 0.001;
        outlinemesh.rotation.x -= 0.0001;
        outlinemesh.rotation.y -= 0.0001;
        outlinemesh.rotation.z -= 0.0001; 
        raycaster.setFromCamera( mouse, camera );   
        var intersects = raycaster.intersectObjects( scene.children );

       if ( intersects.length > 0 ){
 //IF CURRENT OBJ IS NOT BEING STORED...
        if ( intersects[ 0 ].object != INTERSECTED )
        {
//RESTORE COLOR OF LAST SHAPE
        if ( INTERSECTED )
            INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
//STORE NEW SHAPE AS INTERSECTION OBJ
        INTERSECTED = intersects[ 0 ].object;
//STORE NEW SHAPE DEFAULT COLOR FOR FUTURE REVERSAL
        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
//SET NEW HOVER COLOR ON NEW SHAPE
        INTERSECTED.material.color.setHex( 0x00EAFF);
        document.getElementById("infobox").style.visibility = "visible";
    }
  }
  //IF MOUSE IS NOT HOVERING OVER OBJ...
  else 
  {
  //RESTORE DEFAULT COLOR OF LAST SHAPE 
      if ( INTERSECTED )
          INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
          document.getElementById("infobox").style.visibility = "hidden"
  //REMOVE LAST SHAPE'S OBJ REFERENCE
      INTERSECTED = null;
  }
          renderer.render(scene, camera);
        }
       render();


function onMouseMove( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'mousemove', onMouseMove, false );

function changeText() {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            i++;
            var int = TLE_data[i].INTLDES;
            var name = TLE_data[i].OBJECT_NAME;
            var type = TLE_data[i].OBJECT_TYPE;
            document.getElementById("int").innerHTML = int;
            document.getElementById("name").innerHTML = name;
            document.getElementById("type").innerHTML = type;
            });    
        });

        var target = document.getElementById('infobox');
        observer.observe(target, { attributes : true, attributeFilter : ['style'] 
        }) 
      }
changeText();

