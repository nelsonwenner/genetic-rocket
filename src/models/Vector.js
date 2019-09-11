class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    set = (vector) => {
        this.x = vector.x;
        this.y = vector.y;
    }

    getAngle = () => {
        let angle = Math.atan2(-this.y, this.x);
        if (angle < 0) {
            angle += Math.PI * 2;
        }
        return angle;
    }
    
    add = (vector) => {
        this.x += vector.x;
        this.y += vector.y;
    }
    
    static difference(position, ...vector) {
        let x = position.x;
        let y = position.y;

        for (let i=0; i < vector.length; i++) {
            x -= vector[i].x;
            y -= vector[i].y;
        }
        return new Vector(x, y);
    }
}