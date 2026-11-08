const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Postman / server-side requests ka origin nahi hota
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS: origin allowed nahi hai"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({ success: true, message: "Portfolio API chal rahi hai" })
);

app.get("/api/v1/health", (req, res) =>
  res.json({ success: true, uptime: process.uptime() })
);

app.use("/api/v1", routes);

// Yeh dono hamesha SABSE AAKHIR me
app.use(notFound);
app.use(errorHandler);

module.exports = app;
