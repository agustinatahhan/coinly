// components/favorites/FavoriteCoinsHorizontal.tsx

import { useCoins } from "@/hooks/useCoins";
import { useFavorites } from "@/hooks/useFavorites";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text } from "react-native";

const CoinFavoritesHorizontal = () => {
  const { favorites } = useFavorites();
  const { data: coins, isLoading, isError } = useCoins();

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
          className="flex-col items-center justify-between px-4 py-3 bg-[#35396496] rounded-xl mb-2 shadow-transparent"
        >
          <Image
            source={{ uri: item.image }}
            className="w-12 h-12 rounded-full mb-1"
            resizeMode="contain"
          />
          <Text className="text-white text-sm text-center" numberOfLines={1}>
            {item.symbol.toUpperCase()}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default CoinFavoritesHorizontal;
