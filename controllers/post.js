const formidable = require('formidable')
const fs = require('fs')

///  Set Database
var sql = require('mysql');

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql"
});

///  Connect Database
con.connect(function(err){
    if(err) throw err;
    console.log("Database connected...")
});

// Check Get Post
exports.checkgetPost = (req, res) => {
    res.end("Hello from check post");
}; 

// Create Post
exports.createpost = (req , res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image will not be uploaded"
            })
        }
        PhotoData = null
        if(files.Photo){
            PhotoData = fs.readFileSync(files.Photo.path)
        }
        req.profile[0].Salt = undefined
        req.profile[0].Password = undefined
        console.log()
        let data = {
            Title: fields.Title,
            Body: fields.Body,
            PostedBy: JSON.stringify(req.profile[0]),
            Photo: PhotoData
        };
    
        let sql = "insert into Posts SET ?";
        con.query(sql , [data] , (err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
            }
            else{
            res.status(200).json(data);
        }
        });
    })
};

// Get Post
exports.getpost = (req , res)=>
{
    let sql = "select Post_id, Title, Body, PostedBy`Name` from Posts"
    con.query(sql , (err, rows)=>{
        if(err)throw err
        else{
            res.send(rows)
        }
        
    })
    
}

// Delete Post
exports.deleteData = (req , res)=>
{
    // Delete Data From Table
    let sql = `DELETE FROM User WHERE stu_id = ${req.params.stu_id}`
    con.query(sql , [req.params.stu_id] ,(err, rows, feilds) => {
        if(err)throw err;
        res.send()
    })
}