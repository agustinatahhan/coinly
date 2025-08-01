import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder = "Search" }: Props) => {
  return (
    <View className="flex-row items-center bg-[#a29bfe89] px-4 py-3
     rounded-xl mt-4">
      <Ionicons name="search" size={30} color="#fff" style={{ marginRight: 8 }} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        className="text-white flex-1"
      />
    </View>
  );
};

export default SearchBar;
