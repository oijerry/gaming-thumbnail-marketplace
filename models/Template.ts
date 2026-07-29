import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    downloadUrl: {
  type: String,
  default: "",
},

downloadZip: {
  type: String,
  default: "",
},

downloadPsd: {
  type: String,
  default: "",
},
    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    badge: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    },

    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);