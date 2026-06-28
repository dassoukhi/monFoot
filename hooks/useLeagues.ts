import useSWR from "swr";

/**
 * Fetcher pour SWR - appelle l'API Next.js
 */
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

/**
 * Hook SWR personnalisé pour charger les ligues
 *
 * @returns {object} - { data, error, isLoading, mutate }
 *
 * @example
 * ```tsx
 * const { data: leagues, error, isLoading } = useLeagues();
 *
 * if (isLoading) return <LoaderCercle />;
 * if (error) return <div>Error loading leagues</div>;
 * ```
 */
export const useLeagues = () => {
  const { data, error, isLoading, mutate } = useSWR<LeaguesResponse>(
    "/api/leagues",
    fetcher,
    {
      revalidateOnFocus: false, // Ne pas revalider au focus de la fenêtre
      revalidateOnReconnect: true, // Revalider à la reconnexion
      dedupingInterval: 60000, // Dédupliquer les requêtes pendant 60 secondes
      refreshInterval: 0, // Pas de refresh automatique (utiliser le cache Redis)
      shouldRetryOnError: true, // Retry en cas d'erreur
      errorRetryCount: 3, // Max 3 retries
      errorRetryInterval: 5000, // 5 secondes entre chaque retry
    }
  );

  return {
    leagues: data,
    error,
    isLoading,
    mutate, // Fonction pour revalider manuellement
  };
};
