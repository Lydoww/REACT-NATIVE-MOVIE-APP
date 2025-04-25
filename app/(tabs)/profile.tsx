import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useQuery } from "@tanstack/react-query";
import { getUserFavorites } from "@/services/favorites";

const Profile = () => {
  const { user, signout } = useAuth();
  const router = useRouter();

  const { data: favorites, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: getUserFavorites,
  });

  const handleLogout = async () => {
    await signout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5 pt-10"
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* Avatar + Infos */}
        <View className="items-center mt-10">
          <Text className="text-white text-xl font-bold mt-4">
            {user?.name ?? "Utilisateur"}
          </Text>
          <Text className="text-light-200 text-sm mt-1">
            {user?.email ?? "No email"}
          </Text>
        </View>

        {/* Section infos (ex. nombre de favoris plus tard ?) */}
        <View className="mt-10 bg-dark-100 rounded-xl p-5">
          <Text className="text-white font-bold text-lg mb-3">
            Account Info
          </Text>
          <Text className="text-light-200 text-sm">
            Nom : {user?.name ?? "-"}
          </Text>
          <Text className="text-light-200 text-sm mt-2">
            Email : {user?.email ?? "-"}
          </Text>
          <Text className="text-light-200 text-sm mt-2">
            Nombre de favoris :{" "}
            {isLoadingFavorites ? "..." : favorites?.length ?? 0}
          </Text>
        </View>

        {/* Déconnexion */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 flex-row items-center justify-center gap-2 py-4 rounded-xl mt-10"
        >
          <Text className="text-white font-bold text-base">Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
