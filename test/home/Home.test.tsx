import React from "react";
import { render, RenderResult } from "@testing-library/react-native";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import Home from "@/app/(root)/(tabs)";
import { supabase } from "@/app/lib/supabase";
import { NotificationProvider } from "@/context/NotificationContext";

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

// Mock de AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock du NotificationContext
jest.mock("@/context/NotificationContext", () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useNotification: () => ({
    notification: null,
    expoPushToken: "test-token",
    error: null,
  }),
}));

// Mock de Auth
jest.mock("@/components/Auth", () => ({
  useAuth: () => ({
    user: {
      id: "test-user-id",
      fullname: "Test User",
    },
  }),
}));

// Mock de Supabase avec toutes les méthodes nécessaires
jest.mock("@/app/lib/supabase", () => {
  const subscription = {
    unsubscribe: jest.fn(),
  };

  const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(), // Ajout de range
    in: jest.fn().mockReturnThis(),
    then: jest.fn().mockResolvedValue({ data: [], error: null }),
    single: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockReturnThis(),
    csv: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    headers: {},
    url: new URL("http://localhost"),
  } as unknown as PostgrestQueryBuilder<any, any>;

  const channel = {
    on: jest.fn().mockReturnThis(),
    subscribe: jest.fn().mockReturnValue(subscription),
  };

  return {
    supabase: {
      from: jest.fn(() => mockQueryBuilder),
      channel: jest.fn(() => channel),
      auth: {
        onAuthStateChange: jest.fn(() => ({
          data: { subscription },
          error: null,
        })),
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null,
        }),
      },
    },
  };
});

// Type pour les props du Provider
interface ProvidersProps {
  children: React.ReactNode;
}

// Wrapper personnalisé
const AllTheProviders = ({ children }: ProvidersProps) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

// Fonction de rendu personnalisée avec type
const customRender = (ui: React.ReactElement, options = {}): RenderResult => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should setup Supabase subscriptions", () => {
    customRender(<Home />);

    // Vérifie que channel a été appelé avec les bons noms
    expect(supabase.channel).toHaveBeenCalledWith("message_changes");
    expect(supabase.channel).toHaveBeenCalledWith("appointment_changes");
  });

  it("should clean up subscriptions on unmount", () => {
    const { unmount } = customRender(<Home />);

    // Crée un canal test pour vérifier
    const testChannel = supabase.channel("test_channel");
    const subscription = testChannel.subscribe();

    unmount();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it("should fetch initial data", async () => {
    const fromSpy = jest.spyOn(supabase, "from");

    customRender(<Home />);
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Vérifie les appels à from
    expect(fromSpy.mock.calls.map((call) => call[0])).toEqual([
      "users",
      "users",
      "artisan_detail",
    ]);
  });
});

// function sum(a: number, b: number) {
//   return a + b;
// }

// it("adds 2 + 3 should return 5", () => {
//   expect(sum(2, 3)).toBe(5);
// });
