import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import MiniCard from "../components/MiniCard";
import Constant from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const Search = ({ navigation }) => {
  const { colors } = useTheme();
  const mycolor = colors.iconColor;
  const [value, setValue] = useState("");
  //const [miniCardData, setMiniCardData] = useState([]);
  const dispatch = useDispatch();
  const miniCardData = useSelector((state) => {
    return state.cardData;
  });
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyBE0QjeWGCP9jIMeZ8XcBGXLv_dWsCHycA`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch({ type: "add", payload: data.items });
        //setMiniCardData(data.items);
      });
  };

  //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=react&type=video&key=AIzaSyBE0QjeWGCP9jIMeZ8XcBGXLv_dWsCHycA

  return (
    <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          elevation: 5,
          backgroundColor: colors.headerColor,
        }}
      >
        <Ionicons
          style={{ color: mycolor }}
          name="md-arrow-back"
          size={32}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={{
            width: "70%",
            backgroundColor: "#e6e6e6",
          }}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <Ionicons
          style={{ color: mycolor }}
          name="md-send"
          size={32}
          onPress={() => fetchData()}
        />
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 10 }} size="large" color="red" />
      ) : null}

      <FlatList
        data={miniCardData}
        renderItem={({ item }) => {
          return (
            <MiniCard
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
};

export default Search;
