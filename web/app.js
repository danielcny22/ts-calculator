// ============================================
// Calculator Functions
// ============================================
// These functions perform the basic math operations
// They are reusable and can be used anywhere in the code
// Function to add two numbers together
function add(a, b) {
    return a + b;
}
// Function to subtract the second number from the first
function subtract(a, b) {
    return a - b;
}
// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}
// Function to divide the first number by the second
// We check if the second number is zero to prevent division by zero
function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero!');
    }
    return a / b;
}
// ============================================
// History Management
// ============================================
// Array to store calculation history
// Each calculation will be stored as a string like "5 + 3 = 8"
const calculationHistory = [];
// Function to add a calculation to the history
// This is called after each successful calculation
function addToHistory(calculation) {
    calculationHistory.push(calculation);
    updateHistoryDisplay(); // Update the display whenever we add to history
}
// Function to clear all calculations from history
function clearHistory() {
    calculationHistory.length = 0; // Remove all items from the array
    updateHistoryDisplay(); // Update the display to show it's empty
}
// Function to update the history display on the page
// This reads the history array and shows it in the HTML
function updateHistoryDisplay() {
    const historyListElement = document.getElementById('historyList');
    if (calculationHistory.length === 0) {
        // If there are no calculations, show a message
        historyListElement.innerHTML = '<div class="history-empty">No calculations yet</div>';
    }
    else {
        // Create HTML for each calculation in the history
        // We use map to create a new array of HTML strings, then join them together
        const historyHTML = calculationHistory.map((calc, index) => {
            return `<div class="history-item">${index + 1}. ${calc}</div>`;
        }).join('');
        historyListElement.innerHTML = historyHTML;
    }
}
// ============================================
// Calculator Logic
// ============================================
// Function to perform a calculation based on the operation
// This takes two numbers and an operation symbol, then returns the result
function performCalculation(num1, num2, operation) {
    let result;
    // Use a switch statement to determine which operation to perform
    switch (operation) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2); // This might throw an error if dividing by zero
            break;
        default:
            throw new Error('Invalid operation');
    }
    return result;
}
// Function to handle the calculate button click
// This gets the values from the input fields and performs the calculation
function handleCalculate() {
    // Get references to the HTML input elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const resultElement = document.getElementById('result');
    // Get the values from the input fields
    // parseFloat converts the text input to a number
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    // Validate that both inputs are valid numbers
    // isNaN means "is Not a Number" - so we check if either is not a number
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = 'Error: Please enter valid numbers';
        resultElement.className = 'result error';
        return; // Exit early if inputs are invalid
    }
    // Try to perform the calculation
    // We use try-catch to handle any errors (like division by zero)
    try {
        const result = performCalculation(num1, num2, operation);
        // Format the calculation as a string for display and history
        // Example: "5 + 3 = 8"
        const calculationString = `${num1} ${operation} ${num2} = ${result}`;
        // Display the result
        resultElement.textContent = calculationString;
        resultElement.className = 'result'; // Remove error class if it was there
        // Add this calculation to the history
        addToHistory(calculationString);
    }
    catch (error) {
        // If an error occurred (like division by zero), show the error message
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
        resultElement.textContent = `Error: ${errorMessage}`;
        resultElement.className = 'result error';
    }
}
// Function to clear the input fields and result
// This is called when the user clicks the "Clear" button
function handleClear() {
    // Get references to the HTML elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const resultElement = document.getElementById('result');
    // Clear the input fields by setting their values to empty strings
    num1Input.value = '';
    num2Input.value = '';
    // Reset the result display
    resultElement.textContent = 'Result will appear here';
    resultElement.className = 'result'; // Remove error class if it was there
}
// Function to handle the clear history button click
function handleClearHistory() {
    clearHistory(); // Clear the history array
    // The updateHistoryDisplay() is already called inside clearHistory()
}
// ============================================
// Event Listeners Setup
// ============================================
// This code runs when the page loads
// It connects the buttons to their handler functions
// Wait for the page to fully load before setting up event listeners
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the buttons
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    // Connect each button to its handler function
    // When the button is clicked, the function will be called
    calculateBtn.addEventListener('click', handleCalculate);
    clearBtn.addEventListener('click', handleClear);
    clearHistoryBtn.addEventListener('click', handleClearHistory);
    // Allow users to press Enter in the number inputs to calculate
    // This makes the calculator easier to use
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    // When Enter is pressed in either input field, trigger the calculate function
    num1Input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    });
    num2Input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    });
});
