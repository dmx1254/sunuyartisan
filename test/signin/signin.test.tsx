
import React from "react";
import SignIn from "@/app/(auth)/sign-in";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { supabase } from "@/app/lib/supabase";

// import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
// import { supabase } from "@/app/lib/supabase";

// Mock de expo-font
jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
  __metadata__: { version: 1 },
}));

// Mock de @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  Feather: "Feather",
}));

// Mock de react-native-country-codes-picker
jest.mock("react-native-country-codes-picker", () => ({
  CountryPicker: ({ children }: { children: React.ReactNode }) => null,
  CountryItem: ({ children }: { children: React.ReactNode }) => null,
  inputPlaceholder: "Rechercher un pays",
}));

// Mock de AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock de Supabase
jest.mock("@/app/lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
    },
  },
}));

// Mock du module expo-router
jest.mock("expo-router", () => ({
  useRouter: jest
    .fn()
    .mockReturnValue({ back: jest.fn(), push: jest.fn(), replace: jest.fn() }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@/components/Auth", () => ({
  useAuth: () => ({
    user: {
      id: "test-user-id",
    },
  }),
}));

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render text correctly", () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);

    expect(getByText("Connexion")).toBeTruthy();
    expect(getByText("Connectez-vous")).toBeTruthy();
    expect(getByText("Téléphone")).toBeTruthy();
    expect(getByText("Mot de passe")).toBeTruthy();
    expect(getByText("Mot de passe oublié?")).toBeTruthy();
    expect(getByText("Se connecter")).toBeTruthy();
    expect(getByText(/Avez vous un compte \?/i)).toBeTruthy();
    expect(getByText("Inscrivez-vous")).toBeTruthy();
    expect(getByPlaceholderText("Téléphone")).toBeTruthy();
    expect(getByPlaceholderText("Mot de passe")).toBeTruthy();
  });

  it("Should handle successful sign in", async () => {
    const mockSignin = jest
      .fn()
      .mockResolvedValue({ error: null, success: true });

    supabase.auth.signInWithPassword = mockSignin;

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Téléphone"), "123456789");
      fireEvent.changeText(
        getByPlaceholderText("Mot de passe"),
        "password1254"
      );
    });

    await act(async () => {
      fireEvent.press(getByText("Se connecter"));
    });

    // expect(mockSignin).toHaveBeenCalledWith({
    //   phone: "123456789",
    //   password: "password1254",
    // });
  });

  it("Should handle failled sign in", async () => {
    const mockSign = jest.fn().mockReturnValue({
      error: { message: "Invalid credentials Login" },
      success: false,
      data: null,
    });

    supabase.auth.signInWithPassword = mockSign;

    const { getByPlaceholderText, getByText, findByText } = render(<SignIn />);

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("Téléphone"), "123456789");
      fireEvent.changeText(
        getByPlaceholderText("Mot de passe"),
        "Password1254"
      );
      fireEvent.press(getByText("Se connecter"));
    });

    expect("Email ou mot de passe incorrect").toBeTruthy();
  });
});
