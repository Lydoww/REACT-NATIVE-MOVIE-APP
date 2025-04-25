import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import PasswordInput from "@/components/PasswordInput";

export default function LoginScreen() {
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signin(email, password);
      router.replace("/(tabs)"); // 🔁 redirige vers ta home (ou autre)
    } catch (err: any) {
      setError("Identifiants incorrects ou erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        Connexion
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderRadius: 8,
        }}
        onChangeText={setEmail}
        value={email}
      />

      <PasswordInput value={password} onChangeText={setPassword} />

      {error !== "" && (
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Se connecter
          </Text>
        )}
      </TouchableOpacity>
      <View className="mt-4 items-center">
        <Text className="text-gray-500">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text className="text-blue-500 font-bold mt-2">
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
