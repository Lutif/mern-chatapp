const express = require("express");
const User= require('../../../Models/User')
const router = express.Router();
const auth =require('../../../middleware/auth')

//@route    /api/users/me
//@mehtod  GET
//@access  private
//@desc     get users own data


router.get("/api/users/me",[auth], async (req, res) => {

try {
    const userid= req.user.id
    const user= await User.findById(userid).select('-password')
    if (!user){
        return res.status(401).json([{msg:"no user found"}])
    }
    res.status(200).json(user)
} catch (err) {
    console.error(err)
    res.status(500).json([{msg:"no user found"}])
}

});


module.exports= router