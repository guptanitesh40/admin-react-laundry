export const getBannerTypeLabel = (status: number) => {
    switch (status) {
      case 1:
        return "badge-website";
      case 2:
        return "badge-app";
      case 3:
        return "badge-web-app";
      default:
        return "";
    }
  };