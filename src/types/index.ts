import type { ComponentType } from "react";

export type { ILogin } from "./auth.type";

export interface IResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: TRole;
  // add other fields you expect in user object
}

export type TRole = "AGENT" | "ADMIN" | "USER";

export interface IUserInfo {
  role: TRole;
  phone: string;
  name: string;
}
