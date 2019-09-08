class Index{
    constructor(){
        this.width = 1000;
        this.height = 500;
        this.frame = 0;
        this.obstacle = [];
        this.context = this.createCanvas();
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
        return canvas.getContext("2d");;
    }

    loop = () => {
        this.update();
        window.requestAnimationFrame(this.loop);
    }

    update = () => {
        this.frame++;
        this.draw();
    }

    draw = () => {
        this.background();
    }

    background = () => {
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.width, this.height);
    }
}

new Index();