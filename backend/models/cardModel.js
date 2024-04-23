import mongoose from "mongoose";
import taskSchema from "./taskModel.js";

const cardSchema = mongoose.Schema(
  {
    cardName: {
      type: String,
      required: true,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
