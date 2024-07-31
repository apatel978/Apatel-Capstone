const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password is required'),
    handleValidationErrors
];

router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    let errors = {};

    let userCheck = await User.findAll({
      attributes: ['email', 'username']
    });

    for (let i = 0; i < userCheck.length; i++) {
      let existingUser = userCheck[i];
      if (existingUser.email === email) {
        // res.status(500);
        // return res.json({
        //   message: "User already exists",
        //   errors: {
        //     email: "User with that email already exists"
        //   }
        // })
        errors.email = "User with that email already exists"
      };

      if (existingUser.username === username) {
        // res.status(500);
        // return res.json({
        //   message: "User already exists",
        //   errors: {
        //     username: "User with that username already exists"
        //   }
        // })
        errors.username = "User with that username already exists"
      }
    };

    if (Object.keys(errors).length) {
      res.status(500);
      return res.json({
        message: "User already exists",
        errors: errors
      })
    }

    if (!email) {
      errors.email = "Invalid email";
    };

    if (!username) {
      errors.username = "Username is required";
    };

    if (!firstName) {
      errors.firstName = "First Name is required";
    };

    if (!lastName) {
      errors.lastName = "Last Name is required";
    };

    if (Object.keys(errors).length !== 0) {
      res.status(400);
      return res.json({
        message: "Bad Request",
        errors: errors
      })
    }

    const user = await User.create({ firstName, lastName, email, username, hashedPassword});

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    };

    setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

module.exports = router
