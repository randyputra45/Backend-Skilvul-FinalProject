const CoachingModel = require("../models/coaching.model");

const cloudinary = require("../conf/cloudinary");

class CoachingController {
  //post
  static async postNewCoaching(req, res) {
    let upload = cloudinary.uploader.upload(req.file.path);
    try {
      upload.then((resultUpload) => {
        const newCoaching = new CoachingModel();
        newCoaching.materials = req.body.materials;
        newCoaching.content = req.body.content;
        newCoaching.coach = req.body.coach;
        newCoaching.categories = req.body.categories;
        newCoaching.image = resultUpload.secure_url;
        newCoaching.cloudinary = resultUpload.public_id;

        const saved = newCoaching.save();
        res.status(201).json({
          message: "New Coaching added",
          coaching: saved,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: error });
    }
  }

  //get all
  static async getAllCoaching(req, res) {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await CoachingModel.find({ username });
      } else if (catName) {
        posts = await CoachingModel.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await CoachingModel.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //GET BY ID
  static async getCoachingByID(req, res) {
    try {
      const post = await CoachingModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // UPDATE
  static async updateCoaching(req, res) {
    let upload = cloudinary.uploader.upload(req.file.path);

    try {
      const id = req.params.id;
      const materials = req.body.materials;
      const content = req.body.content;
      const categories = req.body.categories;
      const coach = req.body.coach;

      const post = await CoachingModel.findById(req.params.id);

      upload
        .then((resultUpload) => {
          post.image = resultUpload.secure_url;
          post.cloudinary = resultUpload.public_id;
        })
        .then(() => {
          CoachingModel.updateOne(
            { _id: id },
            {
              materials: materials,
              content: content,
              categories: categories,
              coach: coach,
              image: post.image,
              cloudinary: post.cloudinary,
            }
          );
          res.status(200).json(post);
        });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  // DELETE
  static async deleteCoaching(req, res) {
    try {
      const post = await CoachingModel.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          await post.delete();
          res.status(200).json("delete success");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
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

module.exports = CoachingController;
