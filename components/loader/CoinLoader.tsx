import React from 'react'
import { Text, View } from 'react-native'

const CoinLoader = () => {
  return (
    <View className="w-8 aspect-square rounded-full border-r-2 border-yellow-500 bg-yellow-300 animate-bounce flex justify-center items-center">
      <Text className="text-yellow-700 text-base font-bold">$</Text>
    </View>
  )
}

export default CoinLoader