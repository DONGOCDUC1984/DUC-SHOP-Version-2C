const Order = require("../models/orderModel");

async function getAllOrders(req, res) {
  try {
    var orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
}

async function getUserOrders(req, res) {
  try {
    var orders = await Order.find({ user_email: req.user.email });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
}

async function postOrders(req, res) {
  try {
    var newOrder = new Order(req.body);
    var savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
  }
}

async function deleteOrder(req, res) {
  try {
    var order = await Order.findById(req.params._id);
    if (!order) {
      res.status(400).json("order does not exist.");
    }

    if (order.user_email !== req.user.email && req.user.isAdmin == false) {
      res.status(400).json("User not authorized.");
    } else {
      await order.remove();
      res.status(200).json({ _id: req.params._id, info: "order was deleted." });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllOrders,
  getUserOrders,
  postOrders,
  deleteOrder,
};
