class Target{
    constructor(x, y, width, height, context){
        this.position = new Vector(x, y);
        this.context = context;
        this.width = width;
        this.height = height;
    }

    draw = () => {
        let img = new Image();
        img.src = "../genetic-rocket/src/assets/img/planet.png";
        this.context.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    }
}