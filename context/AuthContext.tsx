import { View, Text } from "react-native";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { Models } from "appwrite";
import { account } from "@/services/appwrite";

// Le type du CONTEXTE
interface AuthContextProps {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

// Le type du PROVIDER uniquement
interface AuthProviderProps {
  children: ReactNode;
}

// Création du contexte avec typage
const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const signin = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);
    } catch (error) {
      console.log("Login failed", error);
      throw error;
    }
  };

  const signout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const checkUserSession = async () => {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const contextData: AuthContextProps = {
    user,
    loading,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

// Hook d’accès au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
