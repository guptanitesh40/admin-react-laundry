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
  "Pickup Pending" = 1,
  "Items Received by Pickupboy" = 2,
  "Items Received at Branch" = 3,
  "Workshop Received Items" = 4,
  "Workshop Moved to in Process" = 5,
  "Workshop Marks as Completed" = 6,
  "Branch Received Items" = 7,
  "Branch Assigned Deliveryboy" = 8,
  "Deliveryboy Marks as Completed" = 9,
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
