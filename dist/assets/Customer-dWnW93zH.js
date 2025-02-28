import{r as c,u as Z,k as E,e as T,j as e,n as H,F as J,f as Q,g as X,h as ee,b as se,Z as te,_ as v,$ as ae,a0 as re}from"./index-BxAhdOGX.js";import{s as oe}from"./searchSchema-BYRMa3UP.js";import{T as le}from"./TableShimmer-DpfR8Uuz.js";import{G as F}from"./enums-CdakGUf3.js";import{u as ie,a as ne}from"./useDeleteUser-CXZ9JoYE.js";import{S as j}from"./sweetalert2.esm.all-B0Dix5B2.js";import{M as ce}from"./MultiSelect-3iarTVao.js";import"./orderStatusClasses-HfHBGnti.js";const de=()=>{const[t,n]=c.useState(1),[i,h]=c.useState(10),[o,r]=c.useState(null),[l,x]=c.useState(),[C,u]=Z(),[S,k]=c.useState([]),b=C.get("page"),y=C.get("perPage"),[p,A]=c.useState(""),[P,z]=c.useState(""),[M,_]=c.useState(""),B=E();let $=5;const{users:m,loading:G,count:N,fetchUsers:U}=ie(t,i,p,o,l,S,$),{deleteUser:I}=ne(),{hasPermission:d}=T(),R=Object.entries(F).filter(([s,a])=>typeof a=="number").map(([s,a])=>({label:s,value:a})),f=Math.ceil(N/i);c.useEffect(()=>{b&&n(Number(b)),y&&h(Number(y))},[b,y]),c.useEffect(()=>{p&&(n(1),u({search:p,page:"1",perPage:i.toString()}))},[p]);const L=async s=>{s.preventDefault();try{await oe.validate({search:p},{abortEarly:!1}),A(P),_("")}catch(a){a instanceof se&&_(a.errors[0])}},g=s=>{o===s?x(l==="ASC"?"DESC":"ASC"):(r(s),x("ASC"))},w=s=>{s>=1&&s<=f&&(n(s),u({page:s.toString(),perPage:i.toString()}))},W=s=>{const a=Number(s.target.value);h(a),n(1),u({page:"1",perPage:a.toString()})},O=async s=>{B(`/customer/${s}`)},V=s=>{B(`/customer/edit/${s}`)},K=async s=>{try{const{isConfirmed:a}=await j.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#6c757d",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel"});if(a){const{success:Y,message:D}=await I(s);Y?(m.filter(q=>q.user_id!==s).length===0&&t>1&&(n(t-1),u({page:(t-1).toString(),perPage:i.toString()})),await U(),j.fire(D)):j.fire(D)}}catch(a){j.fire({title:"Error",text:a.message,icon:"error"})}};if(m)return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"card-header card-header-space flex-wrap",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("span",{children:"Show"}),e.jsxs("select",{className:"select select-sm w-16","data-datatable-size":"true",name:"perpage",value:i,onChange:W,children:[e.jsx("option",{value:10,children:"10"}),e.jsx("option",{value:20,children:"20"})]}),e.jsx("span",{children:"per page"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 lg:gap-5 mb-3",children:[e.jsx("div",{className:"flex flex-wrap gap-2.5",children:e.jsx(ce,{options:R,displayValue:"label",placeholder:"Select Gender",selectedValues:S,onSelect:s=>k(s.map(a=>a.value)),onRemove:s=>k(s.map(a=>a.value)),className:"lgscreen:min-w-[230px] mini:min-w-[250px]",sliceCount:2})}),e.jsxs("div",{className:"flex",children:[e.jsx("form",{onSubmit:L,className:"flex items-center gap-2",children:e.jsxs("label",{className:"input input-sm h-10 flex items-center gap-2",children:[e.jsx("input",{type:"search",value:P,onChange:s=>{z(s.target.value),s.target.value===""&&A("")},placeholder:"Search...",className:"mini:min-w-[185px] lgscreen:min-w-[150px] flex-grow"}),e.jsx("button",{type:"submit",className:"btn btn-sm btn-icon",children:e.jsx("i",{className:"ki-filled ki-magnifier"})})]})}),e.jsx("p",{className:"text-red-500 text-sm mt-1",children:M||" "})]})]})]}),e.jsx("div",{className:"card-body",children:e.jsxs("div",{"data-datatable":"true","data-datatable-page-size":"10",children:[e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[70px]",children:e.jsxs("span",{className:`sort ${o==="user_id"?l==="ASC"?"asc":"desc":""}`,onClick:()=>g("user_id"),children:[e.jsx("span",{className:"sort-label",children:"Id"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${o==="first_name"?l==="ASC"?"asc":"desc":""}`,onClick:()=>g("first_name"),children:[e.jsx("span",{className:"sort-label",children:"Full name"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[250px]",children:e.jsxs("span",{className:`sort ${o==="email"?l==="ASC"?"asc":"desc":""}`,onClick:()=>g("email"),children:[e.jsx("span",{className:"sort-label",children:"Email"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[190px]",children:e.jsxs("span",{className:`sort ${o==="mobile_number"?l==="ASC"?"asc":"desc":""}`,onClick:()=>g("mobile_number"),children:[e.jsx("span",{className:"sort-label",children:"Mobile no"}),e.jsx("span",{className:"sort-icon"})]})}),e.jsx("th",{className:"min-w-[80px]",children:"Gender"}),e.jsx("th",{className:"min-w-[150px]",children:"Total Pending Amount"}),(d(8,"read")||d(8,"update")||d(8,"delete"))&&e.jsx("th",{className:"min-w-[180px]",children:"Actions"})]})}),G?e.jsx(le,{}):m.length>0?e.jsx("tbody",{children:m==null?void 0:m.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-2.5",children:s.user_id})}),e.jsx("td",{children:e.jsxs("div",{className:"flex items-center gap-1.5",children:[s.first_name," ",s.last_name]})}),e.jsx("td",{children:s.email}),e.jsx("td",{children:e.jsx("div",{className:"flex items-center gap-1.5",children:s.mobile_number})}),e.jsx("td",{children:F[s.gender]}),e.jsx("td",{children:s.total_due_amount}),(d(8,"read")||d(8,"update")||d(8,"delete"))&&e.jsxs("td",{className:"space-x-3",children:[d(8,"read")&&e.jsx("button",{className:"bg-yellow-100 hover:bg-yellow-200 p-[9px] rounded-full",style:{marginBottom:"-30px"},onClick:()=>O(s.user_id),children:e.jsx(H,{size:18,className:"text-gray-600"})}),d(8,"update")&&e.jsx("button",{className:"bg-yellow-100 hover:bg-yellow-200 p-3 rounded-full",onClick:()=>V(s.user_id),children:e.jsx(J,{className:"text-yellow-600"})}),d(8,"delete")&&e.jsx("button",{className:"bg-red-100 hover:bg-red-200 p-3 rounded-full",onClick:()=>K(s.user_id),children:e.jsx(Q,{className:"text-red-500"})})]})]},s.user_id))}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"text-center",children:"No customer available"})})})]})}),N>i&&e.jsx("div",{className:"card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-gray-600 text-2sm font-medium",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs("span",{className:"text-gray-700",children:["Showing ",m.length," of ",N," Users"]}),e.jsxs("div",{className:"pagination","data-datatable-pagination":"true",children:[e.jsx("button",{disabled:t===1,onClick:()=>w(t-1),className:`btn ${t===1?"disabled":""}`,children:e.jsx(X,{})}),Array.from({length:f}).map((s,a)=>e.jsx("button",{className:`btn ${t===a+1?"active":""}`,onClick:()=>w(a+1),children:a+1},a)),e.jsx("button",{disabled:t===f,onClick:()=>w(t+1),className:`btn ${t===f?"disabled":""}`,children:e.jsx(ee,{})})]})]})})]})})]})},me=()=>{const{customerActivityData:t,fetchCustomerActivityData:n}=te();c.useEffect(()=>{n()},[]);const i=(t==null?void 0:t.map(r=>r.month.split("-")[0]))||[],o={series:[{name:"Login Count",data:(t==null?void 0:t.map(r=>r.login_count))||[]}],options:{chart:{type:"area",height:240,toolbar:{show:!1}},dataLabels:{enabled:!1},colors:["#4154f1"],fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:.1}},grid:{borderColor:"rgba(0, 0, 0, 0)",strokeDashArray:5,padding:{top:0,right:0,bottom:20,left:8}},stroke:{curve:"smooth",show:!0,width:3,colors:["#4154f1"]},legend:{show:!1},xaxis:{type:"category",categories:i,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},markers:{colors:"#4154f1",strokeColors:"#4154f1",strokeWidth:4,hover:{size:5}},yaxis:{min:0,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:r=>r>=1e3?`₹${(r/1e3).toFixed(0)}K`:r.toString()}},responsive:[{breakpoint:480,options:{legend:{position:"bottom"}}}],tooltip:{x:{format:"MMM yyyy"}}}};return e.jsxs("div",{className:"card w-full pb-2.5 max-h-[250px] rounded-md",children:[e.jsx("div",{className:"flex justify-between ml-6 mt-2",children:e.jsxs("div",{children:[e.jsx("h3",{className:"card-title text-lg",children:"Activity"}),e.jsx("span",{className:"text-gray-500 font-medium",children:"Customer Login Count"})]})}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-1",children:e.jsx(v,{options:o.options,series:o.series,type:o.options.chart.type,height:200})})]})},he=()=>{const{customerData:t,fetchNewCustomerData:n}=ae();c.useEffect(()=>{n()},[]);const i=(t==null?void 0:t.map(l=>l.month.split("-")[0]))||[],h=(t==null?void 0:t.map(l=>l.customer_count))||[],o=t==null?void 0:t.reduce((l,x)=>l+Number(x.customer_count),0),r={series:[{name:"New Customer",data:h}],options:{chart:{fontFamily:"inherit",type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!1,columnWidth:"40%",borderRadius:5}},legend:{show:!1},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:"blue"},xaxis:{type:"category",categories:i,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},yaxis:{min:0,tickAmount:5,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:l=>l>=1e3?`₹${(l/1e3).toFixed(0)}K`:l.toString()}},fill:{opacity:1},states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"none",value:0}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"none",value:0}}},tooltip:{style:{fontSize:"12px"}},colors:["#ECE852"],grid:{strokeDashArray:4,yaxis:{lines:{show:!0}}}}};return e.jsx("div",{className:"col-span-1",children:e.jsxs("div",{className:"card w-full rounded-md",children:[e.jsxs("div",{className:"card-header border-none",children:[e.jsx("div",{className:"flex flex-col justify-between",children:e.jsx("h3",{className:"card-title",children:"New Customer"})}),e.jsx("div",{className:"mt-2",children:e.jsxs("span",{className:"p-3 bg-red-50 rounded-md relative text-gray-500 semibold",children:["+",o]})})]}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-1",children:e.jsx(v,{options:r.options,series:r.series,type:r.options.chart.type,height:170})})]})})},xe=()=>{const{customerData:t,fetchInActiveCustomerData:n}=re();c.useEffect(()=>{n()},[]);const i=(t==null?void 0:t.map(r=>r.month.split("-")[0]))||[],o={series:[{name:"No Active Customer",data:(t==null?void 0:t.map(r=>r.not_active_count))||[]}],options:{chart:{type:"area",height:200,toolbar:{show:!1}},dataLabels:{enabled:!1},colors:["#4154f1"],fill:{gradient:{enabled:!0,opacityFrom:.25,opacityTo:.1}},grid:{borderColor:"rgba(0, 0, 0, 0)",strokeDashArray:5,padding:{top:0,right:0,bottom:2,left:8}},stroke:{curve:"smooth",show:!0,width:3,colors:["#4154f1"]},legend:{show:!1},xaxis:{type:"category",categories:i,labels:{show:!0,style:{colors:"#6B7280",fontSize:"12px",fontWeight:500}},axisTicks:{show:!0,color:"#D1D5DB",height:6},axisBorder:{show:!0,color:"#D1D5DB"},crosshairs:{position:"front",stroke:{color:"#3B82F6",width:1,dashArray:3}}},markers:{colors:"#4154f1",strokeColors:"#4154f1",strokeWidth:4,hover:{size:5}},yaxis:{min:0,tickAmount:1,axisTicks:{show:!1},labels:{style:{colors:"var(--tw-gray-500)",fontSize:"12px"},formatter:r=>r>=1e3?`₹${(r/1e3).toFixed(0)}K`:r.toString()}},tooltip:{x:{format:"MMM yyyy"}}}};return e.jsxs("div",{className:"card pb-2.5 max-h-[250px] rounded-md",children:[e.jsx("div",{className:"flex justify-between ml-5 mt-2",children:e.jsx("div",{children:e.jsx("h3",{className:"card-title text-lg",children:"In Active Customer"})})}),e.jsx("div",{className:"card-body flex flex-col justify-end items-stretch grow px-0 py-3",children:e.jsx(v,{options:o.options,series:o.series,type:o.options.chart.type,height:o.options.chart.height})})]})},ve=()=>{const t=E(),{hasPermission:n}=T(),i=()=>{t("/customer/add")};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fixed grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 desktop:grid-cols-1 zx:grid-cols-1 pb-8 gap-x-4 gap-y-4",children:[e.jsx(me,{}),e.jsx(he,{}),e.jsx(xe,{})]}),e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-4",children:[e.jsx("div",{className:"flex flex-col justify-center gap-2",children:e.jsx("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:"Customers"})}),n(8,"create")&&e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsxs("button",{className:"btn btn-primary",onClick:i,children:[e.jsx("i",{className:"ki-filled ki-plus-squared"}),"Add Customer"]})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(de,{})})})})]})};export{ve as default};
