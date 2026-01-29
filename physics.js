function createPlayer(color,x){
    const p = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3,1.3,4,16),
        new THREE.MeshStandardMaterial({color})
    );
    p.position.set(x,2,0);
    return p;
}

function movePlayer(player, keys){
    if(keys["KeyW"]) player.position.z-=0.5;
    if(keys["KeyS"]) player.position.z+=0.5;
    if(keys["KeyA"]) player.position.x-=0.5;
    if(keys["KeyD"]) player.position.x+=0.5;

    if(keys["Space"] && player.position.distanceTo(ball)<3){
        ballVelocity.x=0.9;
        ballVelocity.z=(ball.position.z-player.position.z)*0.3;
    }
}

function checkCollisions(player, ai, ball, velocity, scoreFn){
    if(ball.position.x>55) scoreFn("A");
    if(ball.position.x<-55) scoreFn("B");
}
