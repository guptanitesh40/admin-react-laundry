export const getPublishStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return "";
    case 2:
      return "publish-website";
    case 3:
      return "publish-app";
    default:
      return "publish-both";
  }
};
