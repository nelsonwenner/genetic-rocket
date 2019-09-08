class Dna{
    constructor(lenghtGenes){
        this.lenghtGenes = lenghtGenes;
        this.genes = [];
        this.buildGenes();
    }
    
    buildGenes = () => {
        for (let i=0; i < this.lenghtGenes; i++) {
            this.genes[i] = new Vector(this.randomize(), this.randomize());
        }
    }

    randomize = () => {
        return ((Math.random() - 0.5) / 3);
    }
    
    crossover = (objPartner) => {
        let child = new Dna(this.lenghtGenes);
        let slice = this.randomForInterval(0, this.genes.length);
        for (let i=0; i < this.genes.length; i++){
            if (i > slice){
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = objPartner.genes[i];
            }
        }
        return child;
    }
    
    mutation = (rateMutation) => {
        for (let i=0; i < this.genes.length; i++){
            if (Math.random(1) < rateMutation){
                this.genes[i] = new Vector(this.randomize(), this.randomize());
            }
        }
    }
    
    randomForInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}