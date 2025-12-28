import * as readline from 'readline';

// Create interface for readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask a question and get user input
function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Calculator operations
function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero!');
  }
  return a / b;
}

// Main calculator function
async function calculator() {
  console.log('=== Terminal Calculator ===\n');
  console.log('Available operations:');
  console.log('  + (addition)');
  console.log('  - (subtraction)');
  console.log('  * (multiplication)');
  console.log('  / (division)');
  console.log('  q (quit)\n');

  while (true) {
    try {
      const operation = await askQuestion('Enter operation (+, -, *, /, or q to quit): ');
      
      if (operation.toLowerCase() === 'q') {
        console.log('Goodbye!');
        rl.close();
        break;
      }

      if (!['+', '-', '*', '/'].includes(operation)) {
        console.log('Invalid operation! Please use +, -, *, or /.\n');
        continue;
      }

      const num1Str = await askQuestion('Enter first number: ');
      const num1 = parseFloat(num1Str);
      
      if (isNaN(num1)) {
        console.log('Invalid number! Please enter a valid number.\n');
        continue;
      }

      const num2Str = await askQuestion('Enter second number: ');
      const num2 = parseFloat(num2Str);
      
      if (isNaN(num2)) {
        console.log('Invalid number! Please enter a valid number.\n');
        continue;
      }

      let result: number;
      
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
          result = divide(num1, num2);
          break;
        default:
          throw new Error('Invalid operation');
      }

      console.log(`\nResult: ${num1} ${operation} ${num2} = ${result}\n`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`\nError: ${error.message}\n`);
      } else {
        console.log('\nAn unexpected error occurred.\n');
      }
    }
  }
}

// Start the calculator
calculator();

