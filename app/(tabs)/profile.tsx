import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

const Profile = () => {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex-1 justify-center items-center gap-5">
        <Image source={icons.person} className="w-10 h-10" tintColor="#FFF" />
        <Text className="text-gray-500 text-xl font-semibold">
          {user?.name ?? "Utilisateur"}
        </Text>

        <TouchableOpacity
          className="mt-6 bg-red-500 px-6 py-3 rounded-xl"
          onPress={handleLogout}
        >
          <Text className="text-white font-bold">Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
