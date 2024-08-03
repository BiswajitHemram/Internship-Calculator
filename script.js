document.addEventListener("DOMContentLoaded", () => {
    const btns = document.querySelector(".operation");
    const currentOperation = document.querySelector(".current-operation");
    const result = document.querySelector(".result"); // Assuming you have a result element
    let calculationCompleted = false;

    const SPECIAL_KEYS = {
        CLEAR: "C",
        BACKSPACE: "B",
        EQUAL: "=",
        ERROR: "Error"
    };

    const clearOperation = () => {
        currentOperation.textContent = "0";
        result.textContent = "";
        calculationCompleted = false;
    };

    const backspaceOperation = () => {
        const array = currentOperation.textContent.split("");
        array.pop();
        currentOperation.textContent = array.join("");
        if (currentOperation.textContent.length === 0) {
            currentOperation.textContent = "0";
        }
    };

    const evaluateOperation = () => {
        try {
            let evalResult = eval(currentOperation.textContent);
            if (typeof evalResult === "number" && !Number.isInteger(evalResult)) {
                evalResult = evalResult.toFixed(2);
            }
            currentOperation.textContent = evalResult;
            calculationCompleted = true;
        } catch (evalError) {
            currentOperation.textContent = SPECIAL_KEYS.ERROR;
        }
    };

    const appendToOperation = (text) => {
        if (currentOperation.textContent === SPECIAL_KEYS.ERROR) {
            currentOperation.textContent = text;
            calculationCompleted = false;
        } else if (calculationCompleted && text.match(/[0-9]/)) {
            currentOperation.textContent = text;
            calculationCompleted = false;
        } else if (calculationCompleted && !text.match(/[0-9]/)) {
            currentOperation.textContent += text;
            calculationCompleted = false;
        } else {
            if (currentOperation.textContent === "0") {
                currentOperation.textContent = text;
            } else {
                currentOperation.textContent += text;
            }
        }
    };

    const handleInput = (input) => {
        if (input === SPECIAL_KEYS.CLEAR) {
            clearOperation();
        } else if (input === SPECIAL_KEYS.BACKSPACE) {
            backspaceOperation();
        } else if (input === SPECIAL_KEYS.EQUAL) {
            evaluateOperation();
        } else {
            appendToOperation(input);
        }
    };

    // Event listener for button clicks
    btns.addEventListener("click", (e) => {
        if (e.target.classList.contains("symbol") || e.target.classList.contains("number")) {
            try {
                handleInput(e.target.textContent);
            } catch (error) {
                console.log(error);
            }
        }
    });

    // Event listener for keyboard input
    document.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key >= "0" && key <= "9" || ["+", "-", "*", "/", ".", "Enter", "Backspace", "Escape"].includes(key)) {
            e.preventDefault(); // Prevent default action for certain keys
            let input;
            switch (key) {
                case "Enter":
                    input = SPECIAL_KEYS.EQUAL;
                    break;
                case "Backspace":
                    input = SPECIAL_KEYS.BACKSPACE;
                    break;
                case "Escape":
                    input = SPECIAL_KEYS.CLEAR;
                    break;
                default:
                    input = key;
            }
            try {
                handleInput(input);
            } catch (error) {
                console.log(error);
            }
        }
    });
});
