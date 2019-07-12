const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    res.send("User route");
  }
);

module.exports = router;
