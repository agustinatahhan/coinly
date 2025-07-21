import { fetchCoins } from "@/services/coinService"
import { Coin } from "@/types/coin"
import { useQuery } from "@tanstack/react-query"

export const useCoins = () => {
    return useQuery<Coin[]>({
        queryKey: ["coins"],
        queryFn: fetchCoins
    })
}