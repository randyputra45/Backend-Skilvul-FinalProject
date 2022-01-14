const UserModel = require("../models/user.model");

class UserController {
  static async getAllUser(req, res) {
    try {
      const userList = await UserModel.find().populate({
        path: "liked_blog",
        model: "Blog"
      });
      res.status(200).send(userList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getUserByID(req, res) {
    try {
      const id = req.params.id;

      const userList = await UserModel.findOne({
        _id: id,
      }).populate({
        path: "liked_blog",
      });
      res.status(200).send(userList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const first_name = body.first_name;
      const last_name = body.last_name;
      const email = body.email;
      const no_telp = body.no_telp;

      const userList = await UserModel.updateOne(
        { _id: id },
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          no_telp: no_telp,
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await UserModel.deleteOne({ _id: id });
      res
        .status(200)
        .send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = UserController;
