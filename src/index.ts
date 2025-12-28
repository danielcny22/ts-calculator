import * as readline from 'readline';

// This creates an interface to read input from the terminal and write output to it
// Think of it as opening a conversation with the user through the terminal
const rl = readline.createInterface({
  input: process.stdin,   // stdin = standard input (what the user types)
  output: process.stdout  // stdout = standard output (what we print to the screen)
});

// This function asks the user a question and waits for their answer
// It returns a Promise, which is like a placeholder for a value we'll get later
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    // rl.question displays the question and waits for the user to type something
    // When they press Enter, it calls the function with their answer
    rl.question(question, (answer) => {
      resolve(answer); // resolve gives us the answer back
    });
  });
}

// Function to add two numbers together
function add(a: number, b: number): number {
  return a + b;
}

// Function to subtract the second number from the first
function subtract(a: number, b: number): number {
  return a - b;
}

// Function to multiply two numbers
function multiply(a: number, b: number): number {
  return a * b;
}

// Function to divide the first number by the second
// We check if the second number is zero to prevent division by zero
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero!');
  }
  return a / b;
}

// Helper function to check if a string is a valid number
// isNaN means "is Not a Number" - so !isNaN means "IS a number"
function isValidNumber(input: string): boolean {
  const num = parseFloat(input);
  return !isNaN(num); // Returns true if it's a valid number, false otherwise
}

// Helper function to check if an operation is valid
function isValidOperation(operation: string): boolean {
  return operation === '+' || operation === '-' || operation === '*' || operation === '/';
}

// Array to store calculation history
// Each calculation will be stored as a string like "5 + 3 = 8"
const calculationHistory: string[] = [];

// Helper function to check if the user wants to quit
// Returns true if they typed 'q', 'quit', or 'no' (case-insensitive)
function wantsToQuit(input: string): boolean {
  const lowerInput = input.toLowerCase().trim();
  return lowerInput === 'q' || lowerInput === 'quit' || lowerInput === 'no';
}

// Function to display all calculation history
// This prints each calculation that has been stored in the history array
function showHistory(): void {
  if (calculationHistory.length === 0) {
    // If there are no calculations yet, let the user know
    console.log('\nNo calculations in history yet.\n');
  } else {
    // Print a header and then each calculation on its own line
    console.log('\n=== Calculation History ===');
    calculationHistory.forEach((calc, index) => {
      // Show each calculation with a number (1, 2, 3, etc.)
      console.log(`${index + 1}. ${calc}`);
    });
    console.log(''); // Add a blank line at the end for spacing
  }
}

// Function to clear the calculation history
// This removes all calculations from the history array
function clearHistory(): void {
  // Remove all items from the array by setting its length to 0
  calculationHistory.length = 0;
  console.log('\nHistory cleared!\n');
}

// This function performs one calculation
// It asks for numbers and operation, then calculates and shows the result
async function performCalculation(): Promise<void> {
  // Step 1: Ask for the first number
  // We'll keep asking until we get a valid number
  let num1: number;
  while (true) {
    const num1Input = await askQuestion('Enter the first number: ');
    // Check if the input is a valid number
    if (isValidNumber(num1Input)) {
      num1 = parseFloat(num1Input); // Convert the text to a number
      break; // Exit the loop since we have a valid number
    } else {
      // Show an error message and ask again (the loop will continue)
      console.log('Error: That is not a valid number. Please try again.\n');
    }
  }

  // Step 2: Ask for the second number
  // Same process - keep asking until we get a valid number
  let num2: number;
  while (true) {
    const num2Input = await askQuestion('Enter the second number: ');
    if (isValidNumber(num2Input)) {
      num2 = parseFloat(num2Input);
      break;
    } else {
      console.log('Error: That is not a valid number. Please try again.\n');
    }
  }

  // Step 3: Ask for the operation
  // Keep asking until we get a valid operation
  let operation: string;
  while (true) {
    operation = await askQuestion('Enter the operation (+, -, *, /): ');
    if (isValidOperation(operation)) {
      break; // Exit the loop since we have a valid operation
    } else {
      // Show an error with the valid options
      console.log('Error: Invalid operation! Valid options are: +, -, *, /\n');
    }
  }

  // Step 4: Calculate the result based on which operation was chosen
  // We use a try-catch block to handle any errors that might occur (like division by zero)
  try {
    let result: number; // This variable will hold our answer

    if (operation === '+') {
      // If they chose addition, call the add function
      result = add(num1, num2);
    } else if (operation === '-') {
      // If they chose subtraction, call the subtract function
      result = subtract(num1, num2);
    } else if (operation === '*') {
      // If they chose multiplication, call the multiply function
      result = multiply(num1, num2);
    } else {
      // This should always be division since we validated the operation earlier
      // This might throw an error if dividing by zero
      result = divide(num1, num2);
    }

    // Step 5: Print the result clearly
    // We only reach here if no errors occurred
    console.log(`\nResult: ${num1} ${operation} ${num2} = ${result}\n`);
    
    // Store this calculation in the history array
    // Format: "5 + 3 = 8"
    const calculationString = `${num1} ${operation} ${num2} = ${result}`;
    calculationHistory.push(calculationString);
  } catch (error) {
    // If an error occurred (like division by zero), show the error message
    console.log(`\nError: ${error instanceof Error ? error.message : 'Something went wrong'}\n`);
  }
}

// This is the main function that runs our calculator
// The 'async' keyword lets us use 'await' to wait for user input
async function main() {
  // Handle Ctrl+C (SIGINT) gracefully
  // When the user presses Ctrl+C, we'll close the readline interface and exit
  process.on('SIGINT', () => {
    console.log('\n\nGoodbye!');
    rl.close();
    process.exit(0); // Exit the program cleanly
  });

  console.log('=== Terminal Calculator ===\n');

  // Keep running calculations until the user wants to quit
  while (true) {
    // Perform one calculation
    await performCalculation();

    // Ask if they want to calculate again, view history, or clear history
    const continueInput = await askQuestion('Calculate again? (Press Enter to continue, type "history" to view past calculations, type "clear" to clear history, or type q/quit/no to exit): ');
    
    // Check if they want to view history
    // Trim removes extra spaces, toLowerCase makes it case-insensitive
    const trimmedInput = continueInput.toLowerCase().trim();
    if (trimmedInput === 'history') {
      showHistory(); // Display all past calculations
      continue; // Go back to the start of the loop to perform another calculation
    }
    
    // Check if they want to clear history
    if (trimmedInput === 'clear') {
      clearHistory(); // Remove all calculations from history
      continue; // Go back to the start of the loop to perform another calculation
    }
    
    // Check if they want to quit
    if (wantsToQuit(continueInput)) {
      console.log('\nGoodbye!');
      break; // Exit the loop
    }
    
    // If they pressed Enter or typed anything else, we'll continue the loop
    console.log(''); // Add a blank line for spacing
  }

  // Close the readline interface when we're done
  rl.close();
}

// Start the calculator by calling the main function
main();

