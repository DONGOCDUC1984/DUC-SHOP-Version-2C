const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getUserOrders,
  postOrders,
  deleteOrder,
} = require("../controllers/orderController");
var { authenticate, checkAdmin } = require("../middleware/util");

router.get("/", authenticate, checkAdmin, getAllOrders);
router.get("/userorders", authenticate, getUserOrders);
router.post("/", authenticate, postOrders);
router.delete("/:_id", authenticate, deleteOrder);
module.exports = router;
