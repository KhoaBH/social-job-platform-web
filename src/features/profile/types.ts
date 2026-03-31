// src/features/profile/types.ts

export type Tab = "overview" | "profile" | "activity" | "network";

export const initials = (name: string): string =>
  name ? name.split(" ").map((w) => w[0]).slice(-2).join("") : "U";