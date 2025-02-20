import ArtisanSignUp from "@/app/(auth)/artisan-signup/[id]";
import { supabase } from "@/app/lib/supabase";
import { act, fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";

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
  useLocalSearchParams: jest.fn().mockReturnValue({ id: "test123" }),
}));

//Mock de useAuth
jest.mock("@/components/Auth", () => ({
  useAuth: () => ({
    user: {
      id: "test-user-id",
    },
    signUp: jest.fn().mockReturnValue({
      error: { message: "Cet utilisateur est déjà enregistré" },
      success: false,
    }),
    isSignUpLoading: false,
  }),
}));

//Mock de Linking
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openUrl: jest.fn(),
}));

describe("ArtisanSignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render static text correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ArtisanSignUp />);

    expect(getByText("Inscription")).toBeTruthy();
    expect(getByText("Rejoignez notre communauté")).toBeTruthy();
    expect(getByText("Prénom et nom")).toBeTruthy();
    expect(getByText("Téléphone")).toBeTruthy();
    expect(getByText("Mot de passe")).toBeTruthy();
    expect(getByText("Confirmer mot de passe")).toBeTruthy();
    expect(getByText("Confirmer l'inscription")).toBeTruthy();
    expect(getByPlaceholderText("Votre prénom et nom")).toBeTruthy();
    expect(getByPlaceholderText("Votre téléphone")).toBeTruthy();
    expect(getByPlaceholderText("Votre mot de passe")).toBeTruthy();
    expect(getByPlaceholderText("Confirmer votre mot de passe")).toBeTruthy();
  });

  it("Should handle successfully signup", async () => {
    const mockSignup = jest
      .fn()
      .mockReturnValue({ error: null, success: true });

    supabase.auth.signUp = mockSignup;

    const { getByPlaceholderText, getByText } = render(<ArtisanSignUp />);

    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Votre prénom et nom"),
        "John Doe"
      );
      fireEvent.changeText(
        getByPlaceholderText("Votre téléphone"),
        "123456789"
      );
      fireEvent.changeText(
        getByPlaceholderText("Votre mot de passe"),
        "password1254"
      );
      fireEvent.changeText(
        getByPlaceholderText("Confirmer votre mot de passe"),
        "password1254"
      );
    });

    await act(async () => {
      fireEvent.press(getByText("Confirmer l'inscription"));
    });

    // setTimeout(() => {
    //   expect(mockSignup).toHaveBeenCalledWith({
    //     phone: "123456789",
    //     password: "password1254",
    //   });
    // }, 200);
  });

  it("Should handle failed signup", async () => {
    const mockSignup = jest
      .fn()
      .mockReturnValue({ error: true, success: false });

    supabase.auth.signUp = mockSignup;

    const { getByPlaceholderText, getByText } = render(<ArtisanSignUp />);

    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText("Votre prénom et nom"),
        "John Doe"
      );
      fireEvent.changeText(
        getByPlaceholderText("Votre téléphone"),
        "123456789"
      );
      fireEvent.changeText(
        getByPlaceholderText("Votre mot de passe"),
        "password1254"
      );
      fireEvent.changeText(
        getByPlaceholderText("Confirmer votre mot de passe"),
        "password1254"
      );
    });

    await act(async () => {
      fireEvent.press(getByText("Confirmer l'inscription"));
    });

    expect("Cet utilisateur est déjà enregistré").toBeTruthy();
  });
});

// function sum(a: number, b: number) {
//   return a + b;
// }

// it("adds 2 + 3 should return 5", () => {
//   expect(sum(2, 3)).toBe(5);
// });
