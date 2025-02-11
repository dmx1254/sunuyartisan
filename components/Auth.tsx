import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { supabase } from "@/app/lib/supabase";
import { Artisan, ArtisanFormData, USER, USERSESSIONID } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "react-native-url-polyfill/auto";

// Types
interface AuthContextType {
  user: USERSESSIONID | null;
  setUser: Dispatch<SetStateAction<USERSESSIONID | null>>;
  session: any | null;
  isSignUpLoading: boolean;
  isSignInLoading: boolean;
  isSignOtpLoading: boolean;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<{ error: any | null; success: boolean }>;
  verifyYourOtp: (
    phone: string,
    otp: string,
    formData: Artisan,
    role: string
  ) => Promise<{ error: any | null; success: boolean }>;
  signUp: (
    phone: string,
    password: string
  ) => Promise<{ error: any | null; success: boolean }>;
  signIn: (
    phone: string,
    password: string
  ) => Promise<{ error: any | null; success: boolean }>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const SESSION_KEY = "supabase.session";

// Fonction utilitaire pour convertir la session en utilisateur
const convertSessionToUser = (session: any): USERSESSIONID | null => {
  if (!session?.user?.id) {
    return null;
  }
  return {
    id: session.user.id,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<USERSESSIONID | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean>(false);
  const [isSignInLoading, setIsSignInLoading] = useState<boolean>(false);
  const [isSignOtpLoading, setIsSignOtpLoading] = useState<boolean>(false);

  // Fonction utilitaire pour nettoyer l'état d'authentification
  const clearAuthState = async () => {
    try {
      // Nettoyage complet de la session
      setUser(null);
      setSession(null);
      // Supprimer toutes les clés liées à l'authentification
      const authKeys = [
        SESSION_KEY,
        "supabase.auth.token",
        "supabase.auth.refreshToken",
      ];
      await AsyncStorage.multiRemove(authKeys);
    } catch (error) {
      console.error("Erreur lors du nettoyage de l'état:", error);
    }
  };

  // Fonction utilitaire pour sauvegarder et mettre à jour la session
  const updateSessionAndUser = async (newSession: any) => {
    setSession(newSession);
    setUser(convertSessionToUser(newSession));
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
  };

  function formatPhoneNumber(phone: string): string {
    // Enlever tous les caractères non numériques
    const cleaned = phone.replace(/\D/g, "");

    // Vérifier si le numéro commence déjà par '+'
    if (phone.startsWith("+")) {
      return phone;
    }

    // Pour le Sénégal, le code pays est +221
    // Si le numéro commence par 221, ajouter juste le '+'
    if (cleaned.startsWith("221")) {
      return `+${cleaned}`;
    }

    // Si le numéro ne commence pas par 221, l'ajouter
    if (cleaned.length === 9) {
      // Numéro local sénégalais
      return `+221${cleaned}`;
    }

    throw new Error("Format de numéro de téléphone invalide");
  }

  // Inscription
  const signUp = async (phone: string, password: string) => {
    try {
      const formattedPhone = formatPhoneNumber(phone);

      setIsSignUpLoading(true);

      const { data: checkUser, error: checkError } = await supabase
        .from("users")
        .select("phone")
        .eq("phone", formattedPhone);

      // Vérifier si le tableau n'est pas vide
      if (checkUser && checkUser.length > 0) {
        // console.log("Cet utilisateur est déjà enregistré");
        return { error: "Cet utilisateur est déjà enregistré", success: false };
      }

      const { data, error } = await supabase.auth.signUp({
        phone: formattedPhone,
        password: password,
      });

      // console.log(phone, password)

      if (error) {
        console.log(error);
        throw error;
      }

      console.log(data);
      console.log("Code otp is successfully send");

      return { error: null, success: true };
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return { error, success: false };
    } finally {
      setIsSignUpLoading(false);
    }
  };

  // Connexion
  const signIn = async (phone: string, password: string) => {
    try {
      setIsSignInLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: phone,
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        await updateSessionAndUser(data.session);
      }

      // console.log(phone, password);

      return { error: null, success: true };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return { error, success: false };
    } finally {
      setIsSignInLoading(false);
    }
  };

  async function addUser(
    userId: string,
    phone: string,
    role: string,
    fullname: string
  ) {
    try {
      // Vérifier si l'utilisateur existe déjà
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single(); // Utilisation de .single() pour attendre un seul utilisateur

      if (fetchError && fetchError.code !== "PGRST116") {
        // Si l'erreur n'est pas "No rows found", on la log
        console.error(
          "Erreur lors de la vérification de l'utilisateur :",
          fetchError
        );
        throw new Error(
          "Une erreur est survenue lors de la vérification de l'utilisateur"
        );
      }

      if (existingUser) {
        console.log("Utilisateur déjà existant, aucune action nécessaire");
        return;
      }

      // Ajouter un nouvel utilisateur
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          phone,
          role,
          fullname,
        },
      ]);

      if (insertError) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", insertError);
        throw new Error("Impossible d'ajouter l'utilisateur");
      }

      console.log("Utilisateur ajouté avec succès");
    } catch (err) {
      console.error("Erreur inattendue :", err);
      throw new Error("Une erreur est survenue lors du traitement");
    }
  }

  //OTP VERIFICATION SIGNUP

  const verifyYourOtp = async (
    phone: string,
    otp: string,
    formData: Artisan,
    role: string
  ) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: "sms",
    });
    if (error) {
      console.error("Erreur lors de la vérification de l'OTP:", error);
      return { error, success: false };
    }
    if (session) {
      await addUser(session.user.id, phone, role, formData.fullname);
      await updateSessionAndUser(session);
    }

    return { error: null, success: true };
  };

  // Rafraîchir la session

  const refreshSession = async () => {
    try {
      const {
        data: { session: refreshedSession },
        error,
      } = await supabase.auth.refreshSession();

      if (error) throw error;

      if (refreshedSession) {
        await updateSessionAndUser(refreshedSession);
      }
    } catch (error) {
      console.error("Erreur lors du refresh de la session:", error);
      await signOut();
    }
  };

  // Déconnexion

  const signOut = async () => {
    try {
      // D'abord nettoyer le stockage local
      await clearAuthState();

      // Ensuite déconnecter de Supabase
      const { error } = await supabase.auth.signOut({
        scope: "global", // Assurez-vous de déconnecter uniquement localement
      });

      if (error) {
        console.error("Erreur lors de la déconnexion:", error);
        return { error, success: false };
      }

      return { error: null, success: true };
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      return { error, success: false };
    }
  };

  // Initialisation et gestion des événements d'authentification

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Vérifier d'abord la session Supabase
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error || !currentSession?.user) {
          // Si pas de session valide, nettoyer
          await clearAuthState();
          return;
        }

        await updateSessionAndUser(currentSession);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'auth:", error);
        await clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Gestionnaire d'événements d'authentification
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth event:", event);

        switch (event) {
          case "SIGNED_IN":
            if (currentSession?.user) {
              await updateSessionAndUser(currentSession);
            }
            break;

          case "SIGNED_OUT":
            await clearAuthState();
            break;

          case "TOKEN_REFRESHED":
          case "USER_UPDATED":
            if (currentSession?.user) {
              await updateSessionAndUser(currentSession);
            } else {
              await clearAuthState();
            }
            break;
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        session,
        refreshSession,
        signOut,
        signUp,
        isSignUpLoading,
        isSignInLoading,
        signIn,
        verifyYourOtp,
        isSignOtpLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
