import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";
export const fetchCoinMarketChart = async (
  id: string,
  days: string
): Promise<number[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    });
    if (!Array.isArray(data.prices)) {
      throw new Error("Unexpected API response: prices not found.");
    }
    return data.prices.map((point: [number, number]) => point[1]);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};
