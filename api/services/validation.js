import db from "../db.js";

const validateRequest = (req, res, next) => {
  let value = req.body.stockUpdate;
  let path = req.route.path;

  if (value.length <= 0) {
    return res.status(500).send({
      error: "Expected a number and got empty string",
    });
  }

  if (!stringIsOnlyNumeric(value)) {
    return res.status(500).send({
      error: "Expected a number",
    });
  }

  if (path.includes("add") && value <= 0) {
    return res.status(500).send({
      error: "Stock must increase with 1 or more",
    });
  }

  if (path.includes("sell") && value <= 0) {
    return res.status(500).send({
      error: "Stock must decrease with 1 or more",
    });
  }

  if (path.includes("sell") && parseInt(db.inventory.stock) - value < 0) {
    return res.status(500).send({
      error: "Stock is too low",
    });
  }

  next();
};

const stringIsOnlyNumeric = (str) => {
  return /^[0-9]+$/.test(str);
};

export { validateRequest };
