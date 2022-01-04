const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
dotenv.config();

const express = require("express");
const errorHandler = require("./middleware/error");
const db = require("./helpers/db");

const authRoutes = require("./routes/auth.route");
const blogRoutes = require("./routes/blog.route");
const categoryRoutes = require("./routes/category.route");
const psikologRoutes = require("./routes/psikolog.route");
const userRoutes = require("./routes/user.route");
const consultationRoutes = require("./routes/consultation.route");

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

async function main() {
  try {
    // memastikan database connect baru jalankan app
    await db.openDBConnection(uri);
    const app = express();

    app.use(cors({ credentials: true }));
    app.use(express.json()); // agar kita bisa ambil request body json

    app.use(psikologRoutes);
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(blogRoutes);
    app.use(categoryRoutes);
    app.use(psikologRoutes);
    app.use(consultationRoutes);

    app.use(errorHandler);

    // upload image route

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.log("main", error);
  }
}

main();
