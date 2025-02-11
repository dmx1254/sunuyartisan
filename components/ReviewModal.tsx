import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback, useWindowDimensions } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal, Text, View } from "react-native";

// ReviewModal.tsx
const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  isReviewLoading,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (review: { rate: number; message: string }) => void;
  isReviewLoading: boolean;
}) => {
  const [review, setReview] = useState({ rate: 0, message: "" });
  const { width: w } = useWindowDimensions();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 z-20"
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View
            className="flex-1"
            style={{
              backgroundColor: "rgba(0, 0, 0,0.4)",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  elevation: 10,
                  marginHorizontal: 20,
                  marginTop: 100,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: 0,
                  width: w,
                }}
              >
                <View className="mb-2">
                  <Text className="text-xl font-rubik-semibold">
                    Donner votre avis
                  </Text>
                </View>
                <View className="flex-row items-center gap-0 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        setReview((prev) => ({ ...prev, rate: i + 1 }))
                      }
                    >
                      <FontAwesome
                        name={i < review.rate ? "star" : "star-o"}
                        size={30}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <View className="w-full p-4 border border-primary-100 rounded-xl">
                  <TextInput
                    placeholder="Votre message..."
                    multiline
                    value={review.message}
                    onChangeText={(text) =>
                      setReview((prev) => ({ ...prev, message: text }))
                    }
                    className="text-lg font-rubik-medium placeholder:text-gray-300"
                    style={{
                      minHeight: 120,
                    }}
                  />
                </View>

                <View className="w-full flex-row items-center gap-4 justify-between my-5">
                  <TouchableOpacity
                    onPress={onClose}
                    className="bg-primary-900  p-4 rounded-xl"
                    style={{
                      minWidth: 140,
                    }}
                  >
                    <Text className="text-white font-rubik-semibold text-xl text-center">
                      Annuler
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onSubmit(review)}
                    className="bg-primary-300 p-4 rounded-xl"
                    style={{
                      minWidth: 140,
                      opacity:
                        review.rate === 0 || review.message.trim() === ""
                          ? 0.5
                          : 1,
                    }}
                    disabled={review.rate === 0 || review.message.trim() === ""}
                  >
                    {isReviewLoading ? (
                      <View className="text-center">
                        <ActivityIndicator size="small" color="#fff" />
                      </View>
                    ) : (
                      <Text className="text-white font-rubik-semibold text-xl text-center">
                        Envoyer
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReviewModal;
