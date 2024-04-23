import { apiSlice } from "./apiSlice";

const Boards_URL = "/api/boards";

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: (data) => ({
        url: `${Boards_URL}/?userId=${data}`,
        method: "GET",
      }),
      providesTags: ["Boards"],
    }),
    addBoards: builder.mutation({
      query: (data) => ({
        url: `${Boards_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    updateBoard: builder.mutation({
      query: (data) => ({
        url: `${Boards_URL}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBoard: builder.mutation({
      query: (data) => ({
        url: `${Boards_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
    deleteAllBoards: builder.mutation({
      query: () => ({
        url: `${Boards_URL}/delete/all`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardsMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useDeleteAllBoardsMutation,
} = boardsApiSlice;
