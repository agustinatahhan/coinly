import CoinsList from "@/components/coins/CoinsList";
import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background text-white">
       <StatusBar style="light" />
      <View className="flex-1 p-4">
        <Text className="text-lg font-bold mb-2 text-white">Market</Text>
        <CoinsList />
      </View>
      
    </SafeAreaView>
  );
};

export default Home;
