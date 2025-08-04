import CoinsListItem from "@/components/coins/CoinCard";
import CoinFavoritesHorizontal from "@/components/favorites/CoinFavoritesHorizontal";
import HomeLoader from "@/components/loader/HomeLoader";
// import HomeLoader from "@/components/loader/HomeLoader";
import SearchBar from "@/components/searchBar/SearchBar";
import { useCoins } from "@/hooks/useCoins";
import { useFavorites } from "@/hooks/useFavorites";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useCoins();
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const customTabBarStyle = {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    paddingTop: 15,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: showLoader ? { display: "none" } : customTabBarStyle,
    });
  }, [showLoader]);

  const filteredData = data?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showLoader) {
    return <HomeLoader onFinish={() => setShowLoader(false)} />;
  }

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
            <View className="flex justify-center items-start m-0 p-0">
              <Image
                source={require("../../../assets/images/logo-coinly2.png")}
                resizeMode="contain"
                className=" w-[100px] h-[70px]"
              />
            </View>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {favorites.length > 0 && (
              <View className="mt-8">
                <Text className="text-xl font-bold mb-3 text-white">
                  Your Favorites
                </Text>
                <CoinFavoritesHorizontal />
              </View>
            )}

            <View className="mt-3">
              <Text className="text-xl font-bold mb-2 text-white">Market</Text>
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
