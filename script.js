const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 750;

let lines = [];
let lineAmount = 35;
let lineGap = canvas.width/lineAmount;
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

class grid{
    constructor(){
        this.x = 0;
    }
    draw(){
        
        lines.push(new line(0, 0, 0, canvas.height));
        lines.push(new line(canvas.width, 0, canvas.width, canvas.height));

        lines.push(new line(0, canvas.height, canvas.width, canvas.height));
        lines.push(new line(0, 0, canvas.width, 0));

        for(let i = 0; i < canvas.width/lineGap; i++){
            //vertical lines
            lines.push(new line(i*lineGap, 0, i*lineGap, canvas.height));
            for(let z = i; z < canvas.height/lineGap; z++){
                //horizontal lines
                lines.push(new line(0, z*lineGap, canvas.width, z*lineGap));
            }
        }
        for(let i = 0; i < lines.length; i++){lines[i].draw();}
    }
}
let grid1 = new grid();

const mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    mouse.x = event.x - Math.floor(rect.left);
    mouse.y = event.y - Math.floor(rect.top);
    
    console.log(mouse.x + " " + mouse.y);
});

function setup(){
    
}
setup();

function update(){
    refrech();
    grid1.draw();
    
    requestAnimationFrame(update);
}
update();

function refrech(){
    for(let i = 0; i < lines.length; i++){lines.splice(i, 0)}
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
}