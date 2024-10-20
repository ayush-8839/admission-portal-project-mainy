const UserModel = require("../../models/user");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  static displayStudent = async (req, res) => {
    try {
      const data = await UserModel.find();
      // console.log(data);

      res.render("admin/displayStudent", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static deletestudent = async (req, res) => {
    try {
      // console.log(req.params.id);
      const id = req.params.id;

      const data = await UserModel.findByIdAndDelete(id);

      res.redirect("/admin/displayStudent");
    } catch (error) {
      console.log(error);
    }
  };

  static viewstudent = async (req, res) => {
    try {
      const id = req.params.id;

      const data = await UserModel.findById(id);
      // console.log(data);
      res.render("admin/viewstudent", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static editstudent = async (req, res) => {
    try {
      const id = req.params.id;

      const data = await UserModel.findById(id);
      // console.log(data);
      res.render("admin/editstudent", { d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static studentInsert = async (req, res) => {
    try {
        const {name,email,password} = req.body
        await UserModel.create({
          name,
          email,
          password
        })
        res.redirect('/admin/displayStudent')
    } catch (error) {
      console.log(error);
    }
  };

  static studentUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password } = req.body;
      await UserModel.findByIdAndUpdate(id, {
        name,
        email,
        password,
      });
      res.redirect("/admin/displaystudent");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = AdminController;
