import{r,B as y,V as f,v as P,j as e,L as k}from"./index-BXIzzU16.js";import{T as w}from"./TableShimmer-CJQgi6li.js";const E=()=>{const[m,s]=r.useState(!1),[h,n]=r.useState(),i=async()=>{const o=localStorage.getItem("authToken");s(!0);try{const t=await fetch(`${y}/modules`,{method:"GET",headers:{Authorization:`Bearer ${o}`}}),c=await t.json();if(!t.ok){f.error(c.message,{position:"top-center"}),s(!1);return}n(c==null?void 0:c.data)}catch{f.error("Network error: Failed to fetch modules data.")}finally{s(!1)}};return r.useEffect(()=>{i()},[]),{modulesData:h,fetchModulesData:i,loading:m}},D=()=>{const[m,s]=r.useState(),[h,n]=r.useState(),i=async()=>{const o=localStorage.getItem("authToken");s(!0);try{const t=await fetch(`${y}/role-permission`,{method:"GET",headers:{Authorization:`Bearer ${o}`}}),c=await t.json();if(!t.ok){f.error(c.message),s(!1);return}n(c==null?void 0:c.data)}catch{f.error("Network Error : Fail to fetch Role Permissions Data")}finally{s(!1)}};return r.useEffect(()=>{i()},[]),{permissionsData:h,fetchRolesPermissions:i,loading:m}},R=()=>{const[m,s]=r.useState(!1);return{assignRolePermission:async n=>{const i=localStorage.getItem("authToken");s(!0);try{const o=await fetch(`${y}/role-permission/assign`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({rolePermission:n})}),t=await o.json();return o.ok?(f.success(t.message),!0):(f.error(t.message),!1)}catch{f.error("Fail to add assign permissions try again later")}finally{s(!1)}},loading:m}},T=({isSave:m,setIsSave:s,setIsLoading:h})=>{var S;const{modulesData:n}=E(),{assignRolePermission:i,loading:o}=R(),{permissionsData:t,loading:c}=D(),[g,b]=r.useState([]),[v,N]=r.useState([]),p=P(),j=(S=p==null?void 0:p.state)==null?void 0:S.role_id;r.useEffect(()=>{h(o)},[o]),r.useEffect(()=>{if(n&&t){const l=t.map(a=>({...a}));n.forEach(a=>{l.find(u=>u.role_id===j&&u.module_id===a.module_id)||l.push({role_id:j,module_id:a.module_id,create:!1,update:!1,read:!1,delete:!1})}),b(l),N(JSON.parse(JSON.stringify(l)))}},[n,t]),r.useEffect(()=>{if(m){if(!(JSON.stringify(g)!==JSON.stringify(v))){s(!1);return}(async()=>{try{i(g)&&(N(JSON.parse(JSON.stringify(g))),s(!1))}catch{f.error("Failed to assign role permissions. Please try again.")}})()}},[m]);const _=(l,a)=>{b(d=>d.map(u=>{if(u.role_id===j&&u.module_id===l){const x={...u,[a]:!u[a]};return a==="read"?x.read=!u.read:(a==="create"||a==="update")&&(x.create||x.update)&&(x.read=!0),x}return u}))};return e.jsx("div",{className:"card-body",children:e.jsx("div",{"data-datatable":"true","data-datatable-page-size":"10",children:e.jsx("div",{className:"scrollable-x-auto",children:e.jsxs("table",{className:"table table-auto table-border","data-datatable-table":"true",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"min-w-[200px]",children:"Modules"}),e.jsx("th",{children:"Create"}),e.jsx("th",{children:"Read"}),e.jsx("th",{children:"Update"}),e.jsx("th",{children:"Delete"})]})}),c?e.jsx(w,{}):n&&g.length>0?e.jsx("tbody",{children:n.map(l=>{const a=g.find(d=>d.role_id===j&&d.module_id===l.module_id);return e.jsxs("tr",{children:[e.jsx("td",{children:l.module_name}),["create","read","update","delete"].map(d=>e.jsx("td",{children:e.jsx("input",{className:"w-4 h-4",type:"checkbox",checked:a?a[d]:!1,onChange:()=>_(l.module_id,d)})},d))]},l.module_id)})}):e.jsx("tbody",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center",children:"No Modules Data Available"})})})]})})})})},O=()=>{var t;const[m,s]=r.useState(!1),[h,n]=r.useState(!1),i=P(),o=(t=i==null?void 0:i.state)==null?void 0:t.role;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"container-fixed",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-5 pb-5",children:[e.jsxs("div",{className:"flex flex-col justify-center gap-2",children:[e.jsxs("h1",{className:"text-xl font-semibold leading-none text-gray-900",children:[o," Permissions"]}),e.jsxs("p",{className:"text-sm text-gray-500",children:["Manage permissions for the ",o,"."]})]}),e.jsx("div",{className:"flex items-center gap-2.5",children:e.jsx("button",{className:"btn btn-primary",onClick:()=>s(!0),disabled:h,children:h?e.jsxs(e.Fragment,{children:[" ","Saving"," ",e.jsx(k,{})," "]}):e.jsx(e.Fragment,{children:"Save Changes"})})})]})}),e.jsx("div",{className:"container-fixed",children:e.jsx("div",{className:"grid gap-5 lg:gap-7.5",children:e.jsx("div",{className:"card card-grid min-w-full",children:e.jsx(T,{isSave:m,setIsSave:s,setIsLoading:n})})})})]})};export{O as default};
