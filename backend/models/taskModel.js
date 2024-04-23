import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Get the maximum priority for tasks within the same card
taskSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const maxPriority = await this.constructor.findOne(
      { cardId: this.cardId },
      "priority",
      { sort: { priority: -1 } }
    );
    this.priority = maxPriority ? maxPriority.priority + 1 : 1;
    next();
  } catch (err) {
    next(err);
  }
});

export default taskSchema;
