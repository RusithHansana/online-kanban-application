import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Card from "../models/cardModel.js";

import taskSchema from "../models/taskModel.js";

const Task = mongoose.model("Task", taskSchema);

// @desc:  Fetch Tasks
// route: GET /api/tasks/
// access: private

const getTasks = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.query.cardId);

  if (!card) {
    return res.status(404).json("Card not found");
  }

  try {
    res.status(200).json(card.tasks);
  } catch (error) {
    res.status(404).json("Tasks not found");
    throw new Error(error);
  }
});

// @desc:  Add Task
// route: POST /api/tasks/add
// access: Private

const addTask = asyncHandler(async (req, res) => {
  const { task, cardId } = req.body;

  try {
    const taskContent = new Task({
      task,
      cardId,
    });

    const cardWithNewTask = await Card.updateOne(
      { _id: cardId },
      {
        $push: {
          tasks: taskContent,
        },
      },
      { new: true }
    );

    res.status(201).json(taskContent);
  } catch (error) {
    res.status(500).json("Task not added");
    throw new Error(error);
  }
});

// @desc:  Update Task
// route: PUT /api/tasks/update
// access: Private

const updateTask = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.body.cardId);

  const taskIndex = card.tasks.findIndex((task) => {
    // Convert the task id to a string before comparing
    return task._id.toHexString() === req.body.taskId;
  });

  if (!card) {
    return res.status(404).json("Card not found");
  }

  if (taskIndex === -1) {
    return res.status(404).json("Task not found");
  }

  try {
    card.tasks[taskIndex].task = req.body.task;

    await card.save();

    res.status(201).json("Update successful");
  } catch (error) {
    res.status(500).json("Task not updated");
    throw new Error(error);
  }
});

// @desc:  Swap Tasks
// route: PUT /api/tasks/swap
// access: Private

const swapTasks = asyncHandler(async (req, res) => {
  const { swappedTasks, cardId } = req.body;

  const card = await Card.findById(cardId);

  if (!card) {
    return res.status(404).json("Card not found");
  }

  try {
    await card.updateOne({ tasks: swappedTasks });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json("Tasks not swapped");
    throw new Error(error);
  }
});

// @desc:  Move Task from one card to another
// route: PUT /api/tasks/move
// access: Private

const moveTasks = asyncHandler(async (req, res) => {
  const { dragCardId, dropCardId, task } = req.body;

  const dragCard = await Card.findById(dragCardId);
  const dropCard = await Card.findById(dropCardId);

  try {
    await dropCard.updateOne({ $push: { tasks: task } });

    await dragCard.updateOne({ $pull: { tasks: { _id: task._id } } });

    res.status(201).json("Task moved successfully");
  } catch (error) {
    res.status(500).json("Task not moved");
    throw new Error(error);
  }
});

// @desc:  Delete Task
// route: DELETE /api/tasks/delete
// access: Private

const deleteTask = asyncHandler(async (req, res) => {
  try {
    await Card.updateOne(
      { _id: req.body.cardId },
      { $pull: { tasks: { _id: req.body.taskId } } }
    );

    res.json("Task deleted successfully");
  } catch (error) {
    res.status(500).json("Task not deleted");
    throw new Error(error);
  }
});

export { getTasks, addTask, updateTask, swapTasks, moveTasks, deleteTask };
// Path: routes/cardRoutes.js
