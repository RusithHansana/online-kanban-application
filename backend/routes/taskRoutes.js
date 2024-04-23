import express from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  swapTasks,
  moveTasks,
} from "../controllers/taskController.js";

// import { protect } from "../controllers/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTasks);
router.route("/add").post(addTask);
router.route("/update").put(updateTask);
router.route("/swap").put(swapTasks);
router.route("/move").put(moveTasks);
router.route("/delete").delete(deleteTask);

export default router;
