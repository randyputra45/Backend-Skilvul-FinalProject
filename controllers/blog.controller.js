const BlogModel = require("../models/blog.model");
const UserModel = require("../models/user.model");

const cloudinary = require("../conf/cloudinary");

class BlogController {
  // POST
  static async postNewBlog(req, res) {
    let upload = cloudinary.uploader.upload(req.file.path);
    try {
      upload.then((resultUpload) => {
        const newBlog = new BlogModel();
        newBlog.title = req.body.title;
        newBlog.content = req.body.content;
        newBlog.author = req.body.author;
        newBlog.categories = req.body.categories;
        newBlog.image = resultUpload.secure_url;
        newBlog.cloudinary = resultUpload.public_id;
  
        const saved = newBlog.save();
        res.status(201).json({
          message: "New blog added",
          blog: saved,
        });
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: error });
    }
  }

  //GET ALL
  static async getAllBlog(req, res) {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await BlogModel.find({ username });
      } else if (catName) {
        posts = await BlogModel.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await BlogModel.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //GET BY ID
  static async getBlogByID(req, res) {
    try {
      const post = await BlogModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // UPDATE
  static async updateBlog(req, res) {
    let upload = cloudinary.uploader.upload(req.file.path);

    try {
      const id = req.params.id;
      const title = req.body.title;
      const content = req.body.content;
      const categories = req.body.categories;
      const author = req.body.author;

      const post = await BlogModel.findById(req.params.id);
      
      upload.then((resultUpload) => {
        post.image = resultUpload.secure_url;
        post.cloudinary = resultUpload.public_id;
      }).then(() => {
        BlogModel.updateOne(
          { _id: id },
          { 
              title: title, 
              content: content,
              categories: categories,
              author: author,
              image: post.image,
              cloudinary: post.cloudinary
          }
        );
        res.status(200).json(post);
        }
      )
    
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  // DELETE
  static async deleteBlog(req, res) {
    try {
      const post = await BlogModel.findById(req.params.id);
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

  static async likeBlog(req, res) {
    const { id_blog, id_user } = req.body;

    try {
      return BlogModel.findOne(
        { _id: id_blog },
        (err, resultBlog) => {
          if (err) {
            res.status(404);
            console.log("ERROR BLOG", err);
          } else {
            const payload = {
              total_likes: resultBlog.total_likes + 1,
            };
            return UserModel.findOne(
              { _id: id_user },
              (err, resultUser) => {
                if (err) {
                  console.log(err);
                } else {
                  const isLiked =
                    resultUser.liked_blog.includes(id_blog);
                  if (!isLiked) {
                    return UserModel.findOneAndUpdate(
                      { _id: id_user },
                      {
                        $push: { liked_blog: id_blog },
                      },
                      { new: true, upsert: true },
                      (err, userUpdate) => {
                        if (err) throw err;
                        res.status(201).json(userUpdate);
                        console.log(userUpdate);
                        return BlogModel.findOneAndUpdate(
                          { _id: id_blog },
                          payload,
                          (err, resultLike) => {
                            if (err) {
                              res.status(404);
                              console.log(
                                "ERROR BLOG",
                                err
                              );
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
              }
            );
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async unlikeBlog(req, res) {
    const { id_blog, id_user } = req.body;

    try {
      return BlogModel.findOne(
        { _id: id_blog },
        (err, resultBlog) => {
          if (err) {
            res.status(404);
            console.log("ERROR BLOG", err);
          } else {
            const payload = {
              total_likes:
                resultBlog.total_likes === 0
                  ? resultBlog.total_likes
                  : resultBlog.total_likes - 1,
            };
            return UserModel.findOne(
              { _id: id_user },
              (err, resultUser) => {
                if (err) {
                  console.log(err);
                } else {
                  const isLiked =
                    resultUser.liked_blog.includes(id_blog);
                  if (isLiked) {
                    return UserModel.findOneAndUpdate(
                      { _id: id_user },
                      {
                        $pull: { liked_blog: id_blog },
                      },
                      { new: true, upsert: true },
                      (err, userUpdate) => {
                        if (err) throw err;
                        res.status(201).json(userUpdate);
                        console.log(userUpdate);
                        return BlogModel.findOneAndUpdate(
                          { _id: id_blog },
                          payload,
                          (err, resultLike) => {
                            if (err) {
                              res.status(404);
                              console.log(
                                "ERROR BLOG",
                                err
                              );
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
              }
            );
          }
        }
      );
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

module.exports = BlogController;
