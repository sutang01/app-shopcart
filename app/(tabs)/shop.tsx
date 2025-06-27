import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeHeader from '@/components/HomeHeader'

const ShopScreen = () => {
  return (
    <SafeAreaView>
      <HomeHeader />
      <View>
        <Text>Shop</Text>
      </View>
    </SafeAreaView>
  )
}

export default ShopScreen

const styles = StyleSheet.create({})