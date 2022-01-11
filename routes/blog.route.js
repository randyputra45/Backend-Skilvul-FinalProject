const express = require("express");
const multer = require("../conf/multer");
const cors = require("cors");
const { protect } = require("../middleware/auth")

const BlogController = require("../controllers/blog.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/blogs", multer.single("image"), cors(), BlogController.postNewBlog);
router.get("/blogs", cors(), BlogController.getAllBlog);
router.get("/blogs/:id", cors(), BlogController.getBlogByID);
router.put("/blogs/:id", multer.single("image"), cors(), BlogController.updateBlog);
router.patch("/blogs/like", cors(), BlogController.likeBlog);
router.patch("/blogs/unlike", cors(), BlogController.unlikeBlog);
router.delete("/blogs/:id", protect, BlogController.deleteBlog);

module.exports = router;
