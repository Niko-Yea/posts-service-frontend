import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2531/posts",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["posts"],

  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["posts"],
    }),
    editPost: builder.mutation({
      query: ({ postId, editedPost }) => {
        console.log(editedPost);
        return {
          url: `/${postId}`,
          method: "PATCH",
          body: editedPost,
        };
      },
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    fetchPosts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    fetchPostsByUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    fetchPostById: builder.query({
      query: (postId) => ({
        url: `/${postId}`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useFetchPostsQuery,
  useFetchPostsByUserQuery,
  useFetchPostByIdQuery,
} = postsApi;
