export const getPublishStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return "";
    case 2:
      return "badge-website";
    case 3:
      return "badge-app";
    default:
      return "badge-web-app";
  }
};

