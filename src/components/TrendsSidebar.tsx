import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import React, { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";

const TrendsSidebar = () => {
    return (
        <div className="sticky top-[6rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
            <Suspense fallback={<Loader2 className="mx-auto size-6 animate-spin" />}>
                <WhoToFollow />
                <TrendingTopics />
            </Suspense>
        </div>
    );
};

const WhoToFollow = async () => {
    const { user } = await validateRequest();

    if (!user) return null;

    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id,
            },
        },
        select: userDataSelect,
        take: 5,
    });

    return (
        <div className="rounded-3xl bg-card p-5">
            <p className="mb-5 text-xl font-bold">Who to follow</p>
            {usersToFollow.map((user) => (
                <div key={user.id} className="flex w-full items-center justify-between">
                    <Link
                        href={`/user/${user.username}`}
                        className="flex items-center gap-3"
                    >
                        <UserAvatar avatarUrl={user.avatarUrl} />
                        <div>
                            <p className="line-clamp-1 text-[15px] font-semibold hover:underline">
                                @{user.username}
                            </p>
                            <p className="line-clamp-1 text-sm text-muted-foreground">
                                {user.displayName}
                            </p>
                        </div>
                    </Link>
                    <Button>Follow</Button>
                </div>
            ))}
        </div>
    );
};

const getTrendingTopics = unstable_cache(
    async () => {
        const result = await prisma.$queryRaw<
            {
                hashtag: string;
                count: BigInt;
            }[]
        >`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

        return result.map((row) => ({
            hashtag: row.hashtag,
            count: Number(row.count),
        }));
    },
    ["trending_topics"],
    {
        revalidate: 3 * 60 * 60,
    },
);

const TrendingTopics = async () => {
    const trendingTopicsData = await getTrendingTopics();

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-md">
            <div className="mb-5 text-xl font-bold">Trenidng Topics</div>
            {trendingTopicsData.map(({ hashtag, count }) => {
                const title = hashtag.split("#")[1];

                return (
                    <Link href={`/hashtag/${title}`} className="block">
                        <p
                            className="line-clamp-1 font-semibold hover:underline"
                            title="hashtag"
                        >
                            {hashtag}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatNumber(count)} {count === 1 ? "post" : "posts"}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default TrendsSidebar;
