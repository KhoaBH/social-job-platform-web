"use client";

import { useMemo, useState } from "react";
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
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const handleCreatePost = async (content: string) => {
    await createPost({
      content,
      visibility: "PUBLIC",
    }).unwrap();
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
          author: authorName,
          role: "",
          avatar: initials(authorName),
          avatarColor: "#0EA5E9",
          time: post.createdAt
            ? new Date(post.createdAt).toLocaleString("vi-VN")
            : "Vừa xong",
          content: post.content || "",
          likes: likedIds.includes(post.id) ? 1 : 0,
          comments: 0,
          liked: likedIds.includes(post.id),
          isJob: false,
        };
      }),
    [posts, likedIds, initials],
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
        <PostCard key={post.id} post={post} onToggleLike={toggleLike} />
      ))}
    </div>
  );
}