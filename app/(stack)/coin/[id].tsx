import CoinChart from "@/components/chart/CoinChart";
import CoinMarketCard from "@/components/coins/CoinMarketCard";
import CoinLoader from "@/components/loader/CoinLoader";
import { useCoinChart } from "@/hooks/useCoinChart";
import { useCoinDetail } from "@/hooks/useCoins";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
      <ScrollView>
        <View className="flex-1 p-4 mx-2">
          {/* Header */}
          <Text className="text-white font-bold text-3xl mt-4">
            {coin?.name}
          </Text>

          <View className="flex-row items-center gap-2 mt-4">
            <Image source={{ uri: coin?.image }} className="w-12 h-12 mb-2" />
            <Text className="text-white">{coin?.symbol}</Text>
          </View>

          <View className="flex-row items-center mt-4 gap-1">
            <Text className="text-white text-5xl font-bold">
              ${coin?.market_data.price.toFixed(2)}{" "}
            </Text>
            <Text
              className={`font-medium text-xl ${
                isPositive ? "text-success" : "text-danger"
              }`}
            >
              {isPositive ? "+" : ""}
              {coin?.market_data.change_24h.toFixed(2)}%
            </Text>
          </View>

          {/* Chart */}
          <View className="items-center justify-center mt-14">
            {chartLoading ? (
              <CoinLoader />
            ) : (
              <CoinChart data={chartData ?? []} />
            )}
          </View>

          {/* Time Range Buttons */}
          <View className="flex-row gap-10 items-center justify-center mt-4">
            {TIME_RANGES.map((rangeOption) => (
              <Pressable
                key={rangeOption.label}
                onPress={() => setRange(rangeOption.value)}
                className={`px-3 py-1 rounded-full ${
                  range === rangeOption.value ? "bg-highlight" : "bg-[#2A2F45]"
                }`}
              >
                <Text className="text-white">{rangeOption.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Key stats */}

          <Text className="text-white font-bold text-xl mt-14 mb-4">
            About {coin?.symbol}
          </Text>
          <View className="flex-col gap-2 mt-2">
            <CoinMarketCard
              title="Market Cap"
              value={`$${coin?.market_data.market_cap?.toLocaleString()}`}
              icon="cash-outline"
            />
            <CoinMarketCard
              title="Circulating Supply"
              value={`${coin?.market_data.circulating_supply?.toFixed(2)} ${coin?.symbol}`}
              icon="repeat-outline"
            />
            <CoinMarketCard
              title="Total Supply"
              value={`${coin?.market_data.total_supply?.toFixed(2)} ${coin?.symbol}`}
              icon="cube-outline"
            />
            <CoinMarketCard
              title="Max 24h"
              value={`$${coin?.market_data.high_24h?.toFixed(2)}`}
              icon="trending-up-outline"
            />
            <CoinMarketCard
              title="Min 24h"
              value={`$${coin?.market_data.low_24h?.toFixed(2)}`}
              icon="trending-down-outline"
            />
            <CoinMarketCard
              title="Volume 24h"
              value={`$${coin?.market_data.total_volume?.toLocaleString()}`}
              icon="bar-chart-outline"
            />
            <CoinMarketCard
              title="All Time High"
              value={`$${coin?.market_data.ath}`}
              icon="arrow-up-circle-outline"
            />
            <CoinMarketCard
              title="All Time Low"
              value={`$${coin?.market_data.atl}`}
              icon="arrow-down-circle-outline"
            />
          </View>

          {/* Resources */}
          <View className="flex-row items-center gap-2 mt-4">
            <Ionicons name="link-outline" size={20} color="#A29BFE" />
            <Link href={coin?.homepage} className="text-highlight text-lg font-bold">
              <Text>Resources</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoinDetail;
