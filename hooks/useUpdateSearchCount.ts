import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSearchCount } from "@/services/appwrite";

export function useUpdateSearchCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ query, movie }: { query: string; movie: Movie }) =>
      updateSearchCount(query, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trendingMovies"] });
    },
  });
}
