# Terminal Calculator

A simple terminal-based calculator built with Node.js and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the calculator:
```bash
npm run dev
```

## Available Commands

- `npm run dev` - Run the calculator in development mode (using ts-node)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled JavaScript version

## Project Structure

```
CAL/
├── src/
│   └── calculator.ts    # Main calculator code
├── dist/                # Compiled JavaScript (generated after build)
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## How to Use

1. Run `npm run dev`
2. Choose an operation: `+`, `-`, `*`, or `/`
3. Enter two numbers when prompted
4. See the result!
5. Type `q` to quit

## Example

```
=== Terminal Calculator ===

Available operations:
  + (addition)
  - (subtraction)
  * (multiplication)
  / (division)
  q (quit)

Enter operation (+, -, *, /, or q to quit): +
Enter first number: 10
Enter second number: 5

Result: 10 + 5 = 15
```

