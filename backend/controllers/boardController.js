import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Board from "../models/boardModel.js";
import Card from "../models/cardModel.js";

let session = null;
// @desc:  Fetch Boards
// route: GET /api/boards/
// access: Private

const getBoards = asyncHandler(async (req, res) => {
  const user = await User.findById(req.query.userId);

  if (!user) {
    return res.status(404).json("User not found");
  }

  try {
    const boards = await Promise.all(
      user.boards.map(async (boardId) => await Board.findById(boardId))
    );
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json("Fetching failed");
    throw new Error("Boards not found");
  }
});

// @desc:  Add Boards
// route: POST /api/boards/add
// access: Private

const addBoard = asyncHandler(async (req, res) => {
  const { boardName, color, userId } = req.body;

  try {
    const board = await Board.create({
      boardName,
      color,
      userId,
    });

    const newBoard = await board.save();

    const userWithNewBoard = await User.updateOne(
      { _id: userId },
      { $push: { boards: newBoard._id } }
    );

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json("Board not added");
    throw new Error(error);
  }
});

// @desc:  Update Board
// route: PUT /api/boards/update
// access: Private

const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.boardId);

  if (!board) {
    return res.status(404).json("Board not found");
  }

  try {
    board.boardName = req.body.boardName || board.boardName;
    board.color = req.body.color || board.color;
    await board.save();
    res.status(201).json("Board updated successfully");
  } catch (error) {
    res.status(500).json("Update Failed");
    throw new Error(error);
  }
});

// @desc:  Delete Board
// route: DELETE /api/boards/delete
// access: Private

const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.body.boardId);
  const cards = board.cards;
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  Board.startSession().then((_session) => {
    session = _session;
    session
      .withTransaction(async () => {
        try {
          if (board.cards.length > 0) {
            Promise.all(
              cards.map(async (cardId) => await Card.deleteOne({ _id: cardId }))
            );
          }
          await User.updateOne(
            { _id: req.body.userId },
            { $pull: { boards: board._id } }
          );
          await board.deleteOne({ _id: req.body.boardId });
        } catch (error) {
          res.status(500).json("Delete failed");
          throw new Error(error);
        } finally {
          session.endSession();
        }
      })
      .then(() => {
        res.status(200).json("Board removed");
      });
  });
});

export { getBoards, addBoard, updateBoard, deleteBoard };
// Path: routes/boardRoutes.js
