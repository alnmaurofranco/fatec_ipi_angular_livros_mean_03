const express = require("express");
const cors = require("cors");
const { router } = require("./routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

module.exports = { app };
