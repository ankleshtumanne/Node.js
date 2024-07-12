



// const fs=require("fs")

// fs.writeFileSync("./text.txt","new content") // iske niche text ko add krne ke liye append childSync ka use karenge

// fs.appendFileSync("text.txt"," and become a full stack developer")   // append data synchronously
// // const data=fs.appendFileSync("text.txt"," and become a full stack developer")


// const output2=fs.renameSync("text.txt","newtext.txt")
// const output=fs.readFile("newtext.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//     }
// })  // rename krne ka trika 
// // const ans =output.toString()
// // const ans=fs.writeFileSync("text.txt","")  // text ko delete krne ka trika
// console.log(output2)

const fs = require('fs');
const path = require('path');

// Retrieve command line arguments
const args = process.argv.slice(2);

// Ensure the correct number of arguments are passed
if (args.length < 2) {
  console.log('Usage: node index.js <operation> <file> [<new file name/content>]');
  process.exit(1);
}

// Destructure the arguments
const [operation, file, ...rest] = args;
const filePath = path.join(__dirname, file);

switch (operation) {
  case 'read':
    // Read and print the content of the file
    if (args.length !== 2) {
      console.log('Usage: node index.js read <file>');
      process.exit(1);
    }
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      }
      console.log(data);
    });
    break;

  case 'append':
    // Append content to the file
    if (args.length < 3) {
      console.log('Usage: node index.js append <content> <file>');
      process.exit(1);
    }
    const contentToAppend = rest.join(' ') + '\n';
    fs.appendFile(filePath, contentToAppend, (err) => {
      if (err) {
        console.error(`Error appending to file: ${err.message}`);
        process.exit(1);
      }
      console.log(`Content appended to the file '${file}'`);
    });
    break;

  case 'delete':
    // Delete the file
    if (args.length !== 2) {
      console.log('Usage: node index.js delete <file>');
      process.exit(1);
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        process.exit(1);
      }
      console.log(`File '${file}' deleted`);
    });
    break;

  case 'create':
    // Create a new file
    if (args.length !== 2) {
      console.log('Usage: node index.js create <file>');
      process.exit(1);
    }
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        console.error(`Error creating file: ${err.message}`);
        process.exit(1);
      }
      console.log(`File '${file}' created`);
    });
    break;

  case 'rename':
    // Rename the file
    if (args.length !== 3) {
      console.log('Usage: node index.js rename <old file> <new file>');
      process.exit(1);
    }
    const newFilePath = path.join(__dirname, rest[0]);
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.error(`Error renaming file: ${err.message}`);
        process.exit(1);
      }
      console.log(`File '${file}' renamed to '${rest[0]}'`);
    });
    break;

  case 'list':
    // List all files and directories in the current directory
    if (args.length !== 2 || file !== '.') {
      console.log('Usage: node index.js list .');
      process.exit(1);
    }
    fs.readdir(__dirname, (err, files) => {
      if (err) {
        console.error(`Error listing files: ${err.message}`);
        process.exit(1);
      }
      files.forEach(file => console.log(file));
    });
    break;

  default:
    console.log('Invalid operation. Valid operations are: read, append, delete, create, rename, list.');
    process.exit(1);
}
