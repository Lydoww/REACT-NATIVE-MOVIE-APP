// hooks/useRedirect.ts
import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export const useRedirect = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments, loading]);
};
