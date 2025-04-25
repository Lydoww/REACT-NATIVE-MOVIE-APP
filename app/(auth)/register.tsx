import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ID, account } from "@/services/appwrite";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import PasswordInput from "@/components/PasswordInput";

export default function RegisterScreen() {
  const { signin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      await account.create(ID.unique(), email, password, name);
      await signin(email, password); // 🔁 login automatique après inscription
      router.replace("/(tabs)");
    } catch (err: any) {
      console.log("Register failed:", err);
      setError("Erreur lors de l'inscription. Vérifie tes infos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        Inscription
      </Text>

      <TextInput
        placeholder="Name"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderRadius: 8,
        }}
        value={name}
        onChangeText={setName}
      />

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
        value={email}
        onChangeText={setEmail}
      />

      <PasswordInput value={password} onChangeText={setPassword}/>

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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        )}
      </TouchableOpacity>
      <View className="mt-4 items-center">
        <Text className="text-gray-500">Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text className="text-blue-500 font-bold mt-2">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
