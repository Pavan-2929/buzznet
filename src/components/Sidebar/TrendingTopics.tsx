import prisma from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import Link from "next/link";

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
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="mb-5 text-xl font-bold">Trenidng Topics</div>
            {trendingTopicsData.map(({ hashtag, count }) => {
                const title = hashtag.split("#")[1];

                return (
                    <Link href={`/hashtag/${title}`} className="block">
                        <p
                            className="line-clamp-1 font-medium hover:underline"
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

export default TrendingTopics;