const express = require("express");
const router = express.Router();
const {
  getProducts,
  createproduct,
  deleteproduct,
} = require("../controllers/productController");
var { authenticate, checkAdmin } = require("../middleware/util");

router.get("/", getProducts);
router.post("/createproduct", authenticate, checkAdmin, createproduct);
router.delete("/deleteproduct/:_id", authenticate, checkAdmin, deleteproduct);
module.exports = router;
