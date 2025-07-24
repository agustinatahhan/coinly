import { fetchCoinById, fetchCoins } from "@/services/coinService";
import { Coin, CoinDetail } from "@/types/coin";
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
