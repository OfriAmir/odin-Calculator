//Simple functions
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
function operate(a, op, b){
    a = +a
    b = +b
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
function isTooLong(str) {
    return str.length > 17
}
//probably can be removed
/*function roundToNinthDigit(str) {
    const lastTwo = +str.slice(9, 11)
    const rounded = Math.round(lastTwo / 10)
    return str.slice(0, 8) + rounded.toString()
}*/
function includesDigits (str) {
    return ["0","1","2","3","4","5","6","7","8","9",].includes(str)
}
function includesOperators (str) {
    return ["+","-",":","x"].includes(str)
}

//variables
let firstNum = ""
let firstNumPoint
let secondNum = ""
let secondNumPoint 
let operator = ""
let allTogether
let result
const calculator = document.querySelector(".calculator")
const btnsDiv = document.querySelector(".btns-div")
const displayDiv = document.querySelector(".display-div")
const buttons = []
const buttonsDiv = []
const buttonsText = "c< :123x456-789+0.="

//Create desired HTML layout 
for (let i = 0; i < buttonsText.length; i++){
    buttons[i] = document.createElement("button")
    buttons[i].classList.toggle("calc-btns")
    buttons[i].textContent = buttonsText[i]
    //add a row div every 4 buttons
    if (i % 4 == 0){
        buttonsDiv[i/4] = document.createElement("div")
        buttonsDiv[i/4].classList.toggle("btns-row-div")
        btnsDiv.appendChild(buttonsDiv[i/4])
    }
    buttonsDiv[Math.floor([i/4])].appendChild(buttons[i])
    //shouldn't be here. make another loop for the main workflow.
    buttons[i].addEventListener("click", doEverything)
}



function doEverything (e) {
    //cases that involve clearing data
    if (e.target.textContent == "c"){
        firstNum = ""
        firstNumPoint = false
        operator = ""
        secondNum = ""
        secondNumPoint = false
        displayDiv.textContent = "0"
        result = null
    }
    if ((result || result === 0) && (includesDigits(e.target.textContent) ||
        e.target.textContent === "." ||
        e.target.textContent === "<")){
        firstNum = ""
        firstNumPoint = false
        operator = ""
        secondNum = ""
        secondNumPoint = false
        displayDiv.textContent = "0"
        result = null
    }
    if (result && includesOperators(e.target.textContent)){
        firstNum = result.toString()
        operator = ""
        secondNum = ""
        secondNumPoint = false
        result = null
    }


    // Cases that involve adding data
    if (!operator && includesDigits(e.target.textContent)){
        firstNum += e.target.textContent;
    }
    if (firstNum && !secondNum && includesOperators(e.target.textContent)) operator = e.target.textContent 
    if (operator && includesDigits(e.target.textContent)) secondNum += e.target.textContent
    if (e.target.textContent === "."){
        if (!firstNumPoint && !operator){
            firstNum += "."
            firstNumPoint = true
        } else if (operator && !secondNumPoint){
            secondNum += "."
            secondNumPoint = true
        }
    }
    if (e.target.textContent === "<"){
        if (secondNum) secondNum = secondNum.slice(0, -1)
        else if (operator) operator = ""
        else if (firstNum) firstNum = firstNum.slice(0, -1)
    }
    if (secondNum && includesOperators(e.target.textContent)) {
        // toPrecision(12 specifically) is to avoid 0.6*3 = 1.7999999... (12 digits) and parseFloat it to remove 0s
        firstNum = parseFloat((operate(firstNum, operator, secondNum)).toPrecision(12))
        operator = e.target.textContent
        secondNum = ""
    }



    // Make data visible
    allTogether = firstNum + operator + secondNum

    if (isTooLong((allTogether))) {
        displayDiv.textContent = "17+ TOO LONG"
        
    } else if (secondNum && e.target.textContent == "="){
        result = operate(firstNum, operator, secondNum)
        displayDiv.textContent = parseFloat(result.toPrecision(12))
    } else if (firstNum) {
        displayDiv.textContent = allTogether
    } else displayDiv.textContent = "0"

    if ((displayDiv.textContent).length > 9){
        displayDiv.style.overflowX = "scroll"
    } else {
        displayDiv.style.overflowX = ""
    }
}