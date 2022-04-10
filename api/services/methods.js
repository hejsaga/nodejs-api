import db from "../db.js";

// add products to stock
const add = (req) => {
  db.inventory = {
    ...db.inventory,
    stock: parseInt(db.inventory.stock) + parseInt(req.body.stockUpdate),
  };
};

// sell products from stock
const sell = (req) => {
  db.inventory = {
    ...db.inventory,
    stock: parseInt(db.inventory.stock) - parseInt(req.body.stockUpdate),
  };
};

export { add, sell };
