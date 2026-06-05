function add(a, b){
    return a + b
}
function subtract(a, b){
    return a - b
}
function multiply(a, b){
    return a * b
}
function divide(a, b){
    return a / b
}

let firstNum = 0
let secondNum = 0
let operator

function operate(a, op, b){
    switch (op){
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "x":
            return multiply(a, b);
            break;
        case ":":
            return divide(a, b);
            break;
    }
}

const calculator = document.querySelector(".calculator")
const btnsDiv = document.querySelector(".btns-div")
const buttons = []
const buttonsDiv = []
const buttonsText = "c+-:123x456-789+0.="
const j = 1
for (let i = 0; i < buttonsText.length; i++){
    buttons[i] = document.createElement("button")
    buttons[i].classList.toggle("calc-btns")
    buttons[i].textContent = buttonsText[i]
    if (i % 4 == 0){
        buttonsDiv[i/4] = document.createElement("div")
        buttonsDiv[i/4].classList.toggle("btns-row-div")
        btnsDiv.appendChild(buttonsDiv[i/4])
    }
    buttonsDiv[Math.floor([i/4])].appendChild(buttons[i])
}