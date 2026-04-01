import { appApi } from "@/lib/appApi";

export interface BackendPostAuthor {
  id: string;
  email?: string | null;
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
}

export interface BackendPost {
  id: string;
  author?: BackendPostAuthor | null;
  companyId?: string | null;
  content?: string | null;
  visibility?: "PUBLIC" | "CONNECTIONS" | "PRIVATE" | string;
  createdAt?: string | null;
}

export interface CreatePostPayload {
  companyId?: string;
  content: string;
  visibility: "PUBLIC" | "CONNECTIONS" | "PRIVATE";
}

export const dashboardApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<BackendPost[], void>({
      query: () => "/posts",
      providesTags: [{ type: "Posts", id: "LIST" }],
    }),
    createPost: builder.mutation<BackendPost, CreatePostPayload>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const { useGetAllPostsQuery, useCreatePostMutation } = dashboardApi;
