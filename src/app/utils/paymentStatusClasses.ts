
export const getPaymentStatusLabel = (status: number, returnTextColor = false) => {
  if(returnTextColor) {
    switch (status) {
      case 1:
        return "payment-status-pending";
      case 2:
        return "payment-status-received";
      case 3:
        return "payment-status-partial-received";
      default:
        return "";
    }
    
  } else {
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
}

};
