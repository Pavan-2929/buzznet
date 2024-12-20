"use client";

import { useToast } from "@/hooks/use-toast";
import useFollowersInfo from "@/hooks/useFollowersInfo";
import { FollowerInfo } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const { data } = useFollowersInfo(userId, initialState);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryKey: QueryKey = ["follower-info", userId];
  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByLoggedInUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        totalFollowers:
          (previousState?.totalFollowers || 0) +
          (previousState?.isFollowedByLoggedInUser ? -1 : 1),
        isFollowedByLoggedInUser: !previousState?.isFollowedByLoggedInUser,
      }));

      return { previousState };
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to follow/unfollow. Please try again.",
      });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data.isFollowedByLoggedInUser ? "outline" : "default"}
    >
      {data.isFollowedByLoggedInUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
