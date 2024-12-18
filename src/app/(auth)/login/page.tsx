import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import loginImage from "@/assets/login.png";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
    title: "Login",
};

const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex h-full max-h-[40rem] w-full max-w-[60rem] overflow-hidden rounded-xl bg-card shadow-xl">
                <Image
                    src={loginImage}
                    alt=""
                    className="hidden w-1/2 object-cover md:block"
                />
                <div>
                </div>
                <div className="w-full space-y-8 overflow-y-auto bg-card px-8 py-6 md:w-1/2">
                    <div className="text-center">
                        <p className="text-2xl font-bold">Register to BuzzNet</p>
                        <p className="text-muted-foreground text-sm pt-1">
                            A place where even <span className="italic">you</span> can find a
                            friend.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <LoginForm />
                        <Link href="/register" className="block text-sm text-center hover:underline">
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
