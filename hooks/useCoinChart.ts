import { fetchCoinMarketChart } from "@/services/coinChartService";
import { useQuery } from "@tanstack/react-query";

export const useCoinChart = (id: string, days: string) => {
  return useQuery({
    queryKey: ["coinChart", id, days],
    queryFn: () => fetchCoinMarketChart(id, days),
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
