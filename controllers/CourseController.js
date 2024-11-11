const CourseModel = require("../models/course");

class CourseController {
  static courseInsert = async (req, res) => {
    try {
      const { id } = req.userData;
      const { name, email, phone, dob, address, gender, education, course } =
        req.body;
      const result = await CourseModel.create({
        name,
        email,
        phone,
        dob,
        address,
        gender,
        education,
        course,
        user_id: id,
      });
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static courseDisplay = async (req, res) => {
    try {
      const { name, image, id } = req.userData;
      const course = await CourseModel.find({ user_id: id });
      res.render("course/display", { n: name, i: image, c: course });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;