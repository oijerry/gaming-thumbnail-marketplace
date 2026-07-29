import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate wishlist entries
WishlistSchema.index(
  { userId: 1, templateId: 1 },
  { unique: true }
);

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);