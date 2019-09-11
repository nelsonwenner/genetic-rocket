
window.addEventListener("mousedown", (event) => {
    let obstacle = game.obstacle;
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    
    for (let i=0; i < obstacle.length; i++) {
        if (mouseX > obstacle[i].position.x                     &&
            mouseY > obstacle[i].position.y                     &&
            mouseX < obstacle[i].position.x + obstacle[i].width &&
            mouseY < obstacle[i].position.y + obstacle[i].height) {
            obstacle[i].dragging = true;
            obstacle[i].dragOffset = Vector.difference(obstacle[i].position, new Vector(mouseX, mouseY));
        }
    }
});

window.addEventListener("mousemove", (event) => {
    let obstacle = game.obstacle;
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    for (let i=0; i < obstacle.length; i++) {
        if (obstacle[i].dragging) {
            obstacle[i].position.x = mouseX;
            obstacle[i].position.y = mouseY;
            obstacle[i].position.add(obstacle[i].dragOffset);
        }
    }
});

window.addEventListener("mouseup", (event) => {
    let obstacle = game.obstacle;

    for (let i=0; i < obstacle.length; i++) {
        obstacle[i].dragging = false;
    }

});