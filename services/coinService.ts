import { Coin, CoinDetail } from "@/types/coin";
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

export const fetchCoinById = async (id: string): Promise<CoinDetail> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    return {
      id: data.id,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      description: data.description?.en || "No description available",
      image: data.image?.large,
      market_data: {
        price: data.market_data?.current_price?.usd,
        change_24h: data.market_data?.price_change_percentage_24h,
        high_24h: data.market_data?.high_24h?.usd,
        low_24h: data.market_data?.low_24h?.usd,
        market_cap: data.market_data?.market_cap?.usd,
        total_volume: data.market_data?.total_volume?.usd,
        ath: data.market_data?.ath?.usd,
        atl: data.market_data?.atl?.usd,
        atl_date: data.market_data?.atl_date,
        ath_date: data.market_data?.atl_date,
        circulating_supply: data.market_data?.circulating_supply,
        total_supply: data.market_data?.total_supply,
        price_change_percentage_1h:
          data.market_data?.price_change_percentage_1h_in_currency?.usd,
        price_change_percentage_7d:
          data.market_data?.price_change_percentage_7d_in_currency?.usd,
        price_change_percentage_30d:
          data.market_data?.price_change_percentage_30d_in_currency?.usd,
        price_change_percentage_1y:
          data.market_data?.price_change_percentage_1y_in_currency?.usd,
      },
      homepage: data.links?.homepage?.[0],
    };
  } catch (error) {
    console.error("Error in fetchCoinById:", error);
    throw error;
  }
};
