"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Globe,
  MoreHorizontal,
  Briefcase,
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
} from "lucide-react";
import { RootState } from "@/store";
import { ROUTES } from "@/constants/routes";
import {
  useCreatePostCommentMutation,
  useGetAllUsersQuery,
  useGetCommentInteractionsQuery,
  useGetPostCommentTreeQuery,
  useGetPostInteractionsQuery,
  useLikeCommentMutation,
  useLikePostMutation,
  useUnlikeCommentMutation,
  useUnlikePostMutation,
} from "../dashboardApi";

interface Post {
  id: string;
  authorId?: string;
  author: string;
  role: string;
  avatar: string;
  avatarColor: string;
  time: string;
  content: string;
  isJob: boolean;
}

interface PostCardProps {
  post: Post;
}

interface CommentNode {
  id: string;
  content?: string | null;
  username?: string | null;
  createdAt?: string | null;
  replies?: CommentNode[];
}

interface UiCommentNode extends CommentNode {
  replies?: UiCommentNode[];
  replyToUsername?: string;
}

function countAllComments(nodes: CommentNode[]): number {
  return nodes.reduce(
    (total, node) => total + 1 + countAllComments(node.replies || []),
    0,
  );
}

function collectRepliesAtLevelTwo(
  nodes: CommentNode[],
  parentUsername?: string | null,
): UiCommentNode[] {
  return nodes.flatMap((node) => {
    const current: UiCommentNode = {
      ...node,
      replies: [],
      replyToUsername: parentUsername || undefined,
    };

    const descendants = collectRepliesAtLevelTwo(
      node.replies || [],
      node.username || parentUsername,
    );

    return [current, ...descendants];
  });
}

function normalizeToTwoLevelTree(nodes: CommentNode[]): UiCommentNode[] {
  return nodes.map((root) => ({
    ...root,
    replies: collectRepliesAtLevelTwo(root.replies || [], root.username),
  }));
}

function formatTime(value?: string | null): string {
  if (!value) {
    return "Vừa xong";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Vừa xong";
  }
  return date.toLocaleString("vi-VN");
}

