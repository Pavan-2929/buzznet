import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { Button } from "../ui/button";

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

export default WhoToFollow;