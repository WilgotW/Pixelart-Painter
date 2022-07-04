const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 750;
canvas.height = 750;

let lines = [];
let lineAmount = 50;
let lineGap = canvas.width/lineAmount;

let squares = [];

let gridX = [];
let gridY = [];

let xMousePos = 0;
let yMoisePos = 0;
let MouseOffset = 0.5;
let mouseDown = false;

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
        c.fillStyle = 'blue';
        c.fillRect(this.x, this.y, this.size, this.size);
    }
}

const mouse = {
    x: undefined,
    y: undefined
};
// window.addEventListener('click', function(event) {
//     placePixels(event);
// });
window.addEventListener('mousemove', function(event) {
    xMousePos = event.x;
    yMoisePos = event.y;
});
window.addEventListener('mousedown', function(event) {
    mouseDown = true;
});
window.addEventListener('mouseup', function(event) {
    mouseDown = false;
});

function placePixels(){
    let rect = canvas.getBoundingClientRect();
    mouse.x = xMousePos - Math.floor(rect.left);
    mouse.y = yMoisePos - Math.floor(rect.top);
    if(mouse.x < 0 || mouse.x > canvas.width){
        mouse.x = undefined;
    }
    if(mouse.y < 0 || mouse.y > canvas.height){
        mouse.y = undefined;
    }

    if(mouse.x != undefined && mouse.y != undefined){
        const closestX = gridX.reduce((a, b) => {
            return Math.abs(b-mouse.x/lineGap +MouseOffset ) < Math.abs(a - mouse.x/lineGap +MouseOffset ) ? b : a;
        })
        const closestY = gridY.reduce((a, b) => {
            return Math.abs(b-mouse.y/lineGap +MouseOffset ) < Math.abs(a - mouse.y/lineGap +MouseOffset ) ? b : a;
        })
        console.log("mouse x pos = " + mouse.x/lineGap + ". closest number was = " + closestX);
        squares.push(new fillSquare(closestX * lineGap,closestY * lineGap, lineGap))
    }else{
        console.log("mouse outside grid");
    }
    
}



function update(){
    for(i = 0; i < squares.length; i++){
        squares[i].draw();
    }

    if(mouseDown){
        placePixels();
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