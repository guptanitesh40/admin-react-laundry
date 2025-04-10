export const getOrderStatusLabel = (
  status: string,
  returnTextColor = false
) => {
  if (returnTextColor) {
    switch (status) {
      case "Order Placed":
        return "text-[#16b015]";
      case "Branch Assigned":
        return "text-[#8E24AA]";
      case "Items Received at Branch":
        return "text-[#4e00ff]";
      case "Pickup Boy Assigned":
        return "text-[#FF5722]";
      case "Pickup Complete":
        return "text-[#F57C00]";
      case "Workshop Assigned":
        return "text-[#a30386]";
      case "Order Received at Workshop":
        return "text-[#00796B]";
      case "Order Work In Progress":
        return "text-[#6B8E23]";
      case "Work Completed by Workshop":
        return "text-[#388E3C]";
      case "Order Completed":
        return "text-[#FF9800]";
      case "Ready for delivery":
        return "text-[#388E3C]";
      case "Delivered":
        return "text-[#f6b100]";
      case "Cancelled By Admin":
        return "text-[#f8285a]";
      case "Cancelled By Customer":
        return "text-[#D2665A]";
      default:
        return "";
    }
  } else {
    switch (status) {
      case "Order Placed":
        return "badge badge-order-placed";
      case "Assign Branch":
        return "badge badge-assign-branch";
      case "Branch Assigned":
        return "badge badge-branch-assigned";
      case "Items Received at Branch":
        return "badge badge-items-received-at-branch";
      case "Assign Workshop":
        return "badge badge-assign-workshop";
      case "Assign Pickup Boy":
        return "badge badge-assign-pickup-boy";
      case "Pickup Boy Assigned ( Ready to pickup )":
        return "badge badge-pickup-boy-assigned";
      case "Received by pickup boy":
        return "badge badge-received-by-pickup-boy";
      case "Pickup Complete":
        return "badge badge-pickup-complete";
      case "Workshop Assigned (On the Way)":
        return "badge badge-workshop-assigned";
      case "Order Received at Workshop":
        return "badge badge-order-received-at-workshop";
      case "Workshop Marks Order In Progress":
        return "badge badge-workshop-marks-order-in-progress";
      case "Order Work In Progress":
        return "badge badge-order-work-in-progress";
      case "Work Completed by Workshop":
        return "badge badge-work-completed-by-workshop";
      case "Mark as Received at Branch":
        return "badge badge-mark-as-received-at-branch";
      case "Order Completed ( Received at branch )":
        return "badge badge-order-completed";
      case "Assign Delivery boy":
        return "badge badge-assign-delivery-boy";
      case "Ready for delivery":
        return "badge badge-ready-for-delivery";
      case "Delivered":
        return "badge badge-delivered";
      case "Cancelled By Admin":
        return "badge badge-danger";
      case "Cancelled By Customer":
        return "badge badge-danger-secondary";
      default:
        return "";
    }
  }
};
