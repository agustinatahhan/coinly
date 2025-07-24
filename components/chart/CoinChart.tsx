import * as shape from "d3-shape";
import React from "react";
import { View } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart } from "react-native-svg-charts";

interface CoinChartProps {
  data: number[];
  color?: string;
}

const CoinChart = ({ data, color = "#00FFB3" }: CoinChartProps) => {
  const Gradient = () => (
    <Defs key={"gradient"}>
      <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor={color} stopOpacity={0.8} />
        <Stop offset="100%" stopColor={color} stopOpacity={0.1} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View className="h-48 w-full rounded-xl overflow-hidden">
      <LineChart
        style={{ flex: 1 }}
        data={data}
        curve={shape.curveMonotoneX}
        svg={{
          stroke: "url(#gradient)",
          strokeWidth: 3,
        }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Gradient />
      </LineChart>
    </View>
  );
};

export default CoinChart;
