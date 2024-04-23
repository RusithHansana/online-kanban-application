import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardList: [],
  activeBoardId: "",
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boardList = action.payload;
    },
    addBoard: (state, action) => {
      //do not update the existing state, create a new state
      state.boardList = [...state.boardList, action.payload.data];
    },
    update: (state, action) => {
      const index = state.boardList.findIndex(
        (board) => board._id === action.payload.boardId
      );
      if (index !== -1) {
        state.boardList[index] = action.payload.data;
      }
    },
    delBoard: (state, action) => {
      state.boardList = state.boardList.filter(
        (board) => board._id !== action.payload.boardId
      );
    },
    deleteAllBoards: (state) => {
      state.boardList = [];
    },
    setActiveBoardId: (state, action) => {
      state.activeBoardId = action.payload;
    },
  },
});

export const {
  setBoards,
  addBoard,
  update,
  delBoard,
  deleteAllBoards,
  setActiveBoardId,
} = boardsSlice.actions;
export default boardsSlice.reducer;
