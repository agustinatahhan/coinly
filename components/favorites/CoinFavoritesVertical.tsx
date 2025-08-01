import CoinCard from "@/components/coins/CoinCard";
import CoinLoader from "@/components/loader/CoinLoader";
import { useCoins } from "@/hooks/useCoins";
import { useFavorites } from "@/hooks/useFavorites";
import { router } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const CoinFavoritesVertical = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { data: coins, isLoading, isError } = useCoins();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <CoinLoader />
      </View>
    );
  }

  if (isError) {
    return <Text className="text-red-500">Error fetching coins.</Text>;
  }

  const favoriteCoins =
    coins?.filter((coin) => favorites.includes(coin.id)) || [];

  if (favoriteCoins.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-white text-xl">No favorite coins yet 💔</Text>
      </SafeAreaView>
    );
  }
  return (
    <FlatList
      data={favoriteCoins}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CoinCard
          coin={item}
          onPress={() => router.push(`/(stack)/coin/${item.id}`)}
          isFavorite={true}
          onToggleFavorite={() => toggleFavorite(item.id)}
        />
      )}
    />
  );
};

export default CoinFavoritesVertical;
