import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Board from "../models/boardModel.js";
import Card from "../models/cardModel.js";

import taskSchema from "../models/taskModel.js";

const Task = mongoose.model("Task", taskSchema);

// @desc:  Fetch Cards
// route: POST /api/cards/
// access: private

const getCards = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.query.boardId);

  if (!board) {
    return res.status(404).json("Board not found");
  }

  try {
    const cards = await Promise.all(
      board.cards.map(async (cardId) => await Card.findById(cardId))
    );
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json("Cards not found");
    throw new Error(error);
  }
});

// @desc:  Add Cards
// route: POST /api/cards/add
// access: Private

const addCard = asyncHandler(async (req, res) => {
  const { cardName, boardId } = req.body;

  try {
    const card = await Card.create({
      cardName,
      boardId,
    });

    const newCard = await card.save();

    const boardWithNewCard = await Board.updateOne(
      { _id: boardId },
      { $push: { cards: newCard._id } }
    );

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json("Card not added");
    throw new Error(error);
  }
});

// @desc:  Update Card
// route: PUT /api/cards/update
// access: Private

const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.body.cardId);

  if (!card) {
    return res.status(404).json("Card not found");
  }

  try {
    card.cardName = req.body.cardName || card.cardName;

    await card.save();

    res.status(201).json("Card updated successfully");
  } catch (error) {
    res.status(500).json("Card not updated");
    throw new Error(error);
  }
});

// @desc:  Delete Card
// route: DELETE /api/cards/delete
// access: Private

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.cardId || req.body.cardId);
  const board = await Board.findById(req.boardId || req.body.boardId);

  if (!card) {
    return res.status(404).json("Card Not Found");
  }

  if (!board) {
    return res.status(404).json("Board Not Found");
  }

  try {
    await card.deleteOne({ _id: card._id });

    await Board.updateOne({ _id: board._id }, { $pull: { cards: card._id } });

    res.status(200).json("Card deleted successfully");
  } catch (error) {
    res.status(500).json("Card not deleted");
    throw new Error(error);
  }
});

export { getCards, addCard, updateCard, deleteCard };
// Path: routes/cardRoutes.js
