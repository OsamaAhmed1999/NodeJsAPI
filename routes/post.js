const express = require('express')
const router = express.Router();

const { requireSignin } = require("../controllers/auth") 
const { checkgetPost, getpost, createpost,  deleteData } = require("../controllers/post")


router.get('/', requireSignin, checkgetPost);
router.post('/createpost', createpost);
router.get("/getdata", getpost);
router.delete("/deleteData/:stu_id", deleteData);

module.exports = router;

