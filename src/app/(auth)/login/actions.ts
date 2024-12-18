"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validations";
import bcryptjs from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function loginAction(
  creadentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(creadentials);

    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!user || !user.password) {
      return {
        error: "Invalid credentials",
      };
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        error: "Invalid credentials",
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return {
      error: "Something went wrong | Please try again",
    };
  }
}
