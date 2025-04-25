import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

const PasswordInput = ({
  value,
  onChangeText,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <View className="flex-row items-center border rounded-lg mb-3 px-3">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        placeholder="Password"
        className="flex-1 py-3 text-base"
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}

export default PasswordInput;
