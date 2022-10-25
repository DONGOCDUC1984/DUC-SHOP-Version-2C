const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    new_Order_Products: [
      {
        product_id: {
          type: String,
          required: true,
        },
        product_name: {
          type: String,
          required: true,
        },
        product_price: {
          type: Number,
          required: true,
        },

        product_quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    total_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
