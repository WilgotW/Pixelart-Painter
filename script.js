const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 750;

let lines = [];
let lineAmount = 45;
let lineGap = canvas.width/lineAmount;

let squares = [];

let gridX = [];
let gridY = [];

let MouseOffset = 0.5;
let yMouseOffset = 1;

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
    }
    draw(){
        
        lines.push(new line(0, 0, 0, canvas.height));
        lines.push(new line(canvas.width, 0, canvas.width, canvas.height));

        lines.push(new line(0, canvas.height, canvas.width, canvas.height));
        lines.push(new line(0, 0, canvas.width, 0));

        for(let i = 0; i < canvas.width/lineGap; i++){
            //vertical lines
            lines.push(new line(i*lineGap, 0, i*lineGap, canvas.height));
        }
        for(let z = 0; z < canvas.height/lineGap; z++){
            //horizontal lines
            lines.push(new line(0, z*lineGap, canvas.width, z*lineGap));
        }

        for(let i = 0; i < lines.length; i++){lines[i].draw();}
    }
}
let grid1 = new grid();

class fillSquare{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(){
        c.fillStyle = 'green';
        c.fillRect(this.x, this.y, this.size, this.size);
    }
}

const mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    mouse.x = event.x - Math.floor(rect.left);
    mouse.y = event.y - Math.floor(rect.top);
    if(mouse.x < 0 || mouse.x > canvas.width){
        mouse.x = undefined;
    }
    if(mouse.y < 0 || mouse.y > canvas.height){
        mouse.y = undefined;
    }
    
    console.log(mouse.x + " " + mouse.y);

    const closestX = gridX.reduce((a, b) => {
        return Math.abs(b-mouse.x/lineGap +MouseOffset ) < Math.abs(a - mouse.x/lineGap +MouseOffset ) ? b : a;
    })
    const closestY = gridY.reduce((a, b) => {
        return Math.abs(b-mouse.y/lineGap +MouseOffset ) < Math.abs(a - mouse.y/lineGap +MouseOffset ) ? b : a;
    })
    
    console.log("mouse x pos = " + mouse.x/lineGap + ". closest number was = " + closestX);

    squares.push(new fillSquare(closestX * lineGap,closestY * lineGap, lineGap))
});



function update(){
    for(i = 0; i < squares.length; i++){
        squares[i].draw();
    }
    requestAnimationFrame(update);
}
update();



function setup(){
    grid1.draw();
    setupGridCordinates();
}
setup();

function setupGridCordinates(){
    for(i = 0; i < lines.length/2; i++){
        gridX.push(i);
        gridY.push(i);
    }
}