class Population{
    constructor(sizePopulation, target, obstacle, context) {
        this.canvasBackground = {width: 1200, height: 690};
        this.sizePopulation = sizePopulation;
        this.generation = 0;
        this.breedingPool = [];
        this.target = target;
        this.obstacle = obstacle;
        this.rockets = [];
        this.context = context;
        this.rateMutation = 0.01;
        this.buildPopulation();
    }
    
    buildPopulation = () => {
        for (let i = 0; i < this.sizePopulation; i++){
            this.rockets[i] = new Rocket(100, this.canvasBackground.height/2, this.target, this.obstacle, this.context);
        }
    }
    
    calcBestFitness = () => {
        let bestFitness = 0;
        for (let i=0; i < this.rockets.length; i++) {
            if (this.rockets[i].fitness > bestFitness){
                bestFitness = this.rockets[i].fitness;
            }
        }
        return bestFitness;
    }

    selectNatural = () => {
        let bestFitness = this.calcBestFitness();
        for (let i=0; i < this.rockets.length; i++) {
            let fitness = this.newMap(this.rockets[i].fitness, 0, bestFitness, 0, 1);
            let index = Math.floor(fitness * 100);
            for (let j=0; j < index; j++){
                this.breedingPool.push(this.rockets[i]);
            }
        }
    }

    newMap = (valor, start1, stop1, start2, stop2) => {
        return ((valor - start1) / (stop1 - start1)) * (stop2 - start2) + start2; 
    }
    
    repopulation = () => {
        this.selectNatural();
        
        for (let i=0; i < this.rockets.length; i++){
            let indexA = this.randomForInterval(0, this.breedingPool.length);
            let indexB = this.randomForInterval(0, this.breedingPool.length);

            let partnerA = this.breedingPool[indexA];
            let partnerB = this.breedingPool[indexB];
       
            let newDna = partnerA.dna.crossover(partnerB.dna);

            newDna.mutation(this.rateMutation);

            let child = new Rocket(100, this.canvasBackground.height/2, this.target, this.obstacle, this.context);

            child.addNewDna(newDna);

            this.rockets[i] = child;
        }
        this.generation += 1;
    }

    randomForInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    evaluate = () => {
        for (let i=0; i < this.rockets.length; i++) {
            this.rockets[i].findFitness();
        }
    }

    startIndiceGenes = (indice) => {
        for (let i=0; i < this.sizePopulation; i++){
            this.rockets[i].indice = indice;
        }
    }

    rocketUpdatePosition = () => {
        for (let i=0; i < this.sizePopulation; i++) {
            if (this.rockets[i].deathInObstacle != true){
                this.rockets[i].update();
            }
        }
    }

    rocketDraw = () => {
        for (let i=0; i < this.sizePopulation; i++) {
            this.rockets[i].draw();
        }
    }

}