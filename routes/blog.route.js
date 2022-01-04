const express = require("express");
const multer = require("../conf/multer");
const cors = require("cors");
const { protect } = require("../middleware/auth")

const BlogController = require("../controllers/blog.controller");

// creates a new router instance
const router = express.Router();

// router

router.post("/blogs", multer.single("blogImage"), protect, cors(), BlogController.postNewBlog);
router.get("/blogs", protect, BlogController.getAllBlog);
router.get("/blogs/:id", protect, BlogController.getBlogByID);
router.put("/blogs/:id", protect, BlogController.updateBlog);
router.patch("/blogs/like", protect, BlogController.likeBlog);
router.patch("/blogs/unlike", protect, BlogController.unlikeBlog);
router.delete("/blogs/:id", protect, BlogController.deleteBlog);

module.exports = router;
