"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsSkeletonLoader from "@/components/SkeletonLoaders/PostsSkeletonLoader";
import kyInstance from "@/lib/ky";
import { PostPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const FollowingFeed = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "following"],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    "/api/posts/following",
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<PostPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastpage) => lastpage.nextCursor,
    });
    const posts = data?.pages.flatMap((page) => page.posts) || [];

    if (status === "pending") {
        return <PostsSkeletonLoader />;
    }

    if (status === "success" && !hasNextPage && !posts.length) {
        return <p className="text-center font-bold text-primary">
            No posts here. Start people following.
        </p>
    }

    if (status === "error") {
        return (
            <p className="text-center font-semibold text-destructive">
                Something went wrong while fetching posts.
            </p>
        );
    }

    return (
        <InfiniteScrollContainer onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()} className="space-y-5">
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
            {isFetching && <Loader2 className="animate-spin my-3 mx-auto" />}
        </InfiniteScrollContainer>
    );
};

export default FollowingFeed;
