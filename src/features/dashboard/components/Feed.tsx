"use client";

import { useMemo } from "react";
import { useCreatePostMutation, useGetAllPostsQuery } from "../dashboardApi";
import Composer from "./Composer";
import PostCard from "./PostCard";

interface FeedProps {
  initials: (name: string) => string;
  userFullName: string;
}

export default function Feed({ initials, userFullName }: FeedProps) {
  const { data: posts = [], isLoading } = useGetAllPostsQuery();
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();

  const handleCreatePost = async (content: string) => {
    await createPost({
      content,
      visibility: "PUBLIC",
    }).unwrap();
  };

  const mappedPosts = useMemo(
    () =>
      posts.map((post) => {
        const authorName =
          post.author?.fullName ||
          post.author?.username ||
          post.author?.email ||
          "Người dùng";

        return {
          id: post.id,
          authorId: post.author?.id || undefined,
          author: authorName,
          role: "",
          avatar: initials(authorName),
          avatarColor: "#0EA5E9",
          time: post.createdAt
            ? new Date(post.createdAt).toLocaleString("vi-VN")
            : "Vừa xong",
          content: post.content || "",
          isJob: false,
        };
      }),
    [posts, initials],
  );

  return (
    <div className="flex flex-col gap-2.5">
      <Composer
        initials={initials}
        userFullName={userFullName}
        onSubmit={handleCreatePost}
        isSubmitting={isCreatingPost}
      />
      {isLoading && (
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4 text-[#4B5563] text-[14px]">
          Đang tải bài đăng...
        </div>
      )}
      {!isLoading && mappedPosts.length === 0 && (
        <div className="bg-white border border-[#E4E4E7] rounded-[10px] p-4 text-[#4B5563] text-[14px]">
          Chưa có bài đăng nào.
        </div>
      )}
      {mappedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
