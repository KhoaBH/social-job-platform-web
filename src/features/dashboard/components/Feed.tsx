"use client";

import { useState } from "react";
import { mockPosts } from "../data/mockData";
import Composer from "./Composer";
import PostCard from "./PostCard";

interface FeedProps {
  initials: (name: string) => string;
  userFullName: string;
}

export default function Feed({ initials, userFullName }: FeedProps) {
  const [posts, setPosts] = useState(mockPosts);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Composer initials={initials} userFullName={userFullName} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onToggleLike={toggleLike} />
      ))}
    </div>
  );
}