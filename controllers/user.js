const _ = require('lodash')
var sql = require('mysql');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto')
const fs = require('fs')
const formidable = require("formidable")

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql"
});

exports.userById = (req, res, next, id) => {
    let sql = `SELECT * FROM User WHERE User_id = ?`;
    con.query(sql, [id], (err, result)=> {
        if (err || result == ""){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = result
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile.User_id === req.auth.User_id
    if(!authorized){ 
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
}

// Get All User
exports.allUsers = (req, res) => {
    let sql = "select Name, User_id, Email, Creation_Date from User"
    con.query(sql , (err , result)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(result)
    })
}

// Get Single User
exports.getUser = (req, res) => {
    req.profile[0].Salt = undefined
    req.profile[0].Password = undefined
    return res.json(req.profile)
}

// Update User
exports.updateUser = (req, res, next) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Photo could not found"
            })
        }
        let user = req.profile[0]
        if(req.body.Password && req.body.Password !== ""){
            pass_salt = set_pass(req.body.Password)
            req.body.Password = pass_salt.hashed_password
            req.body.Salt = pass_salt.salt
        }
        user = _.extend(user, fields)
        user.image = null
        if(files.photo){
            user.image = fs.readFileSync(files.photo.path)
        }

        let data = { 
            Name: user.Name,
            Email: user.Email,
            Password: user.Password,
            Salt: user.Salt,
            image: user.image,
            Creation_Date: new Date()
        }

        let sql = `UPDATE User SET ? WHERE User_id = ${user.User_id}`
        con.query(sql, [data], (err , result) => {
            if(err){
                return res.status(400).json({
                    error : "You are not authorized to perform this action"
                });
            }
            user.Password = undefined
            user.Salt = undefined
            res.json({user})
        });
    })
}

// Update User Previous
// exports.updateUser = (req, res, next) =>{
//     let user = req.profile[0]

//     if(req.body.Password && req.body.Password !== ""){
//         pass_salt = set_pass(req.body.Password)
//         req.body.Password = pass_salt.hashed_password
//         req.body.Salt = pass_salt.salt
//     }

//     user = _.extend(user, req.body)
//     date = new Date

//     let sql = `UPDATE User SET 
//     Name = '${user.Name}',
//     Email = '${user.Email}',
//     Password = '${user.Password}',
//     Salt = '${user.Salt}'
//     WHERE User_id = ${user.User_id}`;

//     con.query(sql, (err , result) => {
//         if(err){
//             return res.status(400).json({
//                 error : "You are not authorized to perform this action"
//             });
//         }
//         user.Password = undefined
//         user.Salt = undefined
//         res.json({user})
//     });
// }

// User Photo
exports.userPhoto = (req, res, next) => {
//     var message = '';
//     var sql=`SELECT * FROM user WHERE id=${req.profile[0].User_id}`; 
//     db.query(sql, function(err, result){
// 	  if(err)
// 	    message = "Profile not found!";
// 	  else
//       return res.render({data:result, message: message});
//    });
//    next()
}


// Delete Users
exports.deleteUser = (req, res, next) =>{
    let user = req.profile[0]
    let sql = `DELETE FROM User WHERE User_id = ${user.User_id}`;
    con.query(sql, (err , result) => {
        if(err){
            return res.status(400).json({
                error : err
            });
        }
        res.json({message: "User deleted successfully"})
    });
}

function set_pass(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = encryptPassword(password)
    return {hashed_password, salt}

}

function encryptPassword(password){
    if(!password) return ""
    try{
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err){
        return ""
    }
}