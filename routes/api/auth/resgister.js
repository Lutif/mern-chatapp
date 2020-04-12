const express = require("express");
const Users = require("../../../Models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const randomstring = require("randomstring");
 
//@route api/users
//@method POST
//@access Public
//desc Register a user

router.post("/api/users", 
[check("name","Enter your name").not().isEmpty(),
check("email","Enter a valid email").isEmail(),
check("password","Password must be six digits").isLength({min:6})
], async (req, res) => {
  try {
    const err= validationResult(req)
    if (!err.isEmpty()){
        return res.status(400).json(err.array())
    }
    let { name, password, email } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const avatar = gravatar.url(email, {
        s: "200",
        d: "mm",
        r: "pg"
      });

    password = await bcrypt.hash(password, 10);
    const newUser = await new Users({
        name,
        email,
        password,
        avatar,
        verificationToken: randomstring.generate()

    })

    await newUser.save()

    const payload={user:{id:newUser.id}}

    jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"2d"},(err,token)=>{
        if (err){
            return res.status(500).send({msg:"can not generate token"})
        }
        res.status(201).json({token})
    })


  } catch (err) {
    console.error(err)
    res.status(500).json([{msg:"server error"}])
  }
});

module.exports = router;
