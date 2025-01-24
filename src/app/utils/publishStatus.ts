export const getPublishStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return "badge badge-danger badge-outline";
    case 2:
      return "badge badge-info badge-outline";
    case 3:
      return "badge badge-warning badge-outline";
    default:
      return "badge badge-secondary badge-outline";
  }
};

