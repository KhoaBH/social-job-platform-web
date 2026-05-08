import { appApi } from "@/lib/appApi";
import {
  BackendCommentInteraction,
  BackendPost,
  BackendPostComment,
  BackendPostCommentTree,
  BackendPostInteraction,
  BackendUser,
  CreatePostCommentPayload,
  CreatePostPayload,
  FriendRequest,
  SendConnectionRequestPayload,
} from "./types";
import { use } from "react";

export const dashboardApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<BackendUser[], void>({
      query: () => "/users",
    }),
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
    getPostInteractions: builder.query<BackendPostInteraction[], string>({
      query: (postId) => `/post-interactions/post/${postId}`,
      providesTags: (_result, _error, postId) => [
        { type: "PostInteractions", id: postId },
      ],
    }),
    likePost: builder.mutation<BackendPostInteraction, string>({
      query: (postId) => ({
        url: `/post-interactions/post/${postId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: "PostInteractions", id: postId },
      ],
    }),
    friendRequest: builder.query<FriendRequest[], void>({
      query: () => "/connections/requests",
      providesTags: [{ type: "FriendRequests", id: "LIST" }],
    }),
    acceptRequest: builder.mutation<void, string>({
      query: (connectionId) => ({
        url: `/connections/${connectionId}/accept`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "ProfileConnection", id: "ME" },
        { type: "FriendRequests", id: "LIST" },
      ],
    }),
    rejectRequest: builder.mutation<void, string>({
      query: (connectionId) => ({
        url: `/connections/${connectionId}/reject`,
        method: "POST",
      }),
      invalidatesTags: [
        { type: "ProfileConnection", id: "ME" },
        { type: "FriendRequests", id: "LIST" },
      ],
    }),
    unlikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/post-interactions/post/${postId}/me`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, postId) => [
        { type: "PostInteractions", id: postId },
      ],
    }),
    getPostComments: builder.query<BackendPostComment[], string>({
      query: (postId) => `/post-comments/post/${postId}`,
      providesTags: (_result, _error, postId) => [
        { type: "PostComments", id: postId },
      ],
    }),
    getPostCommentTree: builder.query<BackendPostCommentTree[], string>({
      query: (postId) => `/post-comments/post/${postId}/tree`,
      providesTags: (_result, _error, postId) => [
        { type: "PostComments", id: postId },
      ],
    }),
    createPostComment: builder.mutation<
      BackendPostComment,
      CreatePostCommentPayload
    >({
      query: ({ postId, ...body }) => ({
        url: `/post-comments/post/${postId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "PostComments", id: arg.postId },
      ],
    }),
    getCommentInteractions: builder.query<BackendCommentInteraction[], string>({
      query: (commentId) => `/comment-interactions/comment/${commentId}`,
      providesTags: (_result, _error, commentId) => [
        { type: "CommentInteractions", id: commentId },
      ],
    }),
    likeComment: builder.mutation<BackendCommentInteraction, string>({
      query: (commentId) => ({
        url: `/comment-interactions/comment/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, commentId) => [
        { type: "CommentInteractions", id: commentId },
      ],
    }),
    unlikeComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/comment-interactions/comment/${commentId}/me`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, commentId) => [
        { type: "CommentInteractions", id: commentId },
      ],
    }),
    sendConnectionRequest: builder.mutation<
      unknown,
      SendConnectionRequestPayload
    >({
      query: (body) => ({
        url: "/connections/request",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ProfileConnection", id: "ME" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostInteractionsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostCommentsQuery,
  useGetPostCommentTreeQuery,
  useCreatePostCommentMutation,
  useGetCommentInteractionsQuery,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useSendConnectionRequestMutation,
  useFriendRequestQuery,
  useAcceptRequestMutation,
  useRejectRequestMutation,
} = dashboardApi;
