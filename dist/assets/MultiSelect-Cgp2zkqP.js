import{G as $,r as l,j as a,b1 as y}from"./index-3B_tfnpe.js";import{g as z}from"./orderStatusClasses-DgGpuqsn.js";function w(s){return $({tag:"svg",attr:{version:"1",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"polygon",attr:{fill:"#43A047",points:"40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"},child:[]}]})(s)}const F=({options:s=[],displayValue:M,placeholder:N,selectedValues:r,onRemove:p,onSelect:k,setSearch:i,search:e="",isSearchInput:x=!0,className:C="",sliceCount:t=1,isCustomLabel:b=!1})=>{const[O,v]=l.useState(!1),[E,u]=l.useState(e),h=l.useRef(null),L=()=>{u(""),i&&i(""),v(n=>!n)},j=n=>{const c=r.includes(n.value)?r.filter(d=>d!==n.value):[...r,n.value],g=s.filter(d=>c.includes(d.value));r.includes(n.value)?p(g):k(g)},S=n=>{const c=n.target.value;u(c),i&&i(c)},o=e||E,m=x?s.filter(n=>n.label.toLowerCase().includes(o.toLowerCase())):s,f=n=>{h.current&&!h.current.contains(n.target)&&v(!1)};l.useEffect(()=>(document.addEventListener("mousedown",f),()=>{document.removeEventListener("mousedown",f)}),[]);const D=m.length===0&&s.length>0,R=o&&s.length===0;return a.jsxs("div",{className:`multi-select-container ${C}`,ref:h,children:[a.jsxs("div",{className:"multi-select",onClick:L,children:[(r==null?void 0:r.length)===0?a.jsx("span",{className:"placeholder",children:N}):a.jsxs("div",{className:"selected-options",children:[(s==null?void 0:s.length)>0?s.filter(n=>r==null?void 0:r.includes(n.value)).slice(0,t).map(n=>a.jsx("span",{className:"selected-option",children:n.label},n.value)):null,(r==null?void 0:r.length)>t&&a.jsxs("span",{className:"selected-option",children:["+",r.length-t]})]}),a.jsx("span",{className:"dropdown-arrow",children:a.jsx(y,{size:22})})]}),O&&a.jsxs("div",{className:"dropdown-menu",children:[x&&a.jsx("input",{type:"text",className:"search-input",placeholder:"Search...",value:o,onChange:S}),a.jsx("ul",{children:m.length>0?m.map(n=>{const c=z(n.label,!0);return b?a.jsxs("li",{className:`dropdown-item ${c} ${r!=null&&r.includes(n.value)?"selected":""}`,onClick:()=>j(n),children:[a.jsx("span",{children:n.label}),(r==null?void 0:r.includes(n.value))&&a.jsx("span",{className:"checkmark",children:a.jsx(w,{size:18})})]},n.value):a.jsxs("li",{className:`dropdown-item ${r!=null&&r.includes(n.value)?"selected":""}`,onClick:()=>j(n),children:[a.jsx("span",{children:n.label}),(r==null?void 0:r.includes(n.value))&&a.jsx("span",{className:"checkmark",children:a.jsx(w,{size:18})})]},n.value)}):R?a.jsx("li",{className:"no-search",children:"No customers found"}):D?a.jsx("li",{className:"no-search",children:"No results match"}):null})]})]})};export{F as M};
