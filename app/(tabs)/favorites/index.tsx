import CoinFavoritesVertical from "@/components/favorites/CoinFavoritesVertical";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const Favorites = () => {

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4 ">
        <Text className="text-white text-xl font-bold my-4">Favorites</Text>
        <CoinFavoritesVertical />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
