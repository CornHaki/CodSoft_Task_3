const display = document.getElementById("display");
let currentInput = ""; 
let previousInput = ""; 
let operator = ""; 
let memory = 0;


function updateDisplay(value) {
  display.textContent = value || "0";
}


document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => handleInput(button.getAttribute("data-value")));
});


document.addEventListener("keydown", (event) => {
  const keyMap = {
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "Enter": "=",
    "Backspace": "backspace",
    "Escape": "C",
  };
  const value = keyMap[event.key] || event.key;
  handleInput(value);
});


function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    currentInput += value;
    updateDisplay(currentInput);
  } else if (value === "C") {
    
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("");
  } else if (value === "backspace") {
    
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (value === "=") {
    
    if (currentInput && previousInput && operator) {
      currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
      operator = "";
      previousInput = "";
      updateDisplay(currentInput);
    }
  } else if (value === "sqrt") {
    
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
  } else if (value === "square") {
  
    currentInput = (parseFloat(currentInput) ** 2).toString();
    updateDisplay(currentInput);
  } else if (value === "reciprocal") {
   
    currentInput = (1 / parseFloat(currentInput)).toString();
    updateDisplay(currentInput);
  } else if (value === "%") {
   
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
  } else if (value === "MS") {
  
    memory = parseFloat(currentInput);
  } else if (value === "MR") {
   
    currentInput = memory.toString();
    updateDisplay(currentInput);
  } else if (value === "MC") {
   
    memory = 0;
  } else {
    
    if (currentInput) {
      if (previousInput) {
        currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
      }
      previousInput = currentInput;
      currentInput = "";
    }
    operator = value;
    updateDisplay(previousInput);
  }
}
