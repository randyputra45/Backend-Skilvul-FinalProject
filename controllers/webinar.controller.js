const WebinarModel = require("../models/webinar.model");

class WebinarController {
  static async postNewWebinar(req, res) {
    // todo: get `name` from req body
    // create a new artis object
    // save to db
    try {
      const newWebinar = new WebinarModel(req.body);
      const saved = await newWebinar.save();
      res.status(201).json({
        message: "New webinar added",
        webinar: saved,
      });
      res.status(201).send(saved);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllWebinar(req, res) {
    try {
      const webinarList = await WebinarModel.find().populate({
        path: "psikolog",
      });
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
      }).populate({
        path: "psikolog",
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
          thumbnail: body.thumbnail,
          description: body.description,
          url_webinar: body.url_webinar,
          psikolog: body.psikolog,
          day: body.day,
          date: body.date,
          price: body.price
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
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  // LIKE
  static async likeWebinar(req, res) {
    const { id_webinar, id_user } = req.body;

    try {
      return WebinarModel.findOne({ _id: id_webinar }, (err, resultWebinar) => {
        if (err) {
          res.status(404);
          console.log("ERROR BLOG", err);
        } else {
          const payload = {
            total_likes: resultWebinar.total_likes + 1,
          };
          return UserModel.findOne({ _id: id_user }, (err, resultUser) => {
            if (err) {
              console.log(err);
            } else {
              const isLiked = resultUser.liked_webinar.includes(id_webinar);
              if (!isLiked) {
                return UserModel.findOneAndUpdate(
                  { _id: id_user },
                  {
                    $push: { liked_webinar: id_webinar },
                  },
                  { new: true, upsert: true },
                  (err, userUpdate) => {
                    if (err) throw err;
                    res.status(201).json(userUpdate);
                    console.log(userUpdate);
                    return WebinarModel.findOneAndUpdate(
                      { _id: id_webinar },
                      payload,
                      (err, resultLike) => {
                        if (err) {
                          res.status(404);
                          console.log("ERROR BLOG", err);
                        }
                      }
                    );
                  }
                );
              } else {
                res.status(500).json({
                  message: "User already liked",
                });
              }
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // UNLIKE
  static async unlikeWebinar(req, res) {
    const { id_webinar, id_user } = req.body;

    try {
      return WebinarModel.findOne({ _id: id_webinar }, (err, resultWebinar) => {
        if (err) {
          res.status(404);
          console.log("ERROR BLOG", err);
        } else {
          const payload = {
            total_likes:
              resultWebinar.total_likes === 0
                ? resultWebinar.total_likes
                : resultWebinar.total_likes - 1,
          };
          return UserModel.findOne({ _id: id_user }, (err, resultUser) => {
            if (err) {
              console.log(err);
            } else {
              const isLiked = resultUser.liked_webinar.includes(id_webinar);
              if (isLiked) {
                return UserModel.findOneAndUpdate(
                  { _id: id_user },
                  {
                    $pull: { liked_webinar: id_webinar },
                  },
                  { new: true, upsert: true },
                  (err, userUpdate) => {
                    if (err) throw err;
                    res.status(201).json(userUpdate);
                    console.log(userUpdate);
                    return WebinarModel.findOneAndUpdate(
                      { _id: id_webinar },
                      payload,
                      (err, resultLike) => {
                        if (err) {
                          res.status(404);
                          console.log("ERROR BLOG", err);
                        }
                      }
                    );
                  }
                );
              } else {
                res.status(500).json({
                  message: "User already unliked",
                });
              }
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async storage() {
    try {
      return multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
    } catch (error) {
      res.status(500).json(err);
    }
  }

  static async uploadImage() {
    try {
      multer({ storage: storage() }).single("image");
    } catch (error) {
      res.status(500).json(err);
    }
  }
}

module.exports = WebinarController;
