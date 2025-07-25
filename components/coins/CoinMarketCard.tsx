import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
  value: any;
  className?: string;
    icon?: keyof typeof Ionicons.glyphMap;

};
const CoinMarketCard = ({ title, value, className, icon = "stats-chart-outline"  }: Props) => {
  return (
    <View className="flex-row items-center bg-[#35396496] p-4 rounded-xl mb-2 shadow-sm">
      <Ionicons name={icon} size={20} color="#A29BFE" className="mr-3" />
      <View className="flex-1">
        <Text className="text-white text-sm font-medium">{title}</Text>
        <Text className="text-white text-base font-bold">{value}</Text>
      </View>
    </View>
  );
};

export default CoinMarketCard;
