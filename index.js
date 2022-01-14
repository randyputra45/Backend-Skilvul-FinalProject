const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
dotenv.config();

const errorHandler = require("./middleware/error");
const db = require("./helpers/db");

const authRoutes = require("./routes/auth.route");
const blogRoutes = require("./routes/blog.route");
const paketRoutes = require("./routes/paket.route");
const psikologRoutes = require("./routes/psikolog.route");
const userRoutes = require("./routes/user.route");
const consultationRoutes = require("./routes/payment-consultation.route");
const webinarRoutes = require("./routes/webinar.route");
const testRoutes = require("./routes/health-test.route");
const screeningRoutes = require("./routes/screening.route");
const paymentCoachingRoutes = require("./routes/payment-coaching.route");
const paymentWebinarRoutes = require("./routes/payment-webinar.route");
const paymentDyslexiaRoutes = require("./routes/payment-dyslexia.route");
const coachingRoutes = require("./routes/coaching.route");
const dyslexiaRoutes = require("./routes/dyslexia.route");

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
    app.use(paketRoutes);
    app.use(psikologRoutes);
    app.use(consultationRoutes);
    app.use(webinarRoutes);
    app.use(testRoutes);
    app.use(screeningRoutes);
    app.use(coachingRoutes);
    app.use(dyslexiaRoutes);
    app.use(paymentCoachingRoutes);
    app.use(paymentWebinarRoutes);
    app.use(paymentDyslexiaRoutes);

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
