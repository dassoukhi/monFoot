import useSWR from "swr";

type TabType = "today" | "upcoming" | "live";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLeaguesByType(type: TabType) {
  const { data, error, isLoading, mutate } = useSWR<LeaguesResponse>(
    `/api/leagues-by-type?type=${type}`,
    fetcher,
    {
      // Rafraîchir automatiquement selon le type
      refreshInterval: type === "live" ? 60000 : type === "today" ? 300000 : 0, // 1min pour live, 5min pour today, jamais pour upcoming
      revalidateOnFocus: type !== "upcoming", // Revalider au focus sauf pour upcoming
      dedupingInterval: type === "live" ? 30000 : 60000, // Éviter duplications
    }
  );

  return {
    leagues: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
