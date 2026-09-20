'use server';

import { signIn, signOut } from "@/auth";
import AuthError from "next-auth";

export const login = async () => {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw error;
  }
};
export const logout = async () => {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw error;
  }
};