
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

// --------------------------------------------------
// CORS CONFIGURATION
// --------------------------------------------------

const allowedOrigins = [
  "http://localhost:3000",

  // Production
  "https://portfolio-rahul-two-rho.vercel.app",

  // Vercel deployments
  /^https:\/\/portfolio-rahul-git-[a-z0-9-]+-rahulsharma3-9031s-projects\.vercel\.app$/,
  /^https:\/\/portfolio-rahul-[a-z0-9-]+-rahulsharma3-9031s-projects\.vercel\.app$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some((allowed) =>
        allowed instanceof RegExp
          ? allowed.test(origin)
          : allowed === origin
      );

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// --------------------------------------------------
// ROUTES
// --------------------------------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API running",
  });
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    uptime: process.uptime(),
  });
});

app.use("/api/v1", routes);

// --------------------------------------------------
// ERROR HANDLING
// --------------------------------------------------

app.use(notFound);
app.use(errorHandler);

module.exports = app;
