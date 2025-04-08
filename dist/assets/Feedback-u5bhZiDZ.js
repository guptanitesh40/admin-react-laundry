import{r as t,B as z,V as _,j as e,u as Z,a2 as ee,e as se,T as ae,k as L,P as te,s as ne,b as re}from"./index-BXIzzU16.js";import{M as le}from"./MultiSelect-DibcVqIB.js";import"./orderStatusClasses-HfHBGnti.js";const ie=()=>{const[a,u]=t.useState(),[i,d]=t.useState(!1);return{customerRatingData:a,loading:i,fetchCustomerRatingData:async()=>{const m=localStorage.getItem("authToken");d(!0);try{const c=await fetch(`${z}/report/customers-feedback`,{method:"GET",headers:{Authorization:`Bearer ${m}`}}),N=await c.json();if(!c.ok){_.error(N.message,{position:"top-center"}),d(!1);return}u(N)}catch{_.error("Network error: Failed to fetch data.")}finally{d(!1)}}}},ce=(a=1,u=10,i="",d,j,m,c)=>{const[N,x]=t.useState(),[y,b]=t.useState(!1),[r,o]=t.useState(0),p=async()=>{var h,S;const v=localStorage.getItem("authToken"),l=new URLSearchParams;a&&l.append("page_number",a.toString()),u&&l.append("per_page",u.toString()),i&&l.append("search",i),d&&l.append("sort_by",d),j&&l.append("order",j),c&&l.append("is_publish",c.toString()),m&&m.forEach(g=>l.append("rating",g.toString())),b(!0);try{const g=await fetch(`${z}/feedback?${l}`,{method:"GET",headers:{Authorization:v?`Bearer ${v}`:""}}),f=await g.json();if(!g.ok){_.error(f.message,{position:"top-center"}),b(!1);return}x(((h=f==null?void 0:f.data)==null?void 0:h.feedbacks)||[]),o((S=f==null?void 0:f.data)==null?void 0:S.count)}catch(g){_.error(g||"Network Error : Failed to fetch feedbacks")}finally{b(!1)}};return t.useEffect(()=>{p()},[a,u,i,d,j,c,m]),{feedbacks:N,fetchFeedbacks:p,loading:y,count:r}},A=a=>{switch(a){case 1:return"one-star-rating";case 2:return"two-star-rating";case 3:return"three-star-rating";case 4:return"four-star-rating";case 5:return"five-star-rating";default:return"custom-rating-on"}},oe=()=>{const{customerRatingData:a,fetchCustomerRatingData:u,loading:i}=ie(),[d,j]=t.useState([{label:"5",count:0},{label:"4",count:0},{label:"3",count:0},{label:"2",count:0},{label:"1",count:0}]),[m,c]=t.useState(0),[N,x]=t.useState(0);t.useEffect(()=>{u()},[]),t.useEffect(()=>{if(a){const r=d.map(l=>{const h=a==null?void 0:a.find(S=>S.rating.toString()===l.label);return h?{...l,count:h.count}:l});j(r);const o=a==null?void 0:a.reduce((l,h)=>l+h.rating*h.count,0),p=a==null?void 0:a.reduce((l,h)=>l+h.count,0),v=o/p;c(v),x(p)}},[a]);const y=Math.max(...d.map(r=>r.count)),b=(r,o)=>{const p=Number(r);if(o===0)return"bg-gray-200";switch(p){case 1:return"bg-red-500";case 2:return"bg-green-500";case 3:return"bg-yellow-500";case 4:return"bg-orange-500";case 5:return"bg-blue-500";default:return"bg-gray-200"}};return i?null:e.jsx("div",{className:"col-span-3",children:e.jsx("div",{className:"card w-full",children:e.jsxs("div",{className:"flex flex-wrap mt-3 justify-between items-center gap-4",children:[e.jsxs("div",{className:"flex items-center gap-4 ml-3",children:[e.jsx("div",{children:e.jsx("img",{className:"default-logo h-[55px] max-w-none",src:"/media/app/review.png"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("h2",{className:"text-2xl text-gray-700 font-bold",children:m.toFixed(2)}),e.jsxs("p",{className:"text-base font-semibold text-gray-700",children:["─ of ",N," reviews"]})]})]}),e.jsx("div",{className:"card-body flex flex-col gap-2 custom-body min-w-[250px]",children:d.map((r,o)=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"flex justify-between text-sm font-medium text-gray-600",children:e.jsxs("div",{className:"flex gap-2 items-center justify-center",children:[e.jsx("span",{children:r.label}),e.jsx("div",{className:"rating-label custom-rating checked",children:e.jsx("i",{className:`${A(Number(r.label))} rating-on ki-solid ki-star text-base leading-none`})},o)]})}),e.jsx("div",{className:"w-full h-[8px] bg-gray-200 rounded overflow-hidden",children:e.jsx("div",{className:`${b(r.label,r.count)} rounded-full h-full transition-all duration-500`,style:{width:`${r.count/y*100}%`}})}),e.jsx("span",{className:"font-medium text-sm text-gray-600",children:r.count})]},o))})]})})})},V=a=>{switch(a){case 1:return"badge badge-danger badge-outline";case 2:return"badge badge-info badge-outline";case 3:return"badge badge-warning badge-outline";default:return""}},de=()=>{const[a,u]=t.useState(1),[i,d]=t.useState(10),[j,m]=Z(),[c,N]=t.useState(null),[x,y]=t.useState(null),b=j.get("page"),r=j.get("perPage"),[o,p]=t.useState(""),[v,l]=t.useState(""),[h,S]=t.useState(""),[g,f]=t.useState(),[R,E]=t.useState([]),{feedbacks:w,count:$,fetchFeedbacks:G,loading:Y}=ce(a,i,o,c,x,R,g),{approveFeedback:O}=ee(),{hasPermission:F}=se(),U=Math.ceil($/i);t.useEffect(()=>{b&&u(Number(b)),r&&d(Number(r))},[b,r]),t.useEffect(()=>{u(1),m(o!==""?{search:o,page:"1",perPage:i.toString()}:{})},[o]),t.useEffect(()=>{(g!==void 0||R.length>0)&&(u(1),m(o!==""?{search:o,page:"1",perPage:i.toString()}:{page:"1",perPage:i.toString()}))},[g,R]);const W=async s=>{s.preventDefault();try{await ne.validate({search:v},{abortEarly:!1}),p(v),S("")}catch(n){n instanceof re&&S(n.errors[0])}},P=s=>{c===s?y(x==="ASC"?"DESC":"ASC"):(N(s),y("ASC"))},q=s=>{s>=1&&s<=U&&(u(s),m({page:s.toString(),perPage:i.toString()}))},H=s=>{const n=Number(s.target.value);d(n),u(1),m({page:"1",perPage:n.toString()})},J=s=>Array.from({length:5}).map((n,C)=>e.jsxs("div",{className:`rating-label ${C<s?"checked":""}`,children:[e.jsx("i",{className:`rating-on ki-solid ki-star text-base leading-none ${C<s?A(s):""}`}),e.jsx("i",{className:"rating-off ki-outline ki-star text-base leading-none"})]},C)),K=async(s,n)=>{try{await O(s,n),G()}catch{_.error("Failed to update publish status:")}},Q=Array.from({length:5},(s,n)=>({label:e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"mr-1",children:n+1}),e.jsxs("div",{className:"rating-label checked mb-1",children:[e.jsx("i",{className:`rating-on ${A(n+1)} ki-solid ki-star text-base leading-none`}),e.jsx("i",{className:"rating-off ki-outline ki-star text-base leading-none"})]})]},n),value:n+1}));return Y?e.jsx(ae,{isFilters:!0,columns:8,records:10,isPagination:!0}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:H,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsx(le,{options:Q,displayValue:"label",placeholder:"Select Rating",selectedValues:R,onSelect:s=>E(s.map(n=>n.value)),onRemove:s=>E(s.map(n=>n.value)),className:"lgmobile:min-w-[250px] vsmobile:min-w-[235px]",sliceCount:3,isSearchInput:!1})}),e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${V(g)}`,value:g,onChange:s=>f(Number(s.target.value)),children:[e.jsx("option",{value:"",children:"Publish Status"}),e.jsx("option",{value:"1",className:"badge-danger badge-outline",children:"None"}),e.jsx("option",{value:"2",className:"badge-info badge-outline",children:"Website"}),e.jsx("option",{value:"3",className:"badge-warning badge-outline",children:"Mobile App"}),e.jsx("option",{value:"4",className:"badge-secondary badge-outline",children:"Both"})]})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:W,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:v,onChange:s=>{l(s.target.value),s.target.value===""&&p("")},placeholder:"Search...",className:"min-w-[185px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:h||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:e.jsxs("span",{className:`sort ${c==="order_id"?x==="ASC"?"asc":"desc":""}`,onClick:()=>P("order_id"),children:[e.jsx("span",{className:"sort-label",children:"Order Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="first_name"?x==="ASC"?"asc":"desc":""}`,onClick:()=>P("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Customer name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${c==="email"?x==="ASC"?"asc":"desc":""}`,onClick:()=>P("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[130px]",children:e.jsxs("span",{className:`sort ${c==="mobile_number"?x==="ASC"?"asc":"desc":""}`,onClick:()=>P("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[100px]",children:"Rating"}),e.jsx("th",{className:"min-w-[300px]",children:"Comment"}),e.jsx("th",{className:"min-w-[120px]",children:e.jsxs("span",{className:`sort ${c==="created_at"?x==="ASC"?"asc":"desc":""}`,onClick:()=>P("created_at"),children:[e.jsx("span",{className:"sort-label",children:"Date"}),e.jsx("span",{className:"sort-icon"})]})}),(F(17,"create")||F(17,"update"))&&e.jsx("th",{className:"min-w-[140px]",children:"Publish"})]})}),(w==null?void 0:w.length)>0?e.jsx("tbody",{children:w.map(s=>{var n,C,k,M,T,B,D,I;return e.jsxs("tr",{children:[e.jsxs("td",{children:["#",s.order_id]}),e.jsxs("td",{children:[(C=(n=s==null?void 0:s.order)==null?void 0:n.user)==null?void 0:C.first_name," ",(M=(k=s==null?void 0:s.order)==null?void 0:k.user)==null?void 0:M.last_name]}),e.jsx("td",{children:(B=(T=s==null?void 0:s.order)==null?void 0:T.user)==null?void 0:B.email}),e.jsx("td",{children:(I=(D=s==null?void 0:s.order)==null?void 0:D.user)==null?void 0:I.mobile_number}),e.jsx("td",{children:e.jsx("div",{className:"rating",children:J(s.rating)})}),e.jsx("td",{children:s.comment}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-2.5",children:[L(s.created_at).format("DD-MM-YYYY"),e.jsx("br",{}),L(s.created_at).format("hh:mm:ss A")]})}),(F(17,"create")||F(17,"update"))&&e.jsx("td",{children:e.jsxs("select",{className:`select select-lg w-[170px] text-sm ${V(s.is_publish)}`,value:s.is_publish,onChange:X=>K(s.feedback_id,X.target.value),children:[e.jsx("option",{value:"1",className:"badge-danger badge-outline",children:"None"}),e.jsx("option",{value:"2",className:"badge-info badge-outline",children:"Website"}),e.jsx("option",{value:"3",className:"badge-warning badge-outline",children:"Mobile App"}),e.jsx("option",{value:"4",className:"badge-secondary badge-outline",children:"Both"})]})})]},s.feedback_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No feedback data available"})})})]})}),e.jsx(te,{count:$,currentPage:a,totalRecords:w==null?void 0:w.length,perPage:i,onPageChange:q,label:"feedbacks"})]})})]})},ge=()=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Customer Feedback And Rating"})})}),e.jsx("div",{className:"container-fixed",children:e.jsx(oe,{})}),e.jsx("div",{className:"container-fixed mt-5",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(de,{})})})})]});export{ge as default};
