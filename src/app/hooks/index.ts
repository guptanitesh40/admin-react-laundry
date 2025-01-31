export { default as useGetCategories } from './categories/useGetCategories';
export { default as useAddCategory } from './categories/useAddCategory';
export { default as useGetCategory } from './categories/useGetCategory';
export { default as useDeleteCategory } from './categories/useDeleteCategory';
export { default as useUpdateCategory } from './categories/useUpdateCategory';

export { default as useGetProducts } from './products/useGetProducts';
export { default as useGetProduct } from './products/useGetProduct';
export { default as useGetProductsOnId } from './products/useGetProductsOnId';
export { default as useAddProduct } from './products/useAddProduct';
export { default as useDeleteProduct } from './products/useDeleteProduct';
export { default as useUpdateProduct } from './products/useUpdateProduct';

export { default as useGetServices } from './services/useGetServices';
export { default as useGetService } from './services/useGetService';
export { default as useGetServicesOnId } from './services/useGetServicesOnId';
export { default as useAddService } from './services/useAddService';
export { default as useDeleteService } from './services/useDeleteService';
export { default as useUpdateService } from './services/useUpdateService';

export { default as useGetCoupons } from './coupon/useGetCoupons';
export { default as useGetCoupon } from './coupon/useGetCoupon';
export { default as useAddCoupon } from './coupon/useAddCoupon';
export { default as useDeleteCoupon } from './coupon/useDeleteCoupon';
export { default as useUpdateCoupon } from './coupon/useUpdateCoupon';
export { default as useApplyCoupon } from './coupon/useApplyCoupon';
export { default as useGetValidCoupon } from './coupon/useGetValidCoupons.tsx';

export { default as useGetPrice } from './price/useGetPrice';
export { default as useAddPrice } from './price/useAddPrice';

export { default as useGetCompanies} from './company/useGetCompanies';
export { default as useGetBranchesOnId} from './company/useGetBranchesOnId';
export { default as useGetCompany} from './company/useGetCompany';
export { default as useAddCompany } from './company/useAddCompany';
export { default as useDeleteCompany } from './company/useDeleteCompany';
export { default as useUpdateCompany } from './company/useUpdateCompany';

export { default as useGetBranches} from './branch/useGetBranches';
export { default as useGetBranch} from './branch/useGetBranch';
export { default as useAddBranch } from './branch/useAddBranch';
export { default as useDeleteBranch } from './branch/useDeleteBranch';
export { default as useUpdateBranch } from './branch/useUpdateBranch';

export { default as useGetBanners } from './banner/useGetBanners';
export { default as useGetBanner } from './banner/useGetBanner';
export { default as useAddBanner} from './banner/useAddBanner';
export { default as useDeleteBanner } from './banner/useDeleteBanner';
export { default as useUpdateBanner } from './banner/useUpdateBanner';

export { default as useGetOrders} from './order/useGetOrders';
export { default as useGetPaymentDuoOrders} from './order/useClearDueAmount.ts';
export { default as useGetOrder} from './order/useGetOrder';
export { default as useAddOrder} from './order/useAddOrder';
export { default as useDeleteOrder } from './order/useDeleteOrder';
export { default as useUpdateOrder } from './order/useUpdateOrder';
export { default as useCancelOrder } from './order/useCancelOrder.ts';
export { default as useRefundOrder } from './order/useRefundOrder.ts';

export { default as useGetUsers} from './user/useGetUsers';
export { default as useAddUser} from './user/useAddUser';
export { default as useDeleteUser } from './user/useDeleteUser';
export { default as useUpdateUser } from './user/useUpdateUser';

export { default as useGetAddress } from './address/useGetAddress';

export { default as useSendOtp } from './login/useSendOtp';
export { default as useResetPassword } from './login/useResetPassword';
export { default as useValidateOtp } from './login/useValidateOtp';

export { default as useGetOrdersData } from './report/useGetOrdersData';
export { default as useGetSalesData } from './report/useGetSalesData.ts';
export { default as useGetPaymentTypeData } from './report/useGetPaymentTypeData.ts';
export { default as useGetKasarData } from './report/useGetKasarData';
export { default as useGetDeliveryPendingData } from './report/useGetDeliveryPendingData.ts';
export { default as useGetDeliveryCompletedData } from './report/useGetDeliveryCompletedData.ts';
export { default as useGetPendingAmountData } from './report/useGetPendingAmountData.ts';
export { default as useGetRefundAmountData } from './report/useGetRefundAmountData.ts';
export { default as useGetPaymentTransactionData } from './report/useGetPaymentTransactionData.ts';
export { default as useGetCustomerActivityData } from './report/useGetCustomerActivityData.ts';
export { default as useGetCustomerRatingData } from './report/useGetCustomerRatingData.ts';
export { default as useGetBranchSalesData } from './report/useGetBranchSalesData.ts';
export { default as useGetDeliveryData } from './report/useGetDeliveryData.ts';

export { default as useGetWorkshops } from './workshop/useGetWorkshops';
export { default as useGetWorkshop } from './workshop/useGetWorkshop';
export { default as useAddWorkshop } from './workshop/useAddWorkshop';
export { default as useDeleteWorkshop } from './workshop/useDeleteWorkshop';
export { default as useUpdateWorkshop } from './workshop/useUpdateWorkshop';

export { default as useAddNote } from './notes/useAddNote';
export { default as useDeleteNote } from './notes/useDeleteNote';

export { default as useAssignPickupBoy } from './orderstatus/useAssignPickupBoy';
export { default as useUpdateOrderStatus } from './orderstatus/useUpdateStatus';
export { default as useAssignWorkshop } from './orderstatus/useAssignWorkshop';
export { default as useAssignBranch } from './orderstatus/useAssignBranch';

export { default as useGetWorkshopOrders } from './workshop/useGetWorkshopOrders';

export { default as useGetPriceContents } from './price-content/useGetPriceContents';
export { default as useGetPriceContent } from './price-content/useGetPriceContent.ts';
export { default as useAddPriceConten } from './price-content/useAddPriceContent.ts';
export { default as useUpdatePriceContent } from './price-content/useUpdatePriceContent.ts';
export { default as useDeletePriceContent } from './price-content/useDeletePriceContent.ts';

export { default as useGenerateInvoice } from './invoice/useGenerateInvoice.ts';

export { default as useGetSettings } from './settings/useGetSettings.ts';
export { default as useAddSettings } from './settings/useAddSettings.ts';
export { default as useUpdatePromotionBanner } from './settings/useUpdatePromotionBanner.ts';

export { default as useGetPayments } from './payment/useGetPayments.ts';
export { default as useGeneratePaymentLink } from './payment/useGeneratePaymentLink.ts';

export { default as useGetFeedbacks } from './feedback/useGetFeedbacks.ts';
export { default as useApproveFeedback } from './feedback/useApproveFeedback.ts';

