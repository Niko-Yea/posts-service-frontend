import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2531",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["users", "contacts"],

  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),
    siginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/current",
        method: "GET",
        invalidatesTags: ["users"],
      }),
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useSiginUserMutation,
  useLogOutUserMutation,
  useGetCurrentUserQuery,
} = authApi;
