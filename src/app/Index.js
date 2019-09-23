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
        this.population = new Population(250, this.target, this.obstacle, this.context);
        this.imgBackground = this.instanceImg('../genetic-rocket/src/assets/img/background1.png');
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
        this.div('div', 'manager');
        manager();
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
        this.context.drawImage(this.imgBackground, 0, 0, this.width, this.height);
        this.context.font = "30px Arial";
        this.context.fillStyle = "red";
        this.context.fillText("Population: 250", 250, this.height/2);
    }
    
    instanceImg = (path) => {
        let img = new Image();
        img.src = path;
        return img;
    }

    div = (tag, id) => {
        const name = document.createElement(tag);
        name.id = id;
        document.body.appendChild(name);
    }
    
}

new Index();
