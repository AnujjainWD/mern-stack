const express = require('express')
const connectDB = require('./db/connect_db')
const app = express()
const port = 3000
const web = require('./routes/web')
const fileUpload = require("express-fileupload");

var session = require('express-session')
var flash = require('connect-flash');
app.use(fileUpload({useTempFiles: true}));




// use for message showing
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  }));
  
  app.use(flash());
app.use(express.urlencoded({ extended: false }));



//conect db
connectDB()



app.set('view engine','ejs')
//route localhost:3000
app.use('/',web)

//static files
app.use(express.static('public'))


// console.log(express)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })