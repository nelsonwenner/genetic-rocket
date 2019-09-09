class Rocket{
    constructor(x, y, target, obstacle, context){
        this.canvasBackground = {width: 1280, height: 720};
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.force = new Vector(0, 0);
        this.target = target;
        this.obstacle = obstacle;
        this.context = context;
        this.fitness = 0;
        this.success = false;
        this.death = false;
        this.deathInObstacle = false;
        this.width = 20;
        this.height = 5;
        this.indice = 0;
        this.dna = new Dna(50);
    }
    // w: 6 h: 25
    update = () => {
        if (this.position.x + this.width > this.canvasBackground.width     ||
            this.position.x < 0                                            ||
            this.position.y + this.height > this.canvasBackground.height   ||
            this.position.y < 0) {
            this.death= true;
        }

        if (this.position.x + this.width > this.target.position.x               &&
            this.position.x < this.target.position.x + this.target.width        &&
            this.position.y + this.height > this.target.position.y              &&
            this.position.y < this.target.position.y + this.target.height) {
            this.success = true;
        }

        if (this.position.x + this.width > this.obstacle.position.x             &&
            this.position.x < this.obstacle.position.x + this.obstacle.width    &&
            this.position.y + this.height > this.obstacle.position.y            &&
            this.position.y < this.obstacle.position.y + this.obstacle.height) {
            this.deathInObstacle = true;
            this.death= true;
        }

        if (!this.death && !this.success) {
            this.position.add(this.velocity);
            this.velocity.add(this.acceleration);
            this.acceleration.set(this.force);
            this.applyForce(this.dna.genes[this.indice]);
        }
    }

    applyForce = (genes) => {
        this.force.set(genes);
    }
    
    findFitness = () => {
        let distance = this.distanceBetweenTwoPoints(this.position, this.target.position);
        this.fitness = Math.pow(1 / distance, 2);

        if (this.success == true){
            this.fitness *= 2;
        }
        
        if (this.deathInObstacle == true){
            this.fitness *= 0.1;
        }
    }

    addNewDna = (dna) => {
        this.dna = dna;
        return this;
    }

    distanceBetweenTwoPoints = (a, b) => {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }
    
    rocketImg = () => {
        let img = new Image();
        img.src = "../genetic-rocket/src/assets/img/rocket03.png";
        this.context.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
    }

    draw = () => {
        let angle = this.velocity.getAngle();
        this.context.translate(this.position.x + this.width/2, this.position.y + this.height/2);
        this.context.rotate(-angle);
        this.context.fillStyle = 'yellow';
        this.handlersCores();
        this.context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        //this.rocketImg();
        this.context.rotate(angle);
        this.context.translate(-this.position.x - this.width/2, -this.position.y - this.height/2);
    }

    handlersCores = () => {
        if (this.success) this.context.fillStyle = 'green';
        else if (this.death) this.context.fillStyle = 'red';
    }

}