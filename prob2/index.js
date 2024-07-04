const fs=require("fs")

fs.writeFileSync("./text.txt","new content") // iske niche text ko add krne ke liye append childSync ka use karenge

fs.appendFileSync("text.txt"," and become a full stack developer")   // append data synchronously
// const data=fs.appendFileSync("text.txt"," and become a full stack developer")

const output=fs.readFileSync("text.txt")
const output2=fs.renameSync("text.txt","newtext.txt")  // rename krne ka trika 
// const ans =output.toString()
// const ans=fs.writeFileSync("text.txt","")  // text ko delete krne ka trika
console.log(output2)

