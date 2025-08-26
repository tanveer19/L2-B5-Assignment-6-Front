export const role = {
  agent: "AGENT",
  admin: "ADMIN",
  user: "USER",
} as const;

export type TRole = (typeof role)[keyof typeof role];
