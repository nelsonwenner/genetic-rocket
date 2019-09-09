class Index{
    constructor(){
        this.width = 1280;
        this.height = 720;
        this.frame = 0;
        this.indice = 0;
        this.context = this.createCanvas();
        this.target = new Target(1150, this.height/2, 30, 30, this.context);
        this.obstacle = new Obstacle(this.width/2, this.height/2 - 270, 30, 550, this.context);
        this.population = new Population(100, this.target, this.obstacle, this.context);
        this.start();
    }
    
    start = () => {
        this.loop();
    }

    createCanvas = () => {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        return canvas.getContext("2d");
    }

    loop = () => {
        window.requestAnimationFrame(this.loop);
        this.update();
    }
    
    update = () => {
        if (this.frame % 15 === 0){
            this.population.startIndiceGenes(this.indice);
            this.indice++;
        }
        
        if (this.indice >= 49) {
            this.population.repopulation();
            this.indice = 0;
        }

        this.background();
        this.target.draw();
        this.obstacle.draw();
        this.population.rocketUpdatePosition();
        this.population.evaluate();
        this.population.rocketDraw();
        this.frame++;
    }

    background = () => {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

new Index();