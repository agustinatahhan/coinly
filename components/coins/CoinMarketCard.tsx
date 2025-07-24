import React from 'react'
import { Text, View } from 'react-native'

type Props = {
    title: string,
    value: any,
    className?: string
}
const CoinMarketCard = ({title, value, className}: Props) => {
  return (
    <View className={`${className}`}>
      <Text className={`${className}`}>{title} {value}</Text>
    </View>
  )
}

export default CoinMarketCard