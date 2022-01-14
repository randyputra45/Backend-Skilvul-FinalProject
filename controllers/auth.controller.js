const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const emailConfirmation = require('../utils/emailMessage');
const { promisify } = require('util');

class AuthController {
  static async postRegister(req, res, next) {
    // get `email, password` from req body
    // hash password
    // create a new user object
    // save to db
    const { email } = req.body
    try {
      const existingUser = await UserModel.findOne({email});
      if (existingUser) {
        return res.status(409).send({ 
          message: "Email is already in use."
        });
      }

      const user = await UserModel.create(req.body);
      const verifyToken = user.getSignedJwtToken();  
      const verifyUrl = `http://localhost:3000/verify/${verifyToken}`

      const emailMessage = {
        subject: "Verify your GoCure email address",
        title: "Activate Account",
        text: `Hey ${user.first_name}, we have received your account registration. Activate your account now by clicking on the button below. This link will expire in 7 days.`,
        buttonMessage: "Click the button below to activate your account"
      }

      try {
        res.json(await emailConfirmation.sendEmail(req.body, emailMessage, verifyUrl));
      } catch (err) {
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (error) {
      next(error)
    }
  }

  static async getVerify(req, res, next) {
    const { verifyToken } = req.params
    // Check we have an id
    if (!verifyToken) {
      console.log("No Token")
      return res.status(422).send({ 
        message: "Missing Token"
      });
    }

    // Step 1 -  Verify the token from the URL
    let payload = null
    try {
      payload = jwt.verify(
        verifyToken,
        process.env.JWT_SECRET
      );
      console.log(payload)
    } catch (err) {
      return res.status(500).send(err);
    }

    try{
      // Step 2 - Find user with matching ID
      const user = await UserModel.findOne({ _id: payload.id });
      if (!user) {
        return res.status(404).send({ 
          message: "User does not exists" 
        });
      }
      // Step 3 - Update user verification status to true
      await UserModel.updateOne(
        { email: user.email },
        { verified: true }
      );
      console.log("User verified")
      return res.status(200).send({
        message: "Account Verified"
      });
    } catch (err) {
      console.log("Error bos")
      next(err)
    }
  }

  static async postLogin(req, res, next) {
    // get `email, password` from req body
    // search email in db
    // if find compare the password
    // if matched user logged in
    const { email, password } = req.body;

    if(!email || !password) {
      if(!email) {
        return next(new ErrorResponse("Please provide an email", 400))
      } else {
        return next(new ErrorResponse("Please provide an password", 400))
      }
    }

    try {
      const user = await UserModel.findOne({
        email: email,
      });

      // Check is user exist
      if (user) {
        // Check if user verified
        if(!user.verified){
          return res.status(403).send({ 
            message: "Verify your Account." 
          });
        }
        // Check is password match
        const auth = await bcrypt.compare(
          password,
          user.password
        );
        // Send jwt token if password match
        if (auth) {
          sendToken(user, 200, req, res);
          console.log("Logged")
        } else {
          return next(new ErrorResponse("Incorrect Password"),401)
        }
      } else {
        return next(new ErrorResponse("Incorrect Email"),401)
      }
    } catch (err) {
      return next(new ErrorResponse("Account does'nt exist"),401)
    }
  }

  static async getCurrentUser(req, res, next) {
    let currentUser;
    try {
      // check if there is an jwt that stored at client cookie
      if(req.cookies.jwt){
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        currentUser = await UserModel.findById(decoded.id).populate({
          path: "liked_blog",
          model: "Blog"
        });;
      } else {
        currentUser = null;
      }
    } catch (error) {
      next(error);
    }
    // send logged user data
    res.status(200).send({ currentUser });
  }

  static async postForgotPassword(req, res, next) {
    const { email } = req.body

    try {
      const user = await UserModel.findOne({email});

      if (!user) {
        return next(new ErrorResponse("Email cound not be sent", 404))
      }

      const resetToken = user.getResetPasswordToken()
      await user.save();

      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
      const emailMessage = {
        subject: "We received a request to reset your password",
        title: "Reset Password",
        text: `Hey ${user.first_name}, we have received your password reset request. Use the link below to set up a new password for your account. This link will expire in 7 days.`,
        buttonMessage: "Click the button below to reset your password"
      }

      try {
        res.json(await emailConfirmation.sendEmail(req.body, emailMessage, resetUrl));
      } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (error) {
      next(error)
    }
  }

  static async putResetPassword(req, res, next) {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
      const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      })

      if(!user){
        return next(new ErrorResponse("Invalid Reset Token", 400))
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      // resave the new password
      await user.save()
      res.status(201).json({
        success: true,
        data: "Password Reset Success"
      })
    } catch (error) {
      next(error)
    }
  }

  static async getLogout(req, res, next) {
    try {
      res.cookie("jwt", "loggedOut", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
      })
      res.status(200).json({
        success: true,
        message: "User is logged out"
      })
    } catch (error) {
      next(error)
    }
  }
}

const sendToken = (user, statusCode, req, res) => {
  const token = user.getSignedJwtToken();

  //set token expiry to 1 month 
  let date = new Date();
  date.setDate(date.getDate() + 30)

  // cookie settings
  try {
    res.cookie('jwt', token, {
      expires: date,
      sameSite: 'strict'
      // httpOnly: true,
    });
  } catch (error) {
    console.log("cookie error")
  }

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user
    }
  })
};

module.exports = AuthController;
