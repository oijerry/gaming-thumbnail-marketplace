import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Purchased Template
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

   customerEmail: {
  type: String,
  default: "",
},

    templateName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },

    customerImage: {
  type: String,
  default: "",
},

completedThumbnail: {
  type: String,
  default: "",
},

adminNote: {
  type: String,
  default: "",
},

    // Download Access
    downloadUnlocked: {
      type: Boolean,
      default: false,
    },

    // Razorpay
    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);