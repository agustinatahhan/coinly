import CoinsListItem from "@/components/coins/CoinCard";
import CoinFavoritesHorizontal from "@/components/favorites/CoinFavoritesHorizontal";
import SearchBar from "@/components/searchBar/SearchBar";
import { useCoins } from "@/hooks/useCoins";
import { useFavorites } from "@/hooks/useFavorites";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useCoins();
  const { favorites } = useFavorites();

  const filteredData = data?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background ">
      <StatusBar style="light" />

      <FlatList
        className="mb-10"
        data={filteredData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {favorites.length > 0 && (
              <View className="mt-4">
                <Text className="text-lg font-bold mb-2 text-white">
                  Your Favorites
                </Text>
                <CoinFavoritesHorizontal />
              </View>
            )}

            <View className="mt-4">
              <Text className="text-lg font-bold mb-2 text-white">Market</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View className="mt-2">
            <CoinsListItem
              coin={item}
              onPress={() => router.push(`/(stack)/coin/${item.id}`)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
