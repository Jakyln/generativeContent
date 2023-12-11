

let test = document.querySelector("#test");
let paragraph = document.createElement("p");
paragraph.append("Hello !");
//paragraph.append(test.cloneNode(true));
//test.after(paragraph.cloneNode(true))
//paragraph.remove();
//test.remove();

let colorlist =
[
    `AliceBlue`,
    `AntiqueWhite`,
    `Aqua`,
    `Aquamarine`,
    `Azure`,
    `Beige`,
    `Bisque`,
    `Black`,
    `BlanchedAlmond`,
    `Blue`,
    `BlueViolet`,
    `Brown`,
    `BurlyWood`,
    `CadetBlue`,
    `Chartreuse`,
    `Chocolate`,
    `Coral`,
    `CornflowerBlue`,
    `Cornsilk`,
    `Crimson`,
    `Cyan`,
    `DarkBlue`,
    `DarkCyan`,
    `DarkGoldenRod`,
    `DarkGray`,
    `DarkGrey`,
    `DarkGreen`,
    `DarkKhaki`,
    `DarkMagenta`,
    `DarkOliveGreen`,
    `Darkorange`,
    `DarkOrchid`,
    `DarkRed`,
    `DarkSalmon`,
    `DarkSeaGreen`,
    `DarkSlateBlue`,
    `DarkSlateGray`,
    `DarkSlateGrey`,
    `DarkTurquoise`,
    `DarkViolet`,
    `DeepPink`,
    `DeepSkyBlue`,
    `DimGray`,
    `DimGrey`,
    `DodgerBlue`,
    `FireBrick`,
    `FloralWhite`,
    `ForestGreen`,
    `Fuchsia`,
    `Gainsboro`,
    `GhostWhite`,
    `Gold`,
    `GoldenRod`,
    `Gray`,
    `Grey`,
    `Green`,
    `GreenYellow`,
    `HoneyDew`,
    `HotPink`,
    `IndianRed`,
    `Indigo`,
    `Ivory`,
    `Khaki`,
    `Lavender`,
    `LavenderBlush`,
    `LawnGreen`,
    `LemonChiffon`,
    `LightBlue`,
    `LightCoral`,
    `LightCyan`,
    `LightGoldenRodYellow`,
    `LightGray`,
    `LightGrey`,
    `LightGreen`,
    `LightPink`,
    `LightSalmon`,
    `LightSeaGreen`,
    `LightSkyBlue`,
    `LightSlateGray`,
    `LightSlateGrey`,
    `LightSteelBlue`,
    `LightYellow`,
    `Lime`,
    `LimeGreen`,
    `Linen`,
    `Magenta`,
    `Maroon`,
    `MediumAquaMarine`,
    `MediumBlue`,
    `MediumOrchid`,
    `MediumPurple`,
    `MediumSeaGreen`,
    `MediumSlateBlue`,
    `MediumSpringGreen`,
    `MediumTurquoise`,
    `MediumVioletRed`,
    `MidnightBlue`,
    `MintCream`,
    `MistyRose`,
    `Moccasin`,
    `NavajoWhite`,
    `Navy`,
    `OldLace`,
    `Olive`,
    `OliveDrab`,
    `Orange`,
    `OrangeRed`,
    `Orchid`,
    `PaleGoldenRod`,
    `PaleGreen`,
    `PaleTurquoise`,
    `PaleVioletRed`,
    `PapayaWhip`,
    `PeachPuff`,
    `Peru`,
    `Pink`,
    `Plum`,
    `PowderBlue`,
    `Purple`,
    `Red`,
    `RosyBrown`,
    `RoyalBlue`,
    `SaddleBrown`,
    `Salmon`,
    `SandyBrown`,
    `SeaGreen`,
    `SeaShell`,
    `Sienna`,
    `Silver`,
    `SkyBlue`,
    `SlateBlue`,
    `SlateGray`,
    `SlateGrey`,
    `Snow`,
    `SpringGreen`,
    `SteelBlue`,
    `Tan`,
    `Teal`,
    `Thistle`,
    `Tomato`,
    `Turquoise`,
    `Violet`,
    `Wheat`,
    `White`,
    `WhiteSmoke`,
    `Yellow`,
    `YellowGreen`,
  ]

let canvasDiv = document.querySelector("#myCanvas");
canvasDiv.style = "border:solid"
let canvas = canvasDiv.getContext("2d");
canvas.lineWidth = 5;

let mouseIsDown = false;
let timer;

let colorsDiv = document.querySelector("#colors");
for (let index = 0; index < colorlist.length; index++) {
    const color = colorlist[index];
    let colorDiv = document.createElement("div");
    let colorBox = document.createElement("div");
    let colorText = document.createTextNode(color);
    colorBox.style = `height:20px;width:20px;background-color:${color}`
    colorBox.id = color;
    colorBox.addEventListener("click", () => {
        pickColor(color);
        let style = window.getComputedStyle(colorBox);
        console.log("style:",style)
    });
    colorDiv.append(colorBox);
    colorDiv.append(colorText);
    colorsDiv.append(colorDiv);
    
}

function pickColor(colorHex){
    canvas.strokeStyle = colorHex;
}
function clearCanvas(){
    //reinitalise canvas
    canvasDiv.width = canvasDiv.width;
    canvas.lineWidth = 5;
}

function addButton(){
    let wrapper = document.querySelector("#wrapper");
    let initialButton = document.querySelector("#initialButton");
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


let getMousePosition = (canvas,event) =>{
    let rect = canvas.getBoundingClientRect();
    let abs = event.clientX - rect.left;
    let ord = event.clientY - rect.top;
    return {x:abs,y:ord};
}

let addCanvasPoint = (x,y) =>{
    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+5,y+5);
    canvas.stroke();
}


function addPoint(ev){
    timer = setTimeout(() => {
        let {x:x,y:y} = getMousePosition(canvasDiv,ev);
        if(mouseIsDown){
             addCanvasPoint(x,y);
        }
    },100);
}

//---- Ajout des évenements

canvasDiv.addEventListener("mousedown", () => {
    mouseIsDown = true;
})


canvasDiv.addEventListener("mousemove", event => {
    if(mouseIsDown){
        addPoint(event);
    }
})

canvasDiv.addEventListener("mouseup", () => {
    clearTimeout(timer);
    mouseIsDown = false;
})

/* 
function handleClickHold(timeout, callback){
    let startTime;
    const mouseDown = () => (startTime = Date.now());
    const mouseUp = event => {
        let hasTimeoutElapsed = Date.now() - startTime > timeout;
        let isCallbackOK = callback(Date.now - startTime);
        return hasTimeoutElapsed && isCallbackOK;
    };
}

const callBack = (timeElapsed) => {console.log("")} */
