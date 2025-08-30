import type { TRole } from "@/types";

export interface IWallet {
  userId: string;
  balance: number; // in smallest unit or decimal depending on backend
  currency?: string;
  updatedAt?: string;
}

export type TTransactionType = "DEPOSIT" | "WITHDRAW" | "SEND" | "RECEIVE";

export interface ITransaction {
  _id: string;
  amount: number;
  type: TTransactionType;
  status: "PENDING" | "SUCCESS" | "FAILED";
  from: string | { _id: string; phone: string };
  to: string | { _id: string; phone: string };

  createdAt: string;
  narrative?: string;
}

export interface IUserProfile {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: TRole;
}
