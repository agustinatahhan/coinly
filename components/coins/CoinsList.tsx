import { useCoins } from "@/hooks/useCoins";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";
import CoinLoader from "../loader/CoinLoader";
import CoinCard from "./CoinCard";

const CoinsList = () => {
  const { data, isLoading, isError } = useCoins();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <CoinLoader />
      </View>
    );
  }
  if (isError)
    return <Text className="text-red-500">Error fetching coins.</Text>;

  return (
    <FlatList
      data={data}
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
