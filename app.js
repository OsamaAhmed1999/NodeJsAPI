const express = require('express')
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

app.use(bodyParser.json())
app.use(expressValidator());
app.use(cookieParser())

app.get('/', postRoutes)
app.post('/createpost', postRoutes)
app.get('/getdata',postRoutes)
app.delete('/deleteData/:stu_id',postRoutes)


app.post('/signup', authRoutes)
app.post('/signin', authRoutes)
app.get('/signout', authRoutes)

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized"});
    }
  });

const port = 8080
app.listen(port, ()=>{
    // console.log('express: ${port}');
});












// const helper = require("./helpers");
// const http = require('http')

// const server = http.createServer((req, res) => {
//     res.end("Hello World from Osama")

// });

// server.listen(3000);

// const total = helper.sum(20,30);
// console.log("Total: ", total);