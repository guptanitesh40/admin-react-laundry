import{G as z,r as t,j as a}from"./index-DGiT1R86.js";import{g as A}from"./orderStatusClasses-HfHBGnti.js";function w(i){return z({attr:{version:"1",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"polygon",attr:{fill:"#43A047",points:"40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"},child:[]}]})(i)}const W=({options:i=[],displayValue:B,placeholder:k,selectedValues:r,onRemove:C,onSelect:$,setSearch:m,search:v="",isSearchInput:j=!1,className:p="",sliceCount:s=1,isCustomLabel:O=!1})=>{const[E,N]=t.useState(!1),[L,g]=t.useState(v),o=t.useRef(null),S=()=>{g(""),m&&m(""),N(n=>!n)},d=n=>{const c=r!=null&&r.includes(n.value)?r==null?void 0:r.filter(l=>l!==n.value):[...r,n.value],h=i.filter(l=>c==null?void 0:c.includes(l.value));r!=null&&r.includes(n.value)?C(h):$(h)},R=n=>{const c=n.target.value;g(c),m&&m(c)},x=v||L,f=j?i.filter(n=>n.label.toLowerCase().includes(x.toLowerCase())):i,b=n=>{o.current&&!o.current.contains(n.target)&&N(!1)};t.useEffect(()=>(document.addEventListener("mousedown",b),()=>{document.removeEventListener("mousedown",b)}),[]);const y=f.length===0&&i.length>0,e=x&&i.length===0;return a.jsxs("div",{className:`multi-select-container ${p}`,ref:o,children:[a.jsx("div",{className:"multi-select",onClick:S,children:(r==null?void 0:r.length)===0?a.jsx("span",{className:"placeholder",children:k}):a.jsxs("div",{className:"selected-options",children:[(i==null?void 0:i.length)>0?i.filter(n=>r==null?void 0:r.includes(n.value)).slice(0,s).map(n=>{const c=/\(\d+\)$/.test(n.label);let h;if(n.label.length>25)if(c){const l=n.label.match(/\(\d+\)$/),u=l?l[0]:"";h=`${n.label.replace(u,"").trim().slice(0,10)}... ${u}`}else h=`${n.label.slice(0,25)}`;else h=n.label;return a.jsx("span",{className:"selected-option",children:h},n.value)}):null,(r==null?void 0:r.length)>s&&a.jsxs("span",{className:"selected-option",children:["+",r.length-s]})]})}),E&&a.jsxs("div",{className:"dropdown-menu",children:[j&&a.jsx("input",{type:"text",className:"search-input",placeholder:"Search...",value:x,onChange:R}),a.jsx("ul",{children:f.length>0?f.map(n=>{const c=A(n.label,!0);return O?a.jsxs("li",{className:`dropdown-item ${c} ${r!=null&&r.includes(n.value)?"selected":""}`,onClick:()=>d(n),children:[a.jsx("span",{children:n.label}),(r==null?void 0:r.includes(n.value))&&a.jsx("span",{className:"checkmark",children:a.jsx(w,{size:18})})]},n.value):a.jsxs("li",{className:`dropdown-item ${r!=null&&r.includes(n.value)?"selected":""}`,onClick:()=>d(n),children:[a.jsx("span",{children:n.label}),(r==null?void 0:r.includes(n.value))&&a.jsx("span",{className:"checkmark",children:a.jsx(w,{size:18})})]},n.value)}):e?a.jsx("li",{className:"no-search",children:"No customers found"}):y?a.jsx("li",{className:"no-search",children:"No results match"}):null})]})]})};export{W as M};
