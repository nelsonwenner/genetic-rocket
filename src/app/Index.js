class Index{
    constructor(){
        this.width = 1200;
        this.height = 690;
        this.frame = 0;
        this.indice = 0;
        this.context = this.createCanvas();
        this.target = new Target(1150, this.height/2, 30, 30, this.context);
        this.obstacle = [];
        this.createObstacle();
        this.population = new Population(1500, this.target, this.obstacle, this.context);
        this.renderhtml();
        this.start();
    }
    
    start = () => {
        this.loop();
    }

    createObstacle = () => {
        this.obstacle.push(new Obstacle(260, 120, 30, 460, this.context));
        this.obstacle.push(new Obstacle(523, 0, 30, 300, this.context));
        this.obstacle.push(new Obstacle(850, 0, 30, 600, this.context));
        this.obstacle.push(new Obstacle(523, 500, 30, 200, this.context));
    }

    obstacleDraw = () => {
        for (let i=0; i < this.obstacle.length; i++) {
            this.obstacle[i].draw();
        }
    }

    renderhtml = () => {
        nav();
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

    tempLife = () => {
        if (this.frame % 15 === 0) {
            this.population.startIndiceGenes(this.indice);
            this.indice++;
        }
    }

    nextGeneration = (qntGenes) => {
        if (this.indice >= qntGenes) {
            this.population.repopulation();
            this.indice = 0;
        }
    }

    update = () => {

        this.tempLife();
        this.nextGeneration(49);

        this.background();
        this.target.draw();
        this.obstacleDraw();
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