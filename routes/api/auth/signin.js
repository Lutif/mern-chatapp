const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../../../Models/User");

//@route /api/auth
//@methos POST
//@access Public
//@desc  login user

router.post(
  "/api/auth",
  [
    check("email", "enter valid email").isEmail(),
    check("password", "password must be atleast six digits").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(err.array());
      }
      const { email, password } = req.body;
      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(400).json([{ msg: "Invalid credentials" }]);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json([{ msg: "Invalid credentials" }]);
      }

      const payload = { user: { id: user.id } };

      const token = jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json([{ msg: "server error" }]);
        }
        return res.status(200).json({ token });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json([{ msg: "server error" }]);
    }
  }
);

module.exports = router;
