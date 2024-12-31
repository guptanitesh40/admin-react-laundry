
export const getPaymentStatusLabel = (status: number, returnTextColor = false) => {
  if(returnTextColor) {
    switch (status) {
      case 1:
        return "text-[#f8285a]";
      case 2:
        return "text-[#7239ea]";
      case 3:
        return "text-[#f6b100]";
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
