import { validateRequest } from "@/auth";
import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { deletePostAction } from "./actions";
import { PostPage } from "@/lib/types";

export const useDeletePostMutation = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePostAction,
    onSuccess: async (deletedPost) => {
      const queryFilter = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletedPost.id),
            })),
          };
        },
      );
      toast({
        description: "Post deleted successfully",
      });

      if (pathname === `/post/${deletedPost.id}`) {
        router.replace("/");
      }
    },

    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete post. Please try again.",
      });
    },
  });

  return mutation;
};
