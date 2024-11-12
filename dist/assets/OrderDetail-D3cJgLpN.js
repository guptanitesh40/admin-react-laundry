import{p as i,j as e,O as a,L as l,K as c}from"./index-aVJcLekq.js";import{u as m}from"./useGetSingleOrder-Bp-tHfF9.js";const o=()=>{const{id:d}=i(),r=Number(d),{order:s}=m(r);if(s)return e.jsxs("div",{className:"container mx-auto p-6",children:[e.jsxs("div",{className:"flex justify-between items-center bg-gray-100 p-6 rounded-md shadow",children:[e.jsxs("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:["Order Details - #",r]}),e.jsx("span",{className:`px-4 py-2 rounded-full text-white ${a[s.order_status]==="Pending"?"bg-yellow-500":a[s.order_status]==="Processing"?"bg-blue-500":a[s.order_status]==="Completed"?"bg-green-500":"bg-red-500"}`,children:a[s.order_status]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-white p-6 rounded-md shadow",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:"Order Items"}),e.jsxs("button",{className:"flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600",children:[e.jsx("i",{className:"ki-filled ki-credit-cart mr-2"})," Add New"]})]}),e.jsx("div",{className:"space-y-4",children:s.items.map(t=>e.jsxs("div",{className:"flex items-center justify-between border border-gray-200 rounded-xl gap-2 px-4 py-4 bg-secondary-clarity",children:[e.jsxs("div",{className:"flex items-center gap-3.5",children:[e.jsx("img",{alt:t.product.name,className:"w-10 shrink-0 object-cover rounded",src:t.product.image}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("a",{className:"text-sm font-semibold text-gray-900 hover:text-primary-active mb-px",href:"#",children:t.product.name}),e.jsxs("span",{className:"text-2sm font-medium text-gray-600",children:["Category: ",t.category.name]})]})]}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsxs("span",{className:"badge badge-sm badge-success badge-outline",children:["Service: ",t.service.name]}),e.jsxs("div",{className:"flex gap-0.5",children:[e.jsx("button",{className:"btn btn-sm btn-icon btn-clear btn-light",children:e.jsx("i",{className:"ki-filled ki-notepad-edit"})}),e.jsx("button",{className:"btn btn-sm btn-icon btn-clear btn-light",children:e.jsx("i",{className:"ki-filled ki-trash"})})]})]})]},t.item_id))})]}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Order Summary"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Sub Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.sub_total]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Shipping Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.shipping_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Express Delivery Charges:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.express_delivery_charges]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Kasar Amount:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.kasar_amount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Code:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.coupon_code})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Coupon Discount"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.coupon_discount]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Total:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:["₹",s.total]})]})]})})})]})})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Customer Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Name:"}),e.jsxs("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:[s.user.first_name," ",s.user.last_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Email:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.email})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Mobile Number:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.user.mobile_number})]})]})})})]})}),e.jsx("div",{className:"card rounded-xl",children:e.jsx("div",{className:"flex items-center justify-between grow gap-5 p-5 bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg",children:e.jsx("div",{className:"flex items-center gap-4",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("h3",{className:"card-title",children:"Shipping Address"})}),e.jsx("div",{className:"text-2sm font-medium text-gray-700",children:s.address_details!=="null"&&s.address_details.trim()!==""?s.address_details:"Address not provided."})]})})})}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Payment Information"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Type::"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:l[s.payment_type]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Payment Status:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:c[s.payment_status]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Transaction ID:"}),e.jsx("td",{className:"flex items-center gap-2.5 text-sm font-medium text-gray-700",children:s.transaction_id||"N/A"})]})]})})})]})}),e.jsx("div",{className:"col-span-2 lg:col-span-1 flex",children:e.jsxs("div",{className:"card grow",children:[e.jsx("div",{className:"card-header",children:e.jsx("h3",{className:"card-title",children:"Estimated Delivery & Pickup"})}),e.jsx("div",{className:"card-body pt-4 pb-3",children:e.jsx("table",{className:"table-auto",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Estimated Pickup Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_pickup_time).toLocaleDateString()})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"text-sm font-medium text-gray-500 min-w-36 pb-5 pe-6",children:"Estimated Delivery Time:"}),e.jsx("td",{className:"text-sm font-medium text-gray-700",children:new Date(s.estimated_delivery_time).toLocaleDateString()})]})]})})})]})})]})]})]})};export{o as default};