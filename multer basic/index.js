const express = require('express')
const multer  = require('multer')

const app = express()
// app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  // app.use(express.json())
const upload = multer({ storage: storage })

// Serve static files (front end) from a directory, e.g., 'public'
app.use(express.static('public'));

app.post('/profile', upload.single('avatar'), function (req, res) {
    
   try {
    console.log(req.file, req.body)
    res.status(200).json({message:"file uploaded sucessfull"})
   } catch(error) {
    res.status(404).json({message:"file not found error encounterd",error: error.message })
   }
 });

 app.listen(8080,(req,res)=>{
    console.log("server started")
 })
