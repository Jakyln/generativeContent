let test = document.querySelector("#test");
let paragraph = document.createElement("p");
paragraph.append("Hello !");
//paragraph.append(test.cloneNode(true));
//test.after(paragraph.cloneNode(true))
//paragraph.remove();
//test.remove();


let canvasDiv = document.querySelector("#myCanvas");
canvasDiv.style = "border:solid"
let canvas = canvasDiv.getContext("2d");
canvas.lineWidth = 5;
canvas.beginPath();
canvas.moveTo(100,100);
//canvas.lineTo(200,200);
//canvas.lineTo(100,200);
canvas.lineTo(103,109);
//canvas.closePath();
canvas.stroke();
//canvas.fill();

function addButton(){
    let wrapper = document.querySelector("#wrapper");
    let initialButton = document.querySelector("#initialButton");
    //let buttonToAdd = document.createElement("button");
    //buttonToAdd.append("HELLO")
    let buttonToAdd = initialButton.cloneNode(true);
    wrapper.append(buttonToAdd);
} 

function addInfiniteButtons(){
    setInterval(() => {
        let wrapper = document.querySelector("#wrapper");
        let initialButton = document.querySelector("#initialButton");
        let buttonToAdd = initialButton.cloneNode(true);
        wrapper.append(buttonToAdd);
    },1000);
}

/* let addCanvasPoint = (event) => {
    console.log('event,',event)
} */




let getMousePosition = (canvas,event) =>{
    let rect = canvas.getBoundingClientRect();
    console.log("canvas:",rect)
    console.log("event:",event)
    let abs = event.clientX - rect.left;
    let ord = event.clientY - rect.top;
    return {x:abs,y:ord};
}

let addCanvasPoint = (canvasDiv,event) =>{
    let {x:x,y:y} = getMousePosition(canvasDiv,event);
    console.log("x:",x)
    console.log("y:",y)
    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+5,y+5);
    canvas.stroke();
}

canvasDiv.addEventListener("mousedown", event => {
    addCanvasPoint(canvasDiv,event);
})