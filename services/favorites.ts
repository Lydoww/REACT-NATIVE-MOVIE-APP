import {
  ID,
  Permission,
  Role,
  account,
  database,
  Query,
} from "@/services/appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_FAVORITES_ID!; // ex: "favorites"

export const likeMovie = async (movie: Movie | MovieDetails) => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not authenticated");

    const permissions = [
      Permission.read(Role.user(user.$id)),
      Permission.update(Role.user(user.$id)),
      Permission.delete(Role.user(user.$id)),
    ];

    await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        user_id: user.$id,
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        liked_at: new Date().toISOString(),
      },
      permissions
    );
  } catch (err) {
    console.error("Erreur lors du like du film :", err);
    throw err;
  }
};

export const isMovieLiked = async (movieId: number) => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User not authenticated");

    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("movie_id", movieId),
      Query.equal("user_id", user.$id),
    ]);

    return res.total > 0;
  } catch (err) {
    console.error("Erreur lors de la vérification du favori :", err);
    return false;
  }
};

export const getUserFavorites = async () => {
  try {
    const user = await account.get();

    const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("user_id", user.$id),
    ]);

    return response.documents as unknown as FavoriteMovie[];
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);

    return [];
  }
};

export const deleteFavorite = async (favoriteId: string) => {
  try {
    await database.deleteDocument(DATABASE_ID, COLLECTION_ID, favoriteId);
  } catch (error) {
    console.error("Erreur lors de la suppression du favori :", error);
    throw error;
  }
};
