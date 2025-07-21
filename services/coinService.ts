import { Coin } from "@/types/coin";
import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoins = async (): Promise<Coin[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    if (Array.isArray(data)) {
      return data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol?.toUpperCase(),
        image: coin.image,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
      }));
    }

    throw new Error("Unexpected API response structure.");
  } catch (error) {
    console.error("Error in fetchCoins:", error);
    throw error;
  }
};
