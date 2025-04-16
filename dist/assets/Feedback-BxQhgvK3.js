import{U as q,r as n,j as e,u as H,W as J,X as K,f as Q,g as Z,b as ee,V as se}from"./index-BtmdiTM0.js";import{s as ae}from"./searchSchema-qC772F25.js";import{d as O}from"./dayjs.min-RamwI5dG.js";import{M as te}from"./MultiSelect-C40kebfD.js";import{T as le}from"./TableShimmer-D611b0vW.js";import"./orderStatusClasses-HfHBGnti.js";const ne=()=>{const{customerRatingData:t,fetchCustomerRatingData:m}=q(),[c,h]=n.useState([{label:"5",count:0},{label:"4",count:0},{label:"3",count:0},{label:"2",count:0},{label:"1",count:0}]),[u,g]=n.useState(0),[b,C]=n.useState(0);n.useEffect(()=>{m()},[]),n.useEffect(()=>{if(t){const l=c.map(r=>{const o=t==null?void 0:t.find(f=>f.rating.toString()===r.label);return o?{...r,count:o.count}:r});h(l);const i=t==null?void 0:t.reduce((r,o)=>r+o.rating*o.count,0),d=t==null?void 0:t.reduce((r,o)=>r+o.count,0),p=i/d;g(p),C(d)}},[t]);const N=Math.max(...c.map(l=>l.count)),P=(l,i)=>{const d=Number(l);if(i===0)return"bg-gray-200";switch(d){case 1:return"bg-red-500";case 2:return"bg-green-500";case 3:return"bg-yellow-500";case 4:return"bg-orange-500";case 5:return"bg-blue-500";default:return"bg-gray-200"}};return e.jsx("div",{className:"col-span-3",children:e.jsx("div",{className:"card w-full",children:e.jsxs("div",{className:"flex flex-wrap mt-3 justify-between items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4 ml-3",children:[e.jsx("div",{children:e.jsx("img",{className:"default-logo h-[55px] max-w-none",src:"/media/app/review.png"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h2",{className:"text-2xl text-gray-700 font-bold",children:u.toFixed(2)}),e.jsxs("p",{className:"text-base font-semibold text-gray-700",children:["─ of ",b," reviews"]})]})]}),e.jsx("div",{className:"card-body flex flex-col gap-2 custom-body min-w-[250px]",children:c.map((l,i)=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"flex justify-between text-sm font-medium text-gray-600",children:e.jsxs("div",{className:"flex gap-2 items-center justify-center",children:[e.jsx("span",{children:l.label}),e.jsx("div",{className:"rating-label custom-rating checked",children:e.jsx("i",{className:"custom-rating-on rating-on ki-solid ki-star text-base leading-none"})},i)]})}),e.jsx("div",{className:"w-full h-[8px] bg-gray-200 rounded overflow-hidden",children:e.jsx("div",{className:`${P(l.label,l.count)} rounded-full h-full transition-all duration-500`,style:{width:`${l.count/N*100}%`}})}),e.jsx("span",{className:"font-medium text-sm text-gray-600",children:l.count})]},i))})]})})})},T=t=>{switch(t){case 1:return"badge badge-danger badge-outline";case 2:return"badge badge-info badge-outline";case 3:return"badge badge-warning badge-outline";default:return""}},re=()=>{const[t,m]=n.useState(1),[c,h]=n.useState(10),[u,g]=H(),[b,C]=n.useState(null),[N,P]=n.useState(null),l=u.get("page"),i=u.get("perPage"),[d,p]=n.useState(""),[r,o]=n.useState(""),[f,F]=n.useState(""),[v,Y]=n.useState(),[R,_]=n.useState([]),{feedbacks:w,count:S,fetchFeedbacks:B,loading:W}=J(t,c,d,b,N,R,v),{approveFeedback:z}=K(),j=Math.ceil(S/c);n.useEffect(()=>{l&&m(Number(l)),i&&h(Number(i))},[l,i]);const D=async s=>{s.preventDefault();try{await ae.validate({search:r},{abortEarly:!1}),p(r),F("")}catch(a){a instanceof ee&&F(a.errors[0])}},y=s=>{s>=1&&s<=j&&(m(s),g({page:s.toString(),perPage:c.toString()}))},G=s=>{const a=Number(s.target.value);h(a),m(1),g({page:"1",perPage:a.toString()})},L=s=>Array.from({length:5}).map((a,x)=>e.jsxs("div",{className:`rating-label ${x<s?"checked":""}`,children:[e.jsx("i",{className:"rating-on custom-rating-on ki-solid ki-star text-base leading-none"}),e.jsx("i",{className:"rating-off ki-outline ki-star text-base leading-none"})]},x)),U=async(s,a)=>{try{await z(s,a),B()}catch{se.error("Failed to update publish status:")}},k=Array.from({length:5},(s,a)=>({label:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-1",children:a+1}),e.jsxs("div",{className:"rating-label checked mb-1",children:[e.jsx("i",{className:"rating-on custom-rating-on ki-solid ki-star text-base leading-none"}),e.jsx("i",{className:"rating-off ki-outline ki-star text-base leading-none"})]})]},a),value:a+1}));return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:c,onChange:G,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsx(te,{options:k,displayValue:"label",placeholder:"Select Rating",selectedValues:R,onSelect:s=>_(s.map(a=>a.value)),onRemove:s=>_(s.map(a=>a.value)),className:"lgmobile:min-w-[250px] vsmobile:min-w-[235px]",sliceCount:3,isSearchInput:!1})}),e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${T(v)}`,value:v,onChange:s=>Y(Number(s.target.value)),children:[e.jsx("option",{value:"",children:"Publish Status"}),e.jsx("option",{value:"1",className:"badge-danger badge-outline",children:"None"}),e.jsx("option",{value:"2",className:"badge-info badge-outline",children:"Website"}),e.jsx("option",{value:"3",className:"badge-warning badge-outline",children:"Mobile App"}),e.jsx("option",{value:"4",className:"badge-secondary badge-outline",children:"Both"})]})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:D,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:r,onChange:s=>{o(s.target.value),s.target.value===""&&p("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:f||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:"Order Id"}),e.jsx("th",{className:"min-w-[250px]",children:"Customer name"}),e.jsx("th",{className:"min-w-[250px]",children:"Email"}),e.jsx("th",{className:"min-w-[130px]",children:"Mobile no"}),e.jsx("th",{className:"min-w-[100px]",children:"Rating"}),e.jsx("th",{className:"min-w-[300px]",children:"Comment"}),e.jsx("th",{className:"min-w-[120px]",children:"Date"}),e.jsx("th",{className:"min-w-[140px]",children:"Publish"})]})}),W?e.jsx(le,{}):w?e.jsx("tbody",{children:w.map(s=>{var a,x,M,A,E,$,V,I;return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsxs("td",{children:[(x=(a=s==null?void 0:s.order)==null?void 0:a.user)==null?void 0:x.first_name," ",(A=(M=s==null?void 0:s.order)==null?void 0:M.user)==null?void 0:A.last_name]}),e.jsx("td",{children:($=(E=s==null?void 0:s.order)==null?void 0:E.user)==null?void 0:$.email}),e.jsx("td",{children:(I=(V=s==null?void 0:s.order)==null?void 0:V.user)==null?void 0:I.mobile_number}),e.jsx("td",{children:e.jsx("div",{className:"rating",children:L(s.rating)})}),e.jsx("td",{children:s.comment}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[O(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),O(s.created_at).format("hh:mm:ss A")]})}),e.jsx("td",{children:e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${T(s.is_publish)}`,value:s.is_publish,onChange:X=>U(s.feedback_id,X.target.value),children:[e.jsx("option",{value:"1",className:"badge-danger badge-outline",children:"None"}),e.jsx("option",{value:"2",className:"badge-info badge-outline",children:"Website"}),e.jsx("option",{value:"3",className:"badge-warning badge-outline",children:"Mobile App"}),e.jsx("option",{value:"4",className:"badge-secondary badge-outline",children:"Both"})]})})]},s.feedback_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No Feedbacks data available"})})})]})}),S>c&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",w.length," of ",S," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>y(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(Q,{})}),Array.from({length:j}).map((s,a)=>e.jsx("button",{className:`btn ${t===a+1?"active":""}`,onClick:()=>y(a+1),children:a+1},a)),e.jsx("button",{disabled:t===j,onClick:()=>y(t+1),className:`btn ${t===j?"disabled":""}`,children:e.jsx(Z,{})})]})]})})]})})]})},he=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Customer Feedback And Rating"})})}),e.jsx("div",{className:"container-fixed",children:e.jsx(ne,{})}),e.jsx("div",{className:"container-fixed mt-5",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(re,{})})})})]});export{he as default};
