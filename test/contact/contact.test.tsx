import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { supabase } from "@/app/lib/supabase";
import Contact from "@/app/(root)/(tabs)/contact";
import { Alert } from "react-native";
import { PostgrestQueryBuilder } from "@supabase/postgrest-js";

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

// Mock de @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  Feather: "Feather",
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

// Mock du module expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}));

// Mock de la fonction openURL de Linking
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn(),
}));

describe("Contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devrait rendre correctement la page de contact", () => {
    const { getByText, getByPlaceholderText } = render(<Contact />);

    expect(getByText("Nous contacter")).toBeTruthy();
    expect(getByText("Comment pouvons-nous vous aider ?")).toBeTruthy();
    expect(getByText("Envoyez-nous un message")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre nom")).toBeTruthy();
    expect(getByPlaceholderText("Entrez votre téléphone")).toBeTruthy();
    expect(getByPlaceholderText("Écrivez votre message")).toBeTruthy();
    expect(getByText("Envoyer le message")).toBeTruthy();
  });

  it("devrait soumettre le formulaire avec les champs remplis", async () => {
    const mockInsert = jest.fn().mockResolvedValue({ error: null });
    supabase.from = jest.fn().mockReturnValue({ insert: mockInsert });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <Contact />
    );

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom"), "John Doe");
    fireEvent.changeText(
      getByPlaceholderText("Entrez votre téléphone"),
      "1234567890"
    );
    fireEvent.changeText(
      getByPlaceholderText("Écrivez votre message"),
      "Un message de test"
    );

    await act(async () => {
      fireEvent.press(getByText("Envoyer le message"));
    });

    await act(async () =>
      expect(mockInsert).toHaveBeenCalledWith([
        {
          fullname: "John Doe",
          phone: "1234567890",
          message: "Un message de test",
        },
      ])
    );

    // Vérifier que "Envoi en cours..." n'est plus affiché après le chargement
    expect(queryByText("Envoi en cours...")).toBeNull();
    expect(getByText("Envoyer le message")).toBeTruthy();
  });

  it("devrait afficher une alerte en cas d'erreur lors de la soumission", async () => {
    const mockInsert = jest.fn().mockResolvedValue({ error: "Une erreur" });
    supabase.from = jest.fn().mockReturnValue({ insert: mockInsert });

    const alertSpy = jest.spyOn(Alert, "alert");

    const { getByPlaceholderText, getByText } = render(<Contact />);

    fireEvent.changeText(getByPlaceholderText("Entrez votre nom"), "John Doe");
    fireEvent.changeText(
      getByPlaceholderText("Entrez votre téléphone"),
      "1234567890"
    );
    fireEvent.changeText(
      getByPlaceholderText("Écrivez votre message"),
      "Un message de test"
    );

    await act(async () => {
      fireEvent.press(getByText("Envoyer le message"));
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Erreur",
        "Une erreur s'est produite lors de l'envoi du message"
      );
    });
  });

  // Ajoutez plus de tests pour couvrir les différentes interactions et cas limites
});
