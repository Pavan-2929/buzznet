import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostData } from "@/lib/types";
import { MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeletePostDialog from "./DeletePostDialog";

interface PostMoreButtonProps {
    post: PostData;
    className?: string;
}

const PostMoreButton = ({ post, className }: PostMoreButtonProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost" className={className}>
                        <MoreHorizontal className="size-5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                        <span className="flex items-center gap-3 text-destructive">
                            <Trash2 className="size-4" />
                            Delete
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeletePostDialog
                post={post}
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
            />
        </>
    );
};

export default PostMoreButton;
