import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='single_view_product'/>
    </Stack>
  )
}
