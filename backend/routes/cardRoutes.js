import express from "express";
import {
  addCard,
  getCards,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";

// import { protect } from "../controllers/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCards);
router.route("/add").post(addCard);
router.route("/update").put(updateCard);
router.route("/delete").delete(deleteCard);

export default router;
