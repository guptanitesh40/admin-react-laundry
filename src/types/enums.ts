export enum CouponType {
  "Website" = 1,
  "App" = 2,
  "Both" = 3,
}

export enum DiscountType {
  "Amount" = 1,
  "Percentage" = 2,
}

export enum OrderStatus {
  "Order Placed" = 111,
  "Branch Assigned" = 112,
  "Pickup Boy Assigned" = 2,
  "Pickup Complete" = 3,
  "Items Received at Branch" = 4,
  "Workshop Assigned" = 5,
  "Order Received at Workshop" = 6,
  "Order Work In Progress" = 7,
  "Order Completed" = 9,
  "Ready for delivery" = 10,
  "Delivered" = 11,
  "Cancelled" = 12,
}

export enum WorkshopOrderStatus {
  "Order Received" = 4,
  "In Progress" = 5,
  "Completed" = 6,
}

export enum PaymentStatus {
  "Pending" = 1,
  "Received" = 2,
  "Partial received" = 3,
}

export enum PaymentType {
  "Cash on delivery" = 1,
  "Online payment" = 2,
}

export enum Role {
  "Super Admin" = 1,
  "Sub Admin" = 2,
  "Branch Manager" = 3,
  "Delivery Boy" = 4,
  "Customer" = 5,
  "Workshop Manager" = 6,
  "Vendor" = 7,
}

export enum Gender {
  "Male" = 1,
  "Female" = 2,
  "Others" = 3,
}

export enum BannerType {
  "Website" = 1,
  "App" = 2,
  "Both" = 3,
}

export enum CompanyOwed {
  "Own" = 1,
  "Other company" = 2,
}

export enum RefundStatus {
  "Full" = 1,
  "Partial" = 2,
  "None" = 3,
}
