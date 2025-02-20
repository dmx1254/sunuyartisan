import OtpVerification from "@/components/OtpVerification";
import { act, fireEvent, render } from "@testing-library/react-native";
import { supabase } from "@/app/lib/supabase";

// Mock de AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

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
    verifyYourOtp: jest.fn().mockReturnValue({ error: null, success: true }),
  }),
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

describe("OtpVerification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the correct text", () => {
    const mockPros = {
      formData: {
        fullname: "John doe",
        phone: "123456789",
        password: "password1254",
        confirmPassword: "password1254",
      },
      countryCode: "+221",
      role: "Particulier",
    };

    const { getByText, getByPlaceholderText } = render(
      <OtpVerification {...mockPros} />
    );
    expect(
      getByText(
        "Veuillez saisir le code OTP envoyé à votre numero de téléphone."
      )
    ).toBeTruthy();
    expect(getByText("Vous n'avez pas reçu le code?")).toBeTruthy();
    expect(getByText("Renvoyer")).toBeTruthy();
    expect(getByText("Valider")).toBeTruthy();

    expect(getByPlaceholderText("_ _ _ _ _ _")).toBeTruthy();
  });

  it("Should handle successfully otp verification", async () => {
    const mockPros = {
      formData: {
        fullname: "John doe",
        phone: "123456789",
        password: "password1254",
        confirmPassword: "password1254",
      },
      countryCode: "+221",
      role: "Particulier",
    };

    const { getByPlaceholderText, getByText } = render(
      <OtpVerification {...mockPros} />
    );

    const mockOtp = jest.fn().mockReturnValue({ error: null, success: true });

    supabase.auth.verifyOtp = mockOtp;

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText("_ _ _ _ _ _"), "123456");
    });

    await act(async () => {
      fireEvent.press(getByText("Valider"));
    });

    // expect(mockOtp).toHaveBeenCalledWith({
    //   token: "123456",
    // });
  });
});
