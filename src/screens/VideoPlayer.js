import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Constant from "expo-constants";
import { WebView } from "react-native-webview";

export default ({ route }) => {
  const { videoId, title } = route.params;
  console.log(route.params);
  return (
    <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View
        style={{
          width: "100%",
          height: 200,
        }}
      >
        <WebView
          javaScriptEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          width: Dimensions.get("screen").width - 50,
          margin: 9,
        }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <View style={{ borderBottomWidth: 1 }} />
    </View>
  );
};
