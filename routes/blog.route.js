const express = require("express");
const multer = require("../conf/multer");
const cors = require("cors");

const BlogController = require("../controllers/blog.controller");

// creates a new router instance
const router = express.Router();

// router

router.post("/blogs", multer.single("blogImage"), cors(), BlogController.postNewBlog);
router.get("/blogs", BlogController.getAllBlog);
router.get("/blogs/:id", BlogController.getBlogByID);
router.put("/blogs/:id", BlogController.updateBlog);
router.patch("/blogs/like", BlogController.likeBlog);
router.patch("/blogs/unlike", BlogController.unlikeBlog);
router.delete("/blogs/:id", BlogController.deleteBlog);

module.exports = router;
