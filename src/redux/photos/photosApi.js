import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2531/photos/files",
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
    uploadPhoto: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["photos"],
    }),
    deletePhoto: builder.mutation({
      query: (photoPath) => ({
        url: `${photoPath}`,
        method: "DELETE",
      }),
      invalidatesTags: ["photos"],
    }),
  }),
});

export const { useUploadPhotoMutation, useDeletePhotoMutation } = postsApi;