function getAvatarInitials(name?: string | null): string {
  const normalized = (name || "Người dùng").trim();
  if (!normalized) {
    return "U";
  }
  const parts = normalized.split(" ").filter(Boolean);
  return (
    parts
      .slice(-2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

function getAvatarColor(name?: string | null): string {
  const source = name || "Người dùng";
  const palette = ["#0EA5E9", "#F59E0B", "#10B981", "#EC4899", "#6366F1"];
  const seed = source.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return palette[seed % palette.length];
}

function CommentBubble({
  comment,
  postId,
  level,
  profileHref,
}: {
  comment: UiCommentNode;
  postId: string;
  level: "root" | "reply";
  profileHref?: string;
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { data: commentInteractions = [] } = useGetCommentInteractionsQuery(
    comment.id,
  );
  const [likeComment, { isLoading: isLikingComment }] =
    useLikeCommentMutation();
  const [unlikeComment, { isLoading: isUnlikingComment }] =
    useUnlikeCommentMutation();
  const [createPostComment, { isLoading: isReplying }] =
    useCreatePostCommentMutation();

  const likedComment = Boolean(
    authUser?.id &&
    commentInteractions.some((item) => item.userId === authUser.id),
  );

  const handleToggleCommentLike = async () => {
    if (isLikingComment || isUnlikingComment) {
      return;
    }
    if (likedComment) {
      await unlikeComment(comment.id).unwrap();
      return;
    }
    await likeComment(comment.id).unwrap();
  };

  const handleReply = async () => {
    const content = replyText.trim();
    if (!content || isReplying) {
      return;
    }

    await createPostComment({
      postId,
      content,
      parentCommentId: comment.id,
    }).unwrap();

    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2.5">
        {profileHref ? (
          <Link
            href={profileHref}
            title="Xem hồ sơ"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 no-underline transition-transform duration-150 hover:scale-105"
            style={{ background: getAvatarColor(comment.username) }}
          >
            {getAvatarInitials(comment.username)}
          </Link>
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ background: getAvatarColor(comment.username) }}
          >
            {getAvatarInitials(comment.username)}
          </div>
        )}
        <div
          className={`flex-1 rounded-lg px-3 py-2 ${
            level === "root" ? "bg-[#F8F8FC]" : "bg-[#F4F6FA]"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {profileHref ? (
              <Link
                href={profileHref}
                title="Xem hồ sơ"
                className="text-[12px] font-semibold text-[#222] no-underline hover:underline hover:text-[#0A66C2]"
              >
                {comment.username || "Người dùng"}
              </Link>
            ) : (
              <div className="text-[12px] font-semibold text-[#222]">
                {comment.username || "Người dùng"}
              </div>
            )}
            <div className="text-[11px] text-[#999]">
              {formatTime(comment.createdAt)}
            </div>
          </div>
          {comment.replyToUsername && (
            <div className="text-[11px] text-[#0A66C2] mt-0.5">
              Trả lời @{comment.replyToUsername}
            </div>
          )}
          <div className="text-[13px] text-[#444] mt-0.5">
            {comment.content || ""}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[12px]">
            <button
              onClick={handleToggleCommentLike}
              disabled={isLikingComment || isUnlikingComment}
              className={`font-semibold hover:underline disabled:opacity-60 ${
                likedComment ? "text-[#0A66C2]" : "text-[#666]"
              }`}
            >
              Thích{" "}
              {commentInteractions.length > 0
                ? `(${commentInteractions.length})`
                : ""}
            </button>
            <button
              onClick={() => setShowReplyInput((prev) => !prev)}
              className="font-semibold text-[#666] hover:underline"
            >
              Trả lời
            </button>
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="flex items-center gap-2 pl-1">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Viết trả lời..."
            className="flex-1 px-3 py-2 rounded-full border border-[#D8D8DD] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20"
          />
          <button
            onClick={handleReply}
            disabled={!replyText.trim() || isReplying}
            className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-white bg-[#0A66C2] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isReplying ? "Đang gửi" : "Gửi"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [visibleRootComments, setVisibleRootComments] = useState(3);
  const [likedOverride, setLikedOverride] = useState<boolean | null>(null);
  const authUser = useSelector((state: RootState) => state.auth.user);

  const { data: interactions = [], refetch: refetchPostInteractions } =
    useGetPostInteractionsQuery(post.id);
  const { data: commentTree = [] } = useGetPostCommentTreeQuery(post.id);
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const [createPostComment, { isLoading: isCommenting }] =
    useCreatePostCommentMutation();
  const { data: users = [] } = useGetAllUsersQuery();

  const usernameToProfileId = useMemo(() => {
    const map = new Map<string, string>();
    users.forEach((user) => {
      if (user.username) {
        map.set(user.username.toLowerCase(), user.id);
      }
    });
    return map;
  }, [users]);

  const serverLiked = Boolean(
    authUser?.id && interactions.some((item) => item.userId === authUser.id),
  );
  const liked = likedOverride ?? serverLiked;
  const likesCount =
    interactions.length +
    (likedOverride !== null && likedOverride !== serverLiked
      ? likedOverride
        ? 1
        : -1
      : 0);

  const commentsCount = useMemo(
    () => countAllComments(commentTree as CommentNode[]),
    [commentTree],
  );

  const twoLevelComments = useMemo(
    () => normalizeToTwoLevelTree(commentTree as CommentNode[]),
    [commentTree],
  );

  const visibleComments = useMemo(
    () => twoLevelComments.slice(0, visibleRootComments),
    [twoLevelComments, visibleRootComments],
  );

  const canShowMore = visibleRootComments < twoLevelComments.length;
  const postAuthorProfileHref = post.authorId
    ? ROUTES.PROTECTED.PROFILE.VIEW(post.authorId)
    : undefined;

  const handleToggleLike = async () => {
    if (isLiking || isUnliking) {
      return;
    }

    const nextLiked = !liked;
    setLikedOverride(nextLiked);

    try {
      if (nextLiked) {
        await likePost(post.id).unwrap();
      } else {
        await unlikePost(post.id).unwrap();
      }
    } catch {
      setLikedOverride(null);
      await refetchPostInteractions();
    }
  };

  const handleCreateComment = async () => {
    const content = commentText.trim();
    if (!content || isCommenting) {
      return;
    }

    await createPostComment({
      postId: post.id,
      content,
    }).unwrap();
    setCommentText("");
    setShowComments(true);
  };

  return (
    <div className="bg-white border border-[#E4E4E7] rounded-[10px] overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-2.5 px-4 pt-3.5">
        {postAuthorProfileHref ? (
          <Link
            href={postAuthorProfileHref}
            title="Xem hồ sơ"
            className="w-11 h-11 rounded-full flex items-center justify-center
                     text-base font-bold text-white shrink-0 no-underline
                     transition-transform duration-150 hover:scale-105"
            style={{ background: post.avatarColor }}
          >
            {post.avatar}
          </Link>
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center
                     text-base font-bold text-white shrink-0"
            style={{ background: post.avatarColor }}
          >
            {post.avatar}
          </div>
        )}
        <div className="flex-1">
          {postAuthorProfileHref ? (
            <Link
              href={postAuthorProfileHref}
              title="Xem hồ sơ"
              className="text-[14px] font-bold text-[#111827] no-underline hover:underline hover:text-[#0A66C2]"
            >
              {post.author}
            </Link>
          ) : (
            <div className="text-[14px] font-bold">{post.author}</div>
          )}
          <div className="text-[12px] text-[#555] mt-px">{post.role}</div>
          <div className="text-[11.5px] text-[#999] mt-px flex items-center gap-1">
            <Globe size={12} />
            {post.time}
          </div>
        </div>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                     border-none bg-transparent text-[#666]
                     transition-[background] duration-100 hover:bg-[#F2F2F7]"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-[14px] leading-[1.65] whitespace-pre-line">
        {post.content}
      </div>

      {/* Job badge */}
      {post.isJob && (
        <div
          className="mx-4 mb-3 bg-[#EEF3F8] rounded-lg px-3.5 py-2.5
                        flex items-center gap-2 text-[13px] text-[#0A66C2] font-semibold"
        >
          <Briefcase size={16} />
          Bài đăng tuyển dụng · Ứng tuyển ngay
        </div>
      )}

      {/* Stats */}
      <div className="px-4 pb-2 pt-1 flex justify-between text-[12px] text-[#666]">
        <span className="flex items-center gap-1">
          <ThumbsUp size={13} />
          {liked
            ? likesCount > 1
              ? `Bạn và ${likesCount - 1} người khác`
              : "Bạn"
            : `${likesCount} lượt thích`}
        </span>
        <span>{commentsCount} bình luận</span>
      </div>

      {/* Actions */}
      <div className="border-t border-[#E4E4E7] flex">
        {[
          {
            icon: <ThumbsUp size={16} />,
            label: "Thích",
            action: handleToggleLike,
            liked,
          },
          {
            icon: <MessageCircle size={16} />,
            label: "Bình luận",
            action: () => setShowComments((prev) => !prev),
            liked: showComments,
          },
          {
            icon: <Share2 size={16} />,
            label: "Chia sẻ",
            action: () => {},
            liked: false,
          },
          {
            icon: <Send size={16} />,
            label: "Gửi",
            action: () => {},
            liked: false,
          },
        ].map(({ icon, label, action, liked }) => (
          <button
            key={label}
            onClick={action}
            disabled={label === "Thích" ? isLiking || isUnliking : false}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5
                        text-[13.5px] font-semibold cursor-pointer border-none
                        bg-transparent font-[inherit] transition-[background] duration-100
                          hover:bg-[#F2F2F7] hover:text-[#0A66C2] disabled:opacity-70
                          ${liked ? "text-[#0A66C2]" : "text-[#666]"}`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-[#E4E4E7] px-4 py-3 space-y-2">
          {twoLevelComments.length === 0 && (
            <p className="text-[12px] text-[#999]">Chưa có bình luận nào.</p>
          )}
          {visibleComments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <CommentBubble
                comment={comment}
                postId={post.id}
                level="root"
                profileHref={
                  comment.username
                    ? (() => {
                        const profileId = usernameToProfileId.get(
                          comment.username.toLowerCase(),
                        );
                        return profileId
                          ? ROUTES.PROTECTED.PROFILE.VIEW(profileId)
                          : undefined;
                      })()
                    : undefined
                }
              />

              {(comment.replies || []).length > 0 && (
                <div className="ml-5 border-l-2 border-[#E6EAF0] pl-3 space-y-2">
                  {(comment.replies || []).map((reply) => (
                    <CommentBubble
                      key={reply.id}
                      comment={reply}
                      postId={post.id}
                      level="reply"
                      profileHref={
                        reply.username
                          ? (() => {
                              const profileId = usernameToProfileId.get(
                                reply.username.toLowerCase(),
                              );
                              return profileId
                                ? ROUTES.PROTECTED.PROFILE.VIEW(profileId)
                                : undefined;
                            })()
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          {canShowMore && (
            <button
              onClick={() => setVisibleRootComments((prev) => prev + 3)}
              className="text-[12.5px] font-semibold text-[#0A66C2] hover:underline"
            >
              Xem thêm bình luận
            </button>
          )}
        </div>
      )}

      <div className="border-t border-[#E4E4E7] px-4 py-3 flex items-center gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onFocus={() => setShowComments(true)}
          placeholder="Viết bình luận..."
          className="flex-1 px-3 py-2 rounded-full border border-[#D8D8DD] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20"
        />
        <button
          onClick={handleCreateComment}
          disabled={!commentText.trim() || isCommenting}
          className="px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold text-white bg-[#0A66C2] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCommenting ? "Đang gửi" : "Gửi"}
        </button>
      </div>
    </div>
  );
}
