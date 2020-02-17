const express = require('express')
const router = express.Router();

const { requireSignin } = require("../controllers/auth") 
const { checkgetPost, getpost, createpost,  deleteData } = require("../controllers/post")
const { userById } = require('../controllers/user')

router.post('/createpost/new/:userId', requireSignin, createpost);
router.get("/getpost", getpost);
router.delete("/deleteData/:stu_id", deleteData);

// User Information to update
router.param("userId", userById)


module.exports = router;