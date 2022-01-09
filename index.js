const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
dotenv.config();

const errorHandler = require("./middleware/error");
const db = require("./helpers/db");

const authRoutes = require("./routes/auth.route");
const blogRoutes = require("./routes/blog.route");
const categoryRoutes = require("./routes/category.route");
const psikologRoutes = require("./routes/psikolog.route");
const userRoutes = require("./routes/user.route");
const consultationRoutes = require("./routes/consultation.route");
const webinarRoutes = require("./routes/webinar.route");
const testRoutes = require("./routes/health-test.route");
const screeningRoutes = require("./routes/screening.route");
const paymentRoutes = require("./routes/payment.route");

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
  exposedHeaders: ["set-cookie"],
};

async function main() {
  try {
    // memastikan database connect baru jalankan app
    await db.openDBConnection(uri);
    const app = express();

    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use(express.json()); // agar kita bisa ambil request body json

    app.use(psikologRoutes);
    app.use(userRoutes);
    app.use(authRoutes);
    app.use(blogRoutes);
    app.use(categoryRoutes);
    app.use(psikologRoutes);
    app.use(consultationRoutes);
    app.use(webinarRoutes);
    app.use(testRoutes);
    app.use(screeningRoutes);
    app.use(paymentRoutes);

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
