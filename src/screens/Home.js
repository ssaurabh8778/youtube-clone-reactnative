import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "../components/Card";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
export default function HomeScreen() {
  const cardData = useSelector((state) => {
    return state.cardData;
  });
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header />
      <FlatList
        data={cardData}
        renderItem={({ item }) => {
          return (
            <Card
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
        keyExtractor={(item) => item.id.videoId}
      />
    </View>
  );
}
