let runningTotal = 0;
let buffer = "0";
let lastOperator;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  rerender();
}
function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      lastOperator = undefined;
      rerender();
      break;
    case "=":
      if (lastOperator == undefined) {
        return;
      }
      flushOperation(parseInt(buffer));
      lastOperator = undefined;
      buffer = "" + runningTotal;
      console.log(buffer);
      runningTotal = 0;
      rerender();
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
        rerender();
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
        rerender();
      }
      break;
    default:
      handleMath(value);
      break;
  }
}
function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal == 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  lastOperator = value;
  buffer = "0";
}
function flushOperation(intBuffer) {
  if (lastOperator === "+") {
    runningTotal += intBuffer;
  } else if (lastOperator === "-") {
    runningTotal -= intBuffer;
  } else if (lastOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}
function rerender() {
  screen.innerText = buffer;
}
