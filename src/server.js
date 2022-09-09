// API Essential Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const passport = require("passport");
const certs = require("./utils/certs");

// API Middlewares Imports
const mwNotFound = require("./middlewares/notFound");
const mwErrorHandler = require("./middlewares/errorHandler");

// environment initialization
dotenv.config();
certs.init();

// Local Imports
const middlewares = {
  mwNotFound,
  mwErrorHandler,
};
const { normLog, print } = require("./core/beautify");
const routes = require("./routes");

// Security
const limiter = rateLimit({
  windowMs: 1000 * 60 * 5, // 5 minutes
  max: 350, // Limit each IP to 350 requests
  message: "Too many requests, please try again later.",
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// API middlewares #NOTE: Order is important (It defines the lifecycle of the API)
const app = express();
app.use(normLog);
app.use(helmet());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(passport.initialize());
app.use(limiter);
app.use("/api/v1", routes);

const mwAuth = require("./middlewares/authentication")
mwAuth(passport);

// Root endpoint
app.get("/", (_, res) => res.json({ message: "Hello 👋✨" }));

app.use(middlewares.mwNotFound);
app.use(middlewares.mwErrorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  print(`[API] Listening: http://localhost:${port}`, "#2AA1DD");
});
