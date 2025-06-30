import { Schema, model, mongoose } from "mongoose";
import { DiscountType } from "../../src/utils/index.js";

export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      default: function () {
        return slugify(this.name, {
          lower: true,
          replacement: "_",
        });
      },
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    appliedDiscount: {
      amount: {
        type: Number,
        min: 0,
        default: 0,
      },
      type: {
        type: String,
        enum: Object.values(DiscountType),
        default: DiscountType.PERCENTAGE,
      },
    }, // saving price
    appliedPrice: {
      type: Number,
      required: true,
      default: function () {
        return calculatePrice(this.price, this.appliedDiscount);
      },
    }, // now > price or (price - discount)
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],

    // IDs section
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.productModel || mongoose.model("Product", productSchema);
