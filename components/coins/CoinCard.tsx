import { Coin } from "@/types/coin";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
  coin: Coin;
  onPress: () => void;
};

export default function CoinCard({ coin, onPress }: Props) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  // #3e426b96
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between px-4 py-3 bg-[#35396496] rounded-xl mb-2 shadow-accent shadow-md"
      style={{ elevation: 4 }}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: coin.image }}
          className="w-[36px] h-[36px] mr-3 rounded-full"
        />
        <View>
          <Text className="text-white font-semibold text-base">
            {coin.name}
          </Text>
          <Text className="text-gray-400 uppercase text-xs tracking-wider">
            {coin.symbol}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <View className="flex-row items-center mb-[2px]">
          <Ionicons
            name={isPositive ? "trending-up" : "trending-down"}
            size={14}
            color={isPositive ? "#4CAF50" : "#E53935"}
            style={{ marginRight: 4 }}
          />
          <Text
            className={`font-medium text-sm ${
              isPositive ? "text-success" : "text-danger"
            }`}
          >
            {isPositive ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
        <Text className="text-white font-bold text-base">
          ${coin.current_price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
