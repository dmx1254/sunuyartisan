// featuredartisans.test.tsx
import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";
import FeaturedArtisans from "@/components/FeaturedArtisans";
import { supabase } from "@/app/lib/supabase";
import { AuthProvider } from "@/components/Auth";
import { NotificationProvider } from "@/context/NotificationContext";
import { FlatList } from "react-native";
import Filters from "@/components/Filters";

// Mock AsyncStorage en premier
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock des dépendances
jest.mock("expo-font", () => ({
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn(),
  __metadata__: { version: 1 },
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  Feather: "Feather",
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock de l'Auth context
jest.mock("@/components/Auth", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: {
      id: "test-user-id",
      fullname: "Test User",
    },
  }),
}));

// Mock de NotificationContext
jest.mock("@/context/NotificationContext", () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useNotification: () => ({
    notification: null,
    expoPushToken: "test-token",
    error: null,
  }),
}));

// Type pour PostgrestQueryBuilder
type MockBuilder = PostgrestQueryBuilder<any, any, string, unknown>;

// Fonction helper pour créer un mock builder
const createMockBuilder = (returnValue: any): MockBuilder => {
  const mockObject = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    then: jest.fn().mockResolvedValue(returnValue),
    url: new URL("http://localhost/getArtisans"),
    headers: {},
    body: null,
    shouldThrowOnError: false,
    throwOnError: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    filter: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockReturnThis(),
    csv: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  } as unknown as MockBuilder;

  return mockObject;
};

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

// Mock des composants
jest.mock("@/components/Card", () => ({
  Card: () => "Card",
  FeaturedCard: () => "FeaturedCard",
}));

jest.mock("@/components/Search", () => () => "Search");
jest.mock("@/components/Filters", () => () => "Filters");
jest.mock("@/components/MetierSkeleton", () => () => "MetierSkeleton");

// Wrapper pour les providers
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </AuthProvider>
  );
};

// Fonction de rendu personnalisée
const customRender = (ui: React.ReactElement) =>
  render(ui, { wrapper: Wrapper });

describe("FeaturedArtisans", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user data on mount", async () => {
    const mockUserData = {
      data: [{ fullname: "Test User", avatar: "test-avatar.jpg" }],
      error: null,
    };

    const mockBuilder = createMockBuilder(mockUserData);
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    customRender(<FeaturedArtisans />);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("users");
    });
  });

  it("should fetch artisans data", async () => {
    const mockArtisansData = {
      data: [
        {
          id: "1",
          artisanId: "artisan1",
          user: {
            fullname: "Artisan 1",
            avatar: "avatar1.jpg",
          },
        },
      ],
      error: null,
    };

    const mockBuilder = createMockBuilder(mockArtisansData);
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    customRender(<FeaturedArtisans />);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("artisan_detail");
      expect(mockBuilder.select).toHaveBeenCalled();
    });
  });

  it("should handle refresh", async () => {
    const mockBuilder = createMockBuilder({ data: [], error: null });
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    const { getAllByText } = customRender(<FeaturedArtisans />);

    await act(async () => {
      // Récupérer tous les boutons "Voir tous"
      const viewAllButtons = getAllByText(/voir tous/i);
      expect(viewAllButtons).toHaveLength(2);

      // Cliquer sur le premier bouton (Services)
      fireEvent.press(viewAllButtons[0]);
    });

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalled();
    });
  });

  it("should handle category selection", async () => {
    const mockBuilder = createMockBuilder({ data: [], error: null });
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    const { getAllByText } = customRender(<FeaturedArtisans />);

    await act(async () => {
      // Au lieu de chercher par testID, nous pouvons chercher directement par le texte
      // de la catégorie "tous" qui est toujours présent
      const categoryAll = getAllByText(/tous/i);
      fireEvent.press(categoryAll);
    });

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("artisan_detail");
    });
  });

  // Alternative - tester le comportement de rafraîchissement sans simuler l'interaction
  it("should refresh data when onRefresh is called", async () => {
    const mockBuilder = createMockBuilder({ data: [], error: null });
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    const { UNSAFE_getByType } = customRender(<FeaturedArtisans />);
    const flatList = UNSAFE_getByType(FlatList);

    await act(async () => {
        flatList.props.refreshControl?.props.onRefresh();
    });

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalled();
    });
  });

  // Test de la sélection de catégorie directement via le composant Filters
  it("should update data when category changes", async () => {
    const mockBuilder = createMockBuilder({ data: [], error: null });
    jest.spyOn(supabase, "from").mockReturnValue(mockBuilder);

    const { UNSAFE_getByType } = customRender(<FeaturedArtisans />);
    const filters = UNSAFE_getByType(Filters);

    await act(async () => {
      filters.props.onSelectCategory("Category 1");
    });

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("artisan_detail");
    });
  });
});
