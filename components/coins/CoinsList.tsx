import { useCoins } from "@/hooks/useCoins";
import React from "react";
import { FlatList, Text } from "react-native";
import CoinLoader from "../loader/CoinLoader";
import CoinCard from "./CoinCard";

const CoinsList = () => {
  const { data, isLoading, isError } = useCoins();

  if (isLoading) return <CoinLoader />;
  if (isError)
    return <Text className="text-red-500">Error fetching coins.</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 12 }}
      renderItem={({ item }) => (
        <CoinCard coin={item} onPress={() => console.log(item.name)} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CoinsList;
