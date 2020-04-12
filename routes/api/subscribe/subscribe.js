require('dotenv').config()
const router = require("express").Router();
const sgMail= require("@sendgrid/mail")
const auth =require('../../../middleware/auth')
const Users= require("../../../Models/User")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

router.get("/api/users/subs",auth, async (req,res)=>{

    try {
        console.log("ïn subs confirmation")
        console.log("we got",req.user.id)
        const user = await Users.findById(req.user.id)
        user.emailVerified=true
        user.save()
        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json([{msg:"no user found"}])
    }
})



router.post("/api/users/subs", async (req, res) => {
  try {
    const { email, verificationToken } = req.body;

    const msg = {
      to: email,
      from: "betatech4u@gmail.com",
      subject: "Thank you for visiting us",
      text: "hello",
      html:
        `<strong>Hey! thank you for Verificating your email here is your verification code: ${verificationToken} . Copy it and paste it to verify</strong>`,
    };

    console.log("sending email to ",email);
    sgMail.send(msg, (err, json) => {
      if (err) {
            return res.status(400).json({ msg: "Problem Sending Email!" });
      }
      return res.status(200).json({ msg: "Email sent" });
    });
  } catch (error) {
      console.log("error in sending email",error)
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
