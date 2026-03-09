import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api/v1/todo";

// Types matching your backend DTOs
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const TodoApi = createApi({
  reducerPath: "TodoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<ApiResponse<Todo[]>, void>({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Todo" as const, id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),

    getTodoById: builder.query<ApiResponse<Todo>, number>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Todo", id }],
    }),

    createTodo: builder.mutation<ApiResponse<Todo>, CreateTodoDTO>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    updateTodo: builder.mutation<
      ApiResponse<Todo>,
      { id: number; data: UpdateTodoDTO }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Todo", id },
        { type: "Todo", id: "LIST" },
      ],
    }),

    deleteTodo: builder.mutation<ApiResponse<{ message: string }>, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Todo", id },
        { type: "Todo", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = TodoApi;
