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
}