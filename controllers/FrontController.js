const UserModel = require("../models/user");
const TeacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
// const cloudinary = require('cloudinary')
const claudinary = require("cloudinary");
var jwt = require("jsonwebtoken");

//Setup
claudinary.config({
  cloud_name: "dnglhx5tt",
  api_key: "723695369565341",
  api_secret: "JUf4hz8hf6TImRqldLOkEh-I7xc",
});

class FrontController {
  static home = async (req, res) => {
    try {
      res.render("home"); // home.ejs file
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
      res.render("login", {
        message: req.flash("success"),
        msg: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", {
        message: req.flash("error"),
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };

  //// insert data

  static insertStudent = async (req, res) => {
    try {
      // console.log(req.body);
      // const { name, email, password, confirmpassword } = req.body;
      //const data = await UserModel.create({
      //name,
      //email,
      //password,
      //});
      //res.redirect("/"); /// route ** web

      const { name, email, password, confirmpassword } = req.body;
      if (!name || !email || !password || !confirmpassword) {
        req.flash("error", "alll fields are required.");
        return res.redirect("/register");
      }

      const isEmail = await UserModel.findOne({ email });
      if (isEmail) {
        req.flash("error", "Email Already Exists.");
        return res.redirect("/register");
      }
      if (password != confirmpassword) {
        req.flash("error", "password does not matched");
        return res.redirect("/register");
      }

      //console.log(req.files)
      //image Upload

      const file = req.files.image;
      const imageUpload = await claudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });

      //console.log(imageUpload);

      const hashPassword = await bcrypt.hash(password, 10);
      const data = await UserModel.create({
        name,
        email,
        password: hashPassword,
        image: {
          public_id: imageUpload.public_id,
          url: imageUpload.secure_url,
        },
      });
      req.flash("success", "Register Success  !Plz Login");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          console.log(isMatched);
          if (isMatched) {
            //token create
            let token = jwt.sign({ ID: user.id }, "hcbfvdhjfvjbcjfghcfmb");
            // console.log(token);
            res.cookie("token", token);

            res.redirect("/home");
          }
        } else {
          req.flash("error", "you are not a registered user");
          return res.redirect("/");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
