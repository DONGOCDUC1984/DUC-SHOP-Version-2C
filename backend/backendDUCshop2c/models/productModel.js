const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "Fruit And Vegetable",
    },

    url: {
      type: String,
      required: true,
    },
    cart: {
      type: Boolean,
      required: true,
      default: false,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
