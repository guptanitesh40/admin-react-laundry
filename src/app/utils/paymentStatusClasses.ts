
export const getPaymentStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return "badge badge-danger";
    case 2:
      return "badge badge-info";
    case 3:
      return "badge badge-warning";
    default:
      return "";
  }
};
