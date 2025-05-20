import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/suggestionService";
import type { SuggestionItem } from "../types/formula";

export const useSuggestions = (query: string) => {
  return useQuery<SuggestionItem[], Error>({
    queryKey: ["suggestions", query],
    queryFn: () => getSuggestions(query),
    enabled: query.length > 0, // Only fetch when there's a query
    staleTime: 60000, // 1 minute
  });
};
