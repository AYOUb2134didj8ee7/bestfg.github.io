// Load selected team
const selectedTeam = JSON.parse(localStorage.getItem("selectedTeam"));
document.getElementById("teamA").innerText = selectedTeam?.name || "YOU";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

// Camera
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 40, 55);
camera.lookAt(0,0,0);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff,0.6));
const sun = new THREE.DirectionalLight(0xffffff,0.9);
sun.position.set(30,50,20);
scene.add(sun);

// Field
const field = new THREE.Mesh(
    new THREE.PlaneGeometry(110,70),
    new THREE.MeshStandardMaterial({color:0x166534})
);
field.rotation.x = -Math.PI/2;
scene.add(field);

// Player
const player = createPlayer(0x38bdf8,-25);
scene.add(player);

// AI
const aiPlayer = createPlayer(0xef4444,25);
scene.add(aiPlayer);

// Ball
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(1,16,16),
    new THREE.MeshStandardMaterial({color:0xffffff})
);
ball.position.set(0,1,0);
scene.add(ball);

let scoreA=0, scoreB=0;
let ballVelocity = new THREE.Vector3();
let time=0;

// Input
const keys={};
addEventListener("keydown",e=>keys[e.code]=true);
addEventListener("keyup",e=>keys[e.code]=false);

// Time
setInterval(()=>{
    time++;
    document.getElementById("time").innerText=time;
},1000);

// Loop
function animate(){
    requestAnimationFrame(animate);

    movePlayer(player, keys);
    aiLogic(aiPlayer, ball, ballVelocity);

    ball.position.add(ballVelocity);
    ballVelocity.multiplyScalar(0.98);

    checkCollisions(player, aiPlayer, ball, ballVelocity, scoreUpdate);

    renderer.render(scene,camera);
}
animate();

function scoreUpdate(side){
    if(side==="A") scoreA++;
    if(side==="B") scoreB++;
    document.getElementById("score").innerText = scoreA+" - "+scoreB;
    ball.position.set(0,1,0);
    ballVelocity.set(0,0,0);
}

// Resize
addEventListener("resize",()=>{
    camera.aspect=innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth,innerHeight);
});
