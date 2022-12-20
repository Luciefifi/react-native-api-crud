import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function CustomButton({ bg, iconName, text, width, onPress }) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "transparent",
        padding: 6,
        width: width,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bg,
      }}
      onPress={onPress}
    >
      <Entypo name={iconName} size={18} color="white" />
      <Text style={{ color: "white", marginLeft: 5 }}>{text}</Text>
    </TouchableOpacity>
  );
}
