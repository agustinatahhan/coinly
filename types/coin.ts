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
  market_data: {
    price: number;
    change_24h: number;
  };
}