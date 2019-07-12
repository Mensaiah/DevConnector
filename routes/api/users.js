const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// @route  POST api/user
// @desc  Register user
// @access Public

router.post(
  "/",
  // Add User Validation
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please inclue a valid email").isEmail(),
    check(
      "password",
      "Please input password with a 6 or more characters"
    ).isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User registered");
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
