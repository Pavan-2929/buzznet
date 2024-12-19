"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsSkeletonLoader from "@/components/SkeletonLoaders/PostsSkeletonLoader";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const ForYouFeed = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["post-feed", "for-you-feed"],
        queryFn: ({ pageParam }) =>
            kyInstance
                .get(
                    "/api/posts/for-you",
                    pageParam ? { searchParams: { cursor: pageParam } } : {},
                )
                .json<PostPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastpage) => lastpage.nextCursor,
    });
    console.log(data)
    const posts = data?.pages.flatMap((page) => page.posts) || [];
    console.log(posts);

    if (status === "pending") {
        return <PostsSkeletonLoader />;
    }

    if (status === "success" && !hasNextPage && !posts.length) {
        return <p className="text-center font-bold text-primary text-center">
            No one hase posted anything yet
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

export default ForYouFeed;
