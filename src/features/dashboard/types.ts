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

export interface BackendUser {
  id: string;
  email?: string | null;
  username?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  headline?: string | null;
  profileText?: string | null;
}

export interface CreatePostPayload {
  companyId?: string;
  content: string;
  visibility: "PUBLIC" | "CONNECTIONS" | "PRIVATE";
}

export interface SendConnectionRequestPayload {
  addresseeId: string;
}

export interface BackendPostInteraction {
  id: string;
  postId?: string;
  userId?: string;
}

export interface BackendCommentUser {
  id?: string;
  fullName?: string | null;
  username?: string | null;
  email?: string | null;
}

export interface BackendPostComment {
  id: string;
  content?: string | null;
  user?: BackendCommentUser | null;
  createdAt?: string | null;
}

export interface BackendPostCommentTree {
  id: string;
  content?: string | null;
  username?: string | null;
  createdAt?: string | null;
  replies?: BackendPostCommentTree[];
}

export interface BackendCommentInteraction {
  id: string;
  commentId?: string;
  userId?: string;
}

export interface CreatePostCommentPayload {
  postId: string;
  content: string;
  parentCommentId?: string;
}
export interface FriendRequest {
  id: string;
  connectionId: string;
  senderId: string;
  senderName: string;
  senderAvatarUrl?: string | null;
  mutualFriendsCount: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}
