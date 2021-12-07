// Imported modules from node_modules
import fileUpload from "express-fileupload";
import session from "express-session";
import handler from './src/middlewares/handler.js'
import authent from "./src/middlewares/authent.js";
// Imported modules from files
import router from './src/routes/router.js'


// the core of express app
let app = express()
app.set('view engine', 'ejs')


// midllewares
// Express public file
app.use(express.static('public'))

// Express forms control
app.use(express.json()) // for parsing application/json

// Express Encoded
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Express file control(upload)
app.use(fileUpload())

// Session control 
 app.use(session({
     secret: "aazaezezeaeaz",
     resave: false,
     saveUninitialized: true,
     cookie: {secure: false}
 }))  

// // User erros on pages
 app.use(handler.userErrors)

// // save session
 app.use(authent.sessionRegistry)

//Route default
app.use('/info', router)  

// // System erros
 app.use(handler.systemErrorHandler)

// // Not found errors
 app.use(handler.notFoundHandler)
//


// app port
app.listen(3000 || process.env.PORT)

