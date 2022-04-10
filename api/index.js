import { createRequire } from "module";
import { add, sell } from "./services/methods.js";
import { validateRequest } from "./services/validation.js";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import express from "express";
import db from "./db.js";

const require = createRequire(import.meta.url);
const apiDocs = require("./docs/swagger.json");
const app = express();
const jsonParser = bodyParser.json(); // create application/json parser

// api docs: http://localhost:3000/api-docs/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocs));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome to Etimo's inventory!");
});

// get current stock
app.get("/api/inventory", (req, res) => {
  res.send(db.inventory);
});

// add to stock
app.post("/api/inventory/add", jsonParser, validateRequest, (req, res) => {
  // updating inventory after the request passes validation
  add(req);

  res.status(200).send(db.inventory);
});

// sell from stock
app.post("/api/inventory/sell", jsonParser, validateRequest, (req, res) => {
  // updating inventory after the request passes validation
  sell(req);

  res.status(200).send(db.inventory);
});
