let test = document.querySelector("#test");
let paragraph = document.createElement("p");
paragraph.append("Hello !");
//paragraph.append(test.cloneNode(true));
//test.after(paragraph.cloneNode(true))
//paragraph.remove();
//test.remove();

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