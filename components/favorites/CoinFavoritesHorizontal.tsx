// components/favorites/FavoriteCoinsHorizontal.tsx

import { useCoins } from "@/hooks/useCoins";
import { useFavorites } from "@/hooks/useFavorites";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text } from "react-native";

const CoinFavoritesHorizontal = () => {
  const { favorites } = useFavorites();
  const { data: coins, isLoading, isError } = useCoins();

  const isPositive = coins?.price_change_percentage_24h >= 0;

  if (isLoading || isError) return null;

  const favoriteCoins =
    coins?.filter((coin) => favorites.includes(coin.id)) || [];

  if (favoriteCoins.length === 0) return null;

  return (
    <FlatList
      data={favoriteCoins}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/(stack)/coin/${item.id}`)}
          className="flex-col items-center justify-between px-8 py-3 bg-highlight/70 rounded-xl mb-2 shadow-transparent"
        >
          <Image
            source={{ uri: item.image }}
            className="w-12 h-12 rounded-full mb-1"
            resizeMode="contain"
          />
          <Text
            className="text-white text-sm font-semibold text-center mb-1"
            numberOfLines={1}
          >
            {item.symbol.toUpperCase()}
          </Text>
          {/* <View className="flex-row items-center mb-[2px]">
            <Text
              className={`font-medium text-xs ${
                isPositive ? "text-success" : "text-danger"
              }`}
            >
              {isPositive ? "+" : ""}
              {item.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View> */}
        </Pressable>
      )}
    />
  );
};

export default CoinFavoritesHorizontal;
