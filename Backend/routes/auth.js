const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSignature = "helloFriends!ChaiPeelo";

// Route-1 : create user via : POST "/api/auth/createuser" . doesn't require auth./login.

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password", "Enter a valid pswd min. 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    // check whether user with the following email id exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwtSignature);
      // console.log(authToken);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some Error Occured.");
    }
  }
);

// Route-2 : authenticate/logging in user via : POST "/api/auth/login" . doesn't require auth.
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Enter a valid pswd min. 5 char")
      .isLength({ min: 5 })
      .exists(),
  ],
  async (req, res) => {
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({success, error: "Try to login with correct Email/Password." });
      }
      //  comparing user entered pswd during login with the hashed one stored in DB during user creation.
      const pswdCompare = await bcrypt.compare(password, user.password);

      if (!pswdCompare) {
        return res
          .status(400)
          .json({ success , error: "Try to login with correct Email/Password." });
      }

      const data = {
        user: {
          id: user.id,
        }
      };

      const authToken = jwt.sign(data, jwtSignature);
      success = true;
      console.log("user login granted")
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(400).send("Some Error Occured.");

    }
  }
);

// Route-3 : get logged in user details via : POST "/api/auth/getuser" . requires auth/log in.

router.post(
  "/getuser",
  fetchUser ,
  [
    body("email").isEmail(),
    body("password", "Enter a valid pswd min. 5 char")
      .isLength({ min: 5 })
      .exists(),
  ],
  async (req, res) => {

try{
 
  // as we are using fetchUser middleware so the details of the user is stored in req.user .
  // hence we are getting the user id by dot operator (req.user.id)

  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);

}catch (error) {
  console.error(error.message);
  res.status(400).send("Some Error Occured.");

}
  });


module.exports = router;
