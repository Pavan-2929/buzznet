"use server"

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { registerShcema, RegisterValues } from "@/lib/validations";
import bcryptjs from "bcryptjs"
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(credentials: RegisterValues): Promise<{ error: string }>{
    try {
        const {username, email, password } = registerShcema.parse(credentials)

        const isUsernameExist = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if(isUsernameExist){
            return {
                error: "Username already exists"
            }
        }

        const isEmailExist = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        })

        if(isEmailExist){
            return {
                error: "Email already exists"
            }
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const userId = generateIdFromEntropySize(10);

        await prisma.user.create({
            data: {
                id: userId,
                username,
                displayName: username,
                email,
                password: hashedPassword
            }
        })

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id);

        (await cookies()).set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )

        return redirect("/")

    } catch (error) {
        if(isRedirectError(error)) throw error
        console.error(error);
        return {
            error: "Something went wrong | Please try again"
        }
    }
}