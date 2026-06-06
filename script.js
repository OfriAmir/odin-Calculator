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

let firstNum = ""
let secondNum = ""
let operator = ""
let allTogether
let result
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
    return str.length > 9
}
function roundToNinthDigit(str) {
    const lastTwo = +str.slice(9, 11)
    const rounded = Math.round(lastTwo / 10)
    return str.slice(0, 8) + rounded.toString()
}
function includesDigits (str) {
    return ["0","1","2","3","4","5","6","7","8","9"].includes(str)
}

function includesOperators (str) {
    return ["+","-",":","x"].includes(str)
}

const calculator = document.querySelector(".calculator")
const btnsDiv = document.querySelector(".btns-div")
const displayDiv = document.querySelector(".display-div")
const buttons = []
const buttonsDiv = []
const buttonsText = "c  :123x456-789+0.="
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
    buttons[i].addEventListener("click", (e) => {
        if (e.target.textContent == "c" ||
        (result && includesDigits(e.target.textContent))){
            firstNum = ""
            operator = ""
            secondNum = ""
            displayDiv.textContent = "0"
            result = 0
        }
        if (result && includesDigits(e.target.textContent)){
            firstNum = ""
            operator = ""
            secondNum = ""
            displayDiv.textContent = "0"
            result = 0
        }
        if (result && includesOperators(e.target.textContent)){
            firstNum = result
            operator = ""
            secondNum = ""
            result = 0
        }
        //accepts only 6 digits per operand which it shouldn't. also the 4th if creates
        //firstNum with more than 6 digits.
        //gets stuck when an operand reaches 6 digits.
        if (!operator && includesDigits(e.target.textContent)) firstNum += e.target.textContent;
        if (firstNum && !operator && includesOperators(e.target.textContent)) operator = e.target.textContent 
        if (operator && includesDigits(e.target.textContent)) secondNum += e.target.textContent
        if ((displayDiv.textContent).length > 20) {
            firstNum = ""
            operator = ""
            secondNum = ""
            displayDiv.textContent = "TOO LONG"
            result = 0
        }
        if (secondNum && includesOperators(e.target.textContent)) {
            firstNum = operate(firstNum, operator, secondNum)
            //if (isTooLong(firstNum)) firstNum = roundToNinthDigit(firstNum)
            operator = e.target.textContent
            secondNum = ""
        }
        if (secondNum && e.target.textContent == "="){
            result = operate(firstNum, operator, secondNum).toString()
            //if (isTooLong(result)) result = roundToNinthDigit(result)
            displayDiv.textContent = result
        } else if (firstNum) {
            allTogether = firstNum + operator + secondNum
            displayDiv.textContent = allTogether
        }
        if ((displayDiv.textContent).length > 9){
            displayDiv.style.overflowX = "scroll"
        } else {
            displayDiv.style.overflowX = ""
        }

        
        //displayDiv.textContent = firstNum + operator + secondNum
    })
}