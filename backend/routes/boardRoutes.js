import express from "express";
import {
  addBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";

// import { protect } from "../controllers/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBoards);
router.route("/add").post(addBoard);
router.route("/update").put(updateBoard);
router.route("/delete").delete(deleteBoard);

export default router;
// Path: routes/index.js
