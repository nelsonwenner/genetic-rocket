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
        this.population = new Population(1000, this.target, this.obstacle, this.context);
        this.imgBackground = this.instanceImg('../genetic-rocket/src/assets/img/background.png');
        this.renderhtml();
        this.start();
    }
    
    start = () => {
        this.loop();
    }

    createObstacle = () => {
        this.obstacle.push(new Obstacle(350, 0, 65, 280, this.context));
        this.obstacle.push(new Obstacle(350, 450, 65, 300, this.context));
        this.obstacle.push(new Obstacle(850, 215, 65, 300, this.context));
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
        if (this.frame % 15 == 0) {
            this.population.startIndiceGenes(this.indice);
            this.indice++;
        }
    }

    nextGeneration = (qntGenes) => {
        if (this.indice >= qntGenes) {

            if (this.population.hit > this.population.bestHit) {
                this.population.bestHit = this.population.hit;
            }

            this.population.hit = 0;

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
        this.population.hit = this.population.infoHit();
        this.info();
        this.population.evaluate();
        this.population.rocketDraw();
        this.frame++;
    }

    background = () => {
        //this.context.fillStyle = "black";
        //this.context.fillRect(0, 0, this.width, this.height);
        this.context.drawImage(this.imgBackground, 0, 0, this.width, this.height);
    }

    info = () => {
        this.context.font = "15px Arial";
        this.context.fillStyle = "yellow";
        this.context.fillText(`Population: ${this.population.sizePopulation}`, 100, this.height/2 - 270);
        this.context.fillText(`Generation: ${this.population.generation}`, 100, this.height/2 - 250);
        this.context.fillText(`Number of hit: ${this.population.hit} / ${this.population.sizePopulation}`, 100, this.height/2 - 230);
        this.context.fillText(`Best hit: ${this.population.bestHit}`, 100, this.height/2 - 210);
    }

    instanceImg = (path) => {
        let img = new Image();
        img.src = path;
        return img;
    }
}

new Index();
