import { apiSlice } from "./apiSlice";

const Cards_URL = "/api/cards";

export const cardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query({
      query: (data) => ({
        url: `${Cards_URL}/?boardId=${data}`,
        method: "GET",
      }),
      providesTags: ["Cards"],
    }),
    addCards: builder.mutation({
      query: (data) => ({
        url: `${Cards_URL}/add`,
        method: "POST",
        body: data,
      }),
    }),
    updateCards: builder.mutation({
      query: () => ({
        url: `${Cards_URL}/update`,
        method: "PUT",
      }),
    }),
    deleteCard: builder.mutation({
      query: (data) => ({
        url: `${Cards_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
    deleteAllCards: builder.mutation({
      query: () => ({
        url: `${Cards_URL}/delete/all`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCardsQuery,
  useAddCardsMutation,
  useUpdateCardsMutation,
  useDeleteCardMutation,
  useDeleteAllCardsMutation,
} = cardsApiSlice;
