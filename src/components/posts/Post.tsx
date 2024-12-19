import { PostData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";
import moment from "moment"

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  console.log(post);
  return (
    <div className="space-y-3 rounded-2xl bg-card p-5 shadow-md ">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`user/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>
        <div>
          <Link
            className="block text-lg font-bold"
            href={`/user/${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <Link
            href={`/post/${post.id}}`}
            className="text-sm text-muted-foreground"
          >
            {moment(post.createdAt).fromNow()}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line break-words">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
