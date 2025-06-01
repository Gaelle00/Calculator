function getInput(input) {
    const display = document.querySelector(".display");
    if (display.textContent.length == 0 && "+-*/".includes(input)) {
      display.textContent = "0" + input;
    } else {
        display.textContent += input;
    }
}

function clearDisplay() {
    const display = document.querySelector(".display");
    display.textContent = "";

}

function backSpace() {
    const display = document.querySelector(".display");
    if (display.textContent.length > 0) {
      displayedText = display.textContent.slice(0, -1);
      display.textContent = displayedText;
    }
    
}
function operate() {
    const display = document.querySelector(".display");
    displayedText = display.textContent;
    const inputList = displayedText.split(/([+\-*/])/);
    let result = parseFloat(inputList[0]);

    for (let i = 1; i < inputList.length; i+=2){
        const operator = inputList[i]
        const operand = parseFloat(inputList[i + 1])

        if (operator == "+") {result += operand};
        if (operator == "-") {result -= operand};
        if (operator == "*") {result *= operand};
        if (operator == "/") {result /= operand};
    }
    return result
 
}

function displayResult (result) {
    const display = document.querySelector(".display");
    display.textContent = result;
    
}

function orchestrate() {
    const numbersSignsButtons = document.querySelectorAll(".numbers, .signs, .decimalpoint");
    const clearButton = document.querySelector(".clear");
    const backSpaceButton = document.querySelector(".delete");
    const equalSign = document.querySelector(".equal")
   
    for (let btn of numbersSignsButtons) {
      btn.addEventListener("click", (event) => {
        getInput(btn.textContent);
      });
    }

    clearButton.addEventListener("click", clearDisplay);

    backSpaceButton.addEventListener("click", backSpace);

    equalSign.addEventListener("click", () => {
        const result = operate();
        displayResult(result);
    })
}

orchestrate()