import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string | null } };
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "ProfileUser",
    "ProfileExperience",
    "ProfileEducation",
    "ProfileSkill",
    "ProfileFollow",
    "ProfileConnection",
    "Posts",
    "PostInteractions",
    "PostComments",
    "CommentInteractions",
  ],
  endpoints: () => ({}),
});
