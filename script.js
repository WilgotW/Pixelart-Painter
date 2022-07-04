const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let lines = [];
let lineGap = 25;
class line {
    constructor(x, y, endX, endY){
        this.x = x;
        this.y = y;
        this.endX = endX;
        this.endY = endY;
    }
    draw(){
        c.strokeStyle = 'black';
        c.beginPath();
        c.lineWidth = 1;
        c.moveTo(this.x, this.y);
        c.lineTo(this.endX, this.endY);
        c.stroke();
    }
}

function setup(){
    for(i = 0; i < canvas.width/lineGap +10; i++){
        lines.push(new line(i*lineGap, 0, i*lineGap, canvas.height));
        for(z = i; z < canvas.height/lineGap +10; z++){
            lines.push(new line(0, z*lineGap, canvas.width, z*lineGap));
        }
    }
}
setup();

function update(){
    for(i = 0; i < lines.length; i++){lines[i].draw();}

    requestAnimationFrame(update);
}
update();