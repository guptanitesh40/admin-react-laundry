export const ratingStarClasses = (rating: any) => {
  switch (rating) {
    case 1:
      return "one-star-rating";
    case 2:
      return "two-star-rating";
    case 3:
      return "three-star-rating";
    case 4:
      return "four-star-rating";
    case 5:
      return "five-star-rating";
    default:
      return "custom-rating-on";
  }
};
