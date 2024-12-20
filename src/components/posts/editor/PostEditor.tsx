"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import { submitPostAction } from "./action"
import StarterKit from "@tiptap/starter-kit";
import "./style.css";
import LoadingButton from "@/components/LoadingButton";
import { useSubmitPostMuation } from "./mutations";

export default function PostEditor() {
    const { user } = useSession();
    const mutation = useSubmitPostMuation()

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false,
            }),
            Placeholder.configure({
                placeholder: "What's crack-a-lackin'?",
            }),
        ],
    });

    const input =
        editor?.getText({
            blockSeparator: "\n",
        }) || "";

    function onSubmit() {
        mutation.mutate(input, {
            onSuccess: () => {
                editor?.commands.clearContent()
            }
        })
    }

    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex gap-5">
                <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
                <EditorContent
                    editor={editor}
                    className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
                />
            </div>
            <div className="flex justify-end">
                <LoadingButton
                    onClick={onSubmit}
                    disabled={!input.trim()}
                    className="min-w-20"
                    loading={mutation.isPending}
                >
                    Post
                </LoadingButton>
            </div>
        </div>
    );
}