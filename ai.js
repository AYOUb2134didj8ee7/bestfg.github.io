function aiLogic(ai, ball, velocity){
    ai.position.z += (ball.position.z - ai.position.z)*0.03;

    if(ai.position.distanceTo(ball.position)<3){
        velocity.x = -0.8;
        velocity.z = (ball.position.z-ai.position.z)*0.25;
    }
}
