import { useCoins } from "@/hooks/useCoins";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import CoinLoader from "../loader/CoinLoader";
import CoinCard from "./CoinCard";

type Props = {
  searchQuery: string;
};

const CoinsList = ({ searchQuery }: Props) => {
  const { data, isLoading, isError } = useCoins();

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

  const filteredData = data?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <CoinCard
          coin={item}
          onPress={() => router.push(`/(stack)/coin/${item.id}`)}
          
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CoinsList;
