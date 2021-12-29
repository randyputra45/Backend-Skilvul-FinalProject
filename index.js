const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
dotenv.config();

const express = require("express");

const authRoutes = require("./routes/auth.route");
const blogRoutes = require("./routes/blog.route");
const categoryRoutes = require("./routes/category.route");
const psikologRoutes = require("./routes/psikolog.route");
const userRoutes = require("./routes/user.route")
const db = require("./helpers/db");

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

//upload Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "hello.jpeg");
  },
});
const upload = multer({ storage: storage });

async function main() {
  try {
    // memastikan database connect baru jalankan app
    await db.openDBConnection(uri);
    const app = express();

    app.use(express.json()); // agar kita bisa ambil request body json
    app.use("/images", express.static(path.join(__dirname, "/images")));

    app.use(psikologRoutes);
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(blogRoutes);
    app.use(categoryRoutes);
    app.use(psikologRoutes);

    // upload image route
    app.post("/upload", upload.single("file"), (req, res) => {
      res.status(200).json("File has been uploaded");
    });

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.log("main", error);
  }
}

main();
