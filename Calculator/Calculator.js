const crypto = require('crypto');

// Function to generate random number of specified length
function generateRandomNumber(length) {
  if (!length) {
    console.log("Provide length for random number generation.");
    return;
  }
  return crypto.randomBytes(length).toString('binary');
}

// Function to perform addition
function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

// Function to perform subtraction
function sub(a, b) {
  return parseFloat(a) - parseFloat(b);
}

// Function to perform multiplication
function mult(a, b) {
  return parseFloat(a) * parseFloat(b);
}

// Function to perform division
function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}

// Function to calculate sine
function sin(a) {
  return Math.sin(parseFloat(a));
}

// Function to calculate cosine
function cos(a) {
  return Math.cos(parseFloat(a));
}

// Function to calculate tangent
function tan(a) {
  return Math.tan(parseFloat(a));
}

// Main function to handle the operations
function main() {
  const args = process.argv.slice(2);
  const operation = args[0];
  
  switch (operation) {
    case 'add':
      console.log(add(args[1], args[2]));
      break;
    case 'sub':
      console.log(sub(args[1], args[2]));
      break;
    case 'mult':
      console.log(mult(args[1], args[2]));
      break;
    case 'divide':
      console.log(divide(args[1], args[2]));
      break;
    case 'sin':
      console.log(sin(args[1]));
      break;
    case 'cos':
      console.log(cos(args[1]));
      break;
    case 'tan':
      console.log(tan(args[1]));
      break;
    case 'random':
      console.log(generateRandomNumber(parseInt(args[1])));
      break;
    default:
      console.log("Invalid operation. Use: add, sub, mult, divide, sin, cos, tan, random");
  }
}

// Execute the main function
main();
