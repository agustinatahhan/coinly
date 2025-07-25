import { fetchCoinById, fetchCoins, fetchCoinSearchResult } from "@/services/coinService";
import { Coin, CoinDetail, CoinSearchResult } from "@/types/coin";
import { useQuery } from "@tanstack/react-query";

export const useCoins = () => {
  return useQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    staleTime: 1000 * 60,
  });
};

export const useCoinDetail = (id: string) => {
  return useQuery<CoinDetail>({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id as string),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};

export const useCoinSearch = (query: string) => {
  return useQuery<CoinSearchResult[]>({
    queryKey: ["search", query],
    queryFn: () => fetchCoinSearchResult(query),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
};
