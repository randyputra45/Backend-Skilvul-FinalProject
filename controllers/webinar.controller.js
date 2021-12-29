const WebinarModel = require("../models/webinar.model");

class WebinarController {
  static async createNewWebinar(req, res) {
    // todo: get `name` from req body
    // create a new artis object
    // save to db
    try {
      const newWebinar = new WebinarModel(req.body);
      const saved = await newWebinar.save();
      res.status(201).json({
          message: "New webinar added",
          webinar: saved
      });
    } catch (error) {
      res.status(500).send({ err: error });
      console.log(error)
    }
  }

  static async getAllWebinar(req, res) {
    try {
      const webinarList = await WebinarModel.find();
      res.status(200).send(webinarList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getWebinarByID(req, res) {
    try {
      const id = req.params.id;

      const webinarList = await WebinarModel.findOne({
        _id: id,
      });
      res.status(200).send(webinarList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateWebinar(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      const webinarList = await WebinarModel.updateOne(
        { _id: id },
        { 
            title: body.title, 
            thubmnail: body.thubmnail,
            description: body.description,
            url_webinar: body.url_webinar,
            psikolog: body.psikolog 
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteWebinar(req, res) {
    try {
      const id = req.params.id;
      await WebinarModel.deleteOne({ _id: id });
      res
        .status(200)
        .send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = WebinarController;
