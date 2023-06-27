const { model } = require("mongoose");

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Technology",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      amountPaid: {
        type: Number,
      },
    },
    orderStatus: {
      type: String,
      default: "En proceso",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = model("Order", orderSchema);
