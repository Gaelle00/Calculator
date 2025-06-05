const display = document.querySelector(".display p");
const displayContainer = document.querySelector(".display")

let currentFontSize = 100;

function resizeFont() {
  const maxFontSize = 100;
  const minFontSize = 20;
  let fontSize = currentFontSize;;
  display.style.fontSize = fontSize + "px";

  while (
    (display.scrollWidth > displayContainer.clientWidth ||
      display.scrollHeight > displayContainer.clientHeight) &&
    fontSize > minFontSize
  ) {
    fontSize--;
    display.style.fontSize = fontSize + "px";
  }

  while (
    display.scrollWidth <= displayContainer.clientWidth &&
    display.scrollHeight <= displayContainer.clientHeight &&
    fontSize < maxFontSize
  ) {
    fontSize++;
    display.style.fontSize = fontSize + "px";
    // Stop if next step would overflow
    if (
      display.scrollWidth > displayContainer.clientWidth ||
      display.scrollHeight > displayContainer.clientHeight
    ) {
      fontSize--;
      display.style.fontSize = fontSize + "px";
      break;
    }
  }
  currentFontSize = fontSize;
}


function getInput(input) {
    let = currentInput = display.textContent;
    if (currentInput.length < 35){
      if (currentInput.length == 0 && "+-×/".includes(input)) {
        display.textContent = "0" + input;
      } else if ("+-×/".includes(input) && "+-×/".includes(currentInput[currentInput.length - 1])) {
        backSpace();
        display.textContent += input;
      } else {
        display.textContent += input;
      }
    }
  resizeFont();
 
}

function clearDisplay() {
  display.textContent = "";
}

function backSpace() {
  if (display.textContent.length > 0) {
    displayedText = display.textContent.slice(0, -1);
    display.textContent = displayedText;
    resizeFont();
  }
}
function operate() {
  displayedText = display.textContent;
  const inputList = displayedText.split(/([+\-×/])/);
  let result = parseFloat(inputList[0]);

  for (let i = 1; i < inputList.length; i += 2) {
    const operator = inputList[i];
    const operand = parseFloat(inputList[i + 1]);

    if (operator == "+") {
      result += operand;
    }
    if (operator == "-") {
      result -= operand;
    }
    if (operator == "×") {
      result *= operand;
    }
    if (operator == "/") {
      result /= operand;
    }
  }
  return result;
}

function displayResult(result) {
  display.textContent = result;
  resizeFont();
}

function orchestrate() {
  const numbersSignsButtons = document.querySelectorAll(
    ".numbers, .signs, .decimalpoint"
  );
  const clearButton = document.querySelector(".clear");
  const backSpaceButton = document.querySelector(".delete");
  const equalSign = document.querySelector(".equal");

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
  });
}

orchestrate();