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
    
    let data = {
           Name: req.body.Name,
           User_id : req.body.User_id,
           Email: req.body.Email,
           Password: req.body.Password,
           Salt: req.body.Salt
    };

    // Insert Data into Table
    let sql = "insert into User SET ?";
    con.query(sql , data , (err , result) => {
       if(err){
           return res.status(400).json({
               error : err
           });
        }
        else{
           res.status(200).json({
               post : result
           });
       }
   });
};

// Get Post
exports.getpost = (req , res)=>
{
    // Search in Table
    let sql = "select * from User"
    con.query(sql , (err,rows , feilds)=>{
        if(err)throw err
        res.send(rows)
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