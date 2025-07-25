import CoinsList from "@/components/coins/CoinsList";
import SearchBar from "@/components/searchBar/SearchBar";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background text-white">
      <StatusBar style="light" />
      <View className="flex-1 p-4">
        <View className="">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </View>
        <View className="mt-4">
          <Text className="text-lg font-bold mb-2 text-white">Market</Text>
          <CoinsList searchQuery={searchQuery} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
