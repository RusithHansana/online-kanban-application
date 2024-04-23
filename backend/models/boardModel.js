import mongoose from "mongoose";

const boardSchema = mongoose.Schema(
  {
    boardName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
