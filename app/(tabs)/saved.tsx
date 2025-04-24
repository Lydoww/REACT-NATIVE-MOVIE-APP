import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getUserFavorites } from "@/services/favorites";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";

const Saved = () => {
  const router = useRouter();

  const {
    data: favorites,
    loading,
    error,
  } = useFetch<FavoriteMovie[]>(getUserFavorites);

  if (loading) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="bg-primary flex-1 justify-center items-center px-5">
        <Text className="text-red-500 text-center">
          Une erreur est survenue : {error.message}
        </Text>
      </View>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <View className="bg-primary flex-1 justify-center items-center">
        <Image source={icons.save} className="size-10 mb-3" tintColor="#FFF" />
        <Text className="text-gray-500">No saved movies yet</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        className="px-5"
        data={favorites}
        keyExtractor={(item) => item.$id}
        numColumns={2} // ➕ 2 cartes par ligne
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <View className="mt-10">
              <Text className="text-lg text-white font-bold mb-3">
                Your Saved Movies
              </Text>
            </View>
          </>
        }
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 25,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/movies/${item.movie_id}`)}
            className="w-[47%]"
          >
            <Image
              source={{ uri: item.poster_url }}
              className="w-full rounded-lg"
              style={{ aspectRatio: 2 / 3 }}
              resizeMode="cover"
            />
            <Text
              className="text-white text-sm font-semibold mt-3" // ➕ plus de marge ici
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Saved;
