(() => {
  const screen = document.querySelector(".calculator-screen");
  const keys = document.querySelector(".calculator-keys");

  const state = {
    displayValue: "0",
    firstValue: null,
    operator: null,
    waitingForSecondValue: false,
  };

  function updateScreen() {
    screen.value = state.displayValue;
  }

  function inputDigit(digit) {
    if (state.waitingForSecondValue) {
      state.displayValue = digit;
      state.waitingForSecondValue = false;
      return;
    }
    state.displayValue =
      state.displayValue === "0" ? digit : state.displayValue + digit;
  }

  function inputDecimal(dot) {
    if (state.waitingForSecondValue) {
      state.displayValue = "0.";
      state.waitingForSecondValue = false;
      return;
    }
    if (!state.displayValue.includes(dot)) {
      state.displayValue += dot;
    }
  }

  function calculate(first, operator, second) {
    if (operator === "+") return first + second;
    if (operator === "-") return first - second;
    if (operator === "*") return first * second;
    if (operator === "/") return second === 0 ? NaN : first / second;
    return second;
  }

  function handleOperator(nextOperator) {
    const inputValue = Number(state.displayValue);

    if (state.operator && state.waitingForSecondValue) {
      state.operator = nextOperator;
      return;
    }

    if (state.firstValue === null) {
      state.firstValue = inputValue;
    } else if (state.operator) {
      const result = calculate(
        state.firstValue,
        state.operator,
        inputValue
      );

      if (!Number.isFinite(result)) {
        state.displayValue = "Erro";
        resetCalculator();
        return;
      }

      state.displayValue = String(parseFloat(result.toFixed(12)));
      state.firstValue = Number(state.displayValue);
    }

    state.operator = nextOperator;
    state.waitingForSecondValue = true;
  }

  function resetCalculator() {
    state.displayValue = "0";
    state.firstValue = null;
    state.operator = null;
    state.waitingForSecondValue = false;
  }

  keys.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.matches("button")) return;

    const value = target.value;

    if (value === "all-clear") {
      resetCalculator();
      updateScreen();
      return;
    }

    if (value === ".") {
      inputDecimal(".");
      updateScreen();
      return;
    }

    if (value === "=") {
      if (state.operator === null) return;

      const secondValue = Number(state.displayValue);
      const result = calculate(
        state.firstValue,
        state.operator,
        secondValue
      );

      state.displayValue = String(parseFloat(result.toFixed(12)));
      state.firstValue = null;
      state.operator = null;
      state.waitingForSecondValue = false;
      updateScreen();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(value);
      updateScreen();
      return;
    }

    if (/^\d$/.test(value)) {
      inputDigit(value);
      updateScreen();
    }
  });

  updateScreen();
})();