const regEmails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export default regEmails;

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en km
};

export const averageReviews = (
  reviewsRate: number[] | number,
  reviewsLength: number
) => {
  if (
    !reviewsRate ||
    reviewsRate === 0 ||
    !reviewsLength ||
    reviewsLength === 0
  ) {
    return 0;
  }
  if (typeof reviewsRate === "number") {
    return 0;
  }

  const sumReviews = reviewsRate.reduce(
    (sum: number, acc: number): number => sum + acc,
    0
  );

  const rateNote = sumReviews > 0 ? sumReviews / reviewsLength : 0;

  return rateNote.toFixed(1);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const ONE_DAY = 86400000;

  // Si moins de 24h
  if (diff < ONE_DAY) {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // Si c'était hier
  else if (diff < ONE_DAY * 2) {
    return "hier";
  }
  // Si plus ancien
  else {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  }
};

export const formatedScheduleDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};