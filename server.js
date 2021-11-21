// Imported modules from node_modules
import express from "express";
import fileUpload from "express-fileupload";


// Imported modules from files
import router from './src/routes/router.js'


// the core of express app
let app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(fileUpload())


// midllewares
app.use('/info', router)


// app port
app.listen(3000 || process.env.PORT , ()=>{
    console.log('le serveur est demarer sur le port:'+3000||process.env.PORT);
})