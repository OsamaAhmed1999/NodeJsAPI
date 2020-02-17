const express = require('express')
const app = express();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const fs = require('fs')
const cors = require('cors')

app.use(bodyParser.json())
app.use(expressValidator());
app.use(cookieParser());
app.use(cors())

app.use('/', postRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)

app.get("/", (req, res) => {
  fs.readFile('doc/apiDocs.json', (err, data) => {
    if(err){
      res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized"});
    }
  });

app.listen(8080, ()=>{
});
