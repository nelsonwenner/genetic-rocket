class Obstacle{
    constructor(x, y, width, height, context){
        this.position = new Vector(x, y);
        this.context = context;
        this.width = width;
        this.height = height;
        this.meteor = this.instanceImg('../genetic-rocket/src/assets/img/x.png');
    }
    
    draw = () => {
        this.context.drawImage(this.meteor, this.position.x, this.position.y, this.width, this.height);
    }

    instanceImg = (path) => {
        let img = new Image();
        img.src = path;
        return img;
    }
}

