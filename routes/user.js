const express = require('express')
const router = express.Router();

const { 
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto
} = require('../controllers/user')

const { requireSignin } = require("../controllers/auth") 

router.get('/allusers', allUsers);
router.get('/getuser/:userId', requireSignin, getUser);
router.put('/getuser/:userId', requireSignin, updateUser);
router.delete('/getuser/:userId', requireSignin, deleteUser);
router.get("/user/photo/:userId", userPhoto)

router.param("userId", userById)

module.exports = router;