class Calculator {
  constructor(prevTextElement, currTextElement) {
    this.prevTextElement = prevTextElement;
    this.currTextElement = currTextElement;
    this.clear();
  }
  clear() {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }
  chooseOp(Op) {
    if (this.currentOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = Op;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }
  compute() {
    let result;
    let prev = parseFloat(this.prevOp);
    let curr = parseFloat(this.currentOp);
    if (isNaN(prev) || isNaN(curr)) {
      return;
    }
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      case "%":
        result = prev % curr;
        break;
      case "√":
        result = Math.sqrt(curr);
        break;

      default:
        return;
    }
    this.currentOp = result;
    this.operation = undefined;
    this.prevOp = "";
  }
  updateDisplay() {
    currTextElement.innerText = this.currentOp;
    prevTextElement.innerText = this.prevOp;
  }
}

const dataAllClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataEquals = document.querySelector("[data-equals]");
const dataOperations = document.querySelectorAll("[data-operation]");
const dataNumbers = document.querySelectorAll("[data-number]");
const prevTextElement = document.querySelector("[data-prev-op]");
const currTextElement = document.querySelector("[data-curr-op]");

const calculator = new Calculator(0, 0);

dataNumbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

dataOperations.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOp(button.innerText);
    calculator.updateDisplay();
  });
});

dataEquals.addEventListener("click", (button) => {
  console.log("data-equal");
  calculator.compute();
  calculator.updateDisplay();
});

dataAllClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

dataDelete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
