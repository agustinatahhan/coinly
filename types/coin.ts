export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  homepage?: string;
  market_data: {
    price: number;
    change_24h: number;
    high_24h?: number;
    low_24h?: number;
    market_cap?: number;
    market_cap_rank?: number;
    total_volume?: number;
    ath?: number;
    atl?: number;
    ath_date?: Date;
    atl_date?: Date;
    circulating_supply?: number;
    total_supply?: number;
    price_change_percentage_1h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_1y?: number;
  };
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string
}