import { Review } from "@/types";
import { Text, TouchableOpacity, View } from "react-native";
import ReviewCard from "../ReviewCard";

interface ReviewsListProps {
  reviews: Review[];
  onAddReview: () => void;
}

export const ReviewsList = ({ reviews, onAddReview }: ReviewsListProps) => (
  <View className="p-4">
    <View className="flex-row items-center mb-2">
      <Text className="text-lg font-rubik-semibold">
        Avis clients ({reviews?.length || 0})
      </Text>
      <Text className="text-lg font-rubik-light mx-1">•</Text>
      <TouchableOpacity onPress={onAddReview}>
        <Text className="text-lg font-rubik-semibold text-primary-300">
          Ajouter un avis
        </Text>
      </TouchableOpacity>
    </View>

    {reviews?.length === 0 ? (
      <View>
        <Text>Aucun avis pour le moment</Text>
      </View>
    ) : (
      reviews?.map((review) => <ReviewCard key={review.id} review={review} />)
    )}
  </View>
);
