import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { getUserDataSelect } from "@/lib/types";
import FollowButton from "../FollowButton";

const WhoToFollow = async () => {
    const { user } = await validateRequest();

    if (!user) return null;

    const usersToFollow = await prisma.user.findMany({
        where: {
            NOT: {
                id: user.id,
            },
            followers: {
                none: {
                    followerId: user.id,
                },
            },
        },
        select: getUserDataSelect(user.id),
        take: 5,
    });

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5">
            <div className="text-xl font-bold">Who to Follow</div>
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
                    <FollowButton
                        userId={user.id}
                        initialState={{
                            totalFollowers: user._count.followers,
                            isFollowedByLoggedInUser: user.followers.some(
                                ({ followerId }) => followerId === user.id,
                            ),
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default WhoToFollow;
