import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='sign_in' options={{headerShown: false}}/>
      <Stack.Screen name='sign_up' options={{headerShown: false}}/>
    </Stack>
  )
}

const styles = StyleSheet.create({})