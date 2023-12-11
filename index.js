

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
let rect = canvasDiv.getBoundingClientRect();


let mouseIsDown = false;
let globalX = 0;
let globalY = 0;
let isWithinBounds = false;

let colorsDiv = document.querySelector("#colors");
let selectColors = document.querySelector("#selectColors");
let inputLineWidth = document.querySelector("#inputLineWidth");
inputLineWidth.value = 5;

for (let index = 0; index < colorlist.length; index++) {
    const color = colorlist[index];
    let colorText = document.createTextNode(color);
    let selectColorsOption = document.createElement("option");
    console.log("selectColorsOption:",selectColorsOption)
    selectColorsOption.append(colorText);
    selectColorsOption.style = `color:${color}; font-weight:bold;`;
    selectColorsOption.value = color;
    selectColors.append(selectColorsOption);

    
    
}

function clearCanvas(){
    //reinitalise canvas
    canvasDiv.width = canvasDiv.width;
    inputLineWidth.value = 5;
    selectColors.value = "";

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

let addCanvasPoint = (x, y, x2, y2) =>{
    canvas.beginPath();
    canvas.strokeStyle = selectColors.value;
    canvas.lineWidth = inputLineWidth.value;
    canvas.lineJoin = "round";
    canvas.moveTo(x,y);
    canvas.lineTo(x2,y2);
    canvas.closePath();
    canvas.stroke();
}


function addPoint(ev){
    //let {x:x,y:y} = getMousePosition(canvasDiv,ev);
    if(mouseIsDown){
        addCanvasPoint(globalX, globalY, ev.offsetX, ev.offsetY);
    }
}

//---- Ajout des évenements

canvasDiv.addEventListener("mousedown", (event) => {
    globalX = event.offsetX;
    globalY = event.offsetY;
    mouseIsDown = true;
})

//Lorsqu'on sort du carré avec le click maintenu, et qu'on revient dedans, je veux continuer le trait
/*
click maintenu -> sort div -> rerentre dans div -> trait = bien
*/
canvasDiv.addEventListener("mousemove", event => {
    if(mouseIsDown){
        isWithinBounds = this.withinBoundsCheck(globalX, globalY);
        if(isWithinBounds){
            addPoint(event);
            // console.log("globalY:",globalY)
            globalX = event.offsetX;
            globalY = event.offsetY;
        }
    }
})
//
canvasDiv.addEventListener("mouseup", (event) => {
    if(mouseIsDown){
        //addPoint(event);
        globalX = 0;
        globalY = 0;
        mouseIsDown = false;
    }
})

function withinBoundsCheck(x, y){
    let withinBounds = false;
    let borderLimit = 200;
    if(
        x - borderLimit < 0 &&
        y - borderLimit < 0
    ){
        withinBounds = true;
    }
    return withinBounds;
}

/* let getMousePosition = (canvas,event) =>{
    let rect = canvas.getBoundingClientRect();
    let abs = event.clientX - rect.left;
    let ord = event.clientY - rect.top;
    return {x:abs,y:ord};
} */

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
