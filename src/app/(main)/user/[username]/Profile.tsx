"use client";

import UserAvatar from "@/components/UserAvatar";
import { FollowerInfo, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import FollowerCount from "./FollowerCount";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";

interface ProfileProps {
  user: UserData;
  loggedInUserId: string;
}
const Profile = ({ user, loggedInUserId }: ProfileProps) => {
  const followerInfo: FollowerInfo = {
    totalFollowers: user._count.followers,
    isFollowedByLoggedInUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };
  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={42}
        className="mx-auto size-full max-h-48 max-w-48 rounded-full"
      />
      <div className="flex w-full flex-wrap justify-between gap-3 pt-5 sm:flex-nowrap">
        <div className="space-y-5">
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
          <div>
            <p>Member Since {user.createdAt.toUTCString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span>
              Posts:{" "}
              <span className="font-semibold">
                {formatNumber(user._count.posts)}
              </span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        <div>
          {loggedInUserId === user.id ? (
            <Button>Edit Profile</Button>
          ) : (
            <FollowButton userId={user.id} initialState={followerInfo} />
          )}
        </div>
      </div>
      {user.bio && (
        <Linkify>
          <hr />
          <div>
            <p className="overflow-hidden whitespace-pre-line break-words">
              {user.bio}
            </p>
          </div>
        </Linkify>
      )}
    </div>
  );
};

export default Profile;
