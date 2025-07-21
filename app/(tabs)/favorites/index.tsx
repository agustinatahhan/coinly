import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const Favorites = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        <Text className="text-lg font-bold mb-2 text-white">Favorites</Text>
      </View>
    </SafeAreaView>
  )
}

export default Favorites