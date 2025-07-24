import CoinChart from "@/components/chart/CoinChart";
import CoinMarketCard from "@/components/coins/CoinMarketCard";
import CoinLoader from "@/components/loader/CoinLoader";
import { useCoinChart } from "@/hooks/useCoinChart";
import { useCoinDetail } from "@/hooks/useCoins";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

const TIME_RANGES = [
  { label: "1D", value: "1" },
  { label: "1W", value: "7" },
  { label: "1M", value: "30" },
];

const CoinDetail = () => {
  const { id } = useLocalSearchParams();
  const [range, setRange] = useState("1"); // default to 1D

  const { data: coin, isLoading, isError } = useCoinDetail(id as string);
  const { data: chartData, isLoading: chartLoading } = useCoinChart(
    id as string,
    range
  );

  if (!id) return null;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <CoinLoader />
      </View>
    );
  }

  if (isError) {
    return <Text className="text-red-500">Error fetching coin data.</Text>;
  }

  const isPositive = coin?.market_data.change_24h >= 0;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4 mx-4 ">
        {/* Header */}
        <View className="items-center mt-5">
          <View className="flex-row items-center justify-center gap-2">
            <Image source={{ uri: coin?.image }} className="w-12 h-12 mb-2" />
          </View>
          <Text className="text-white text-3xl font-bold">
            {coin?.market_data.price.toFixed(2)} {coin?.symbol}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text
              className={`font-medium text-sm ${
                isPositive ? "text-success" : "text-danger"
              }`}
            >
              {isPositive ? "+" : ""}
              {coin?.market_data.change_24h}%
            </Text>
          </View>
        </View>

        {/* Chart */}
        <View className="items-center justify-center">
          {chartLoading ? <CoinLoader /> : <CoinChart data={chartData} />}
        </View>

        {/* Time Range Buttons */}
        <View className="flex-row justify-center ">
          {TIME_RANGES.map((rangeOption) => (
            <Pressable
              key={rangeOption.label}
              onPress={() => setRange(rangeOption.value)}
              className={`px-3 py-1 rounded-full ${
                range === rangeOption.value ? "bg-accent" : "bg-[#2A2F45]"
              }`}
            >
              <Text className="text-white">{rangeOption.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Key stats*/}

        <View className="">
          <View className="flex-row justify-between">
            <Text className="text-white">Máximo 24h</Text>
            <Text className="text-white">
              ${coin?.market_data.high_24h?.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white">Mínimo 24h</Text>
            <Text className="text-white">
              ${coin?.market_data.low_24h?.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white">Market Cap</Text>
            <Text className="text-white">
              ${coin?.market_data.market_cap?.toLocaleString()}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <CoinMarketCard
              title="Volume 24hs"
              value={coin?.market_data.total_volume?.toLocaleString()}
              className="text-white"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoinDetail;
