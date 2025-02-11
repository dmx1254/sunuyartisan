import { Review } from "@/types";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ReviewCard = ({ review }: { review: Review }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewHeader}>
      <Image
        source={{ uri: review.user.avatar }}
        style={styles.reviewerAvatar}
      />
      <View>
        <Text style={styles.reviewerName}>{review.user.fullname}</Text>
        <View style={styles.ratingStars}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name={i < review.rate ? "star" : "star-o"}
              size={14}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>
        {new Date(review.created_at).toLocaleDateString()}
      </Text>
    </View>
    <Text style={styles.reviewMessage}>{review.message}</Text>
  </View>
);

export default ReviewCard;

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f1f1ef",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerName: {
    fontWeight: "600",
    color: "#191D31",
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 2,
  },
  reviewDate: {
    color: "#8C8E98",
    fontSize: 12,
    marginLeft: "auto",
  },
  reviewMessage: {
    color: "#666876",
    lineHeight: 20,
  },
});
