import{u as b,a as N,b as f,d as T,e as i,j as o,P as A,H as S,p as d,C as x,f as D,g as y,h as E,T as j,s as c,i as V,k as C,l as u,M as m,m as l,t as G}from"./index-783c8751.js";import{P as L}from"./ProductForm-61a80d32.js";import"./TextEditor-a629affa.js";import"./index-6f622855.js";const{Text:F}=j,R=()=>{b({title:"App - Thêm Sản Phẩm"});const r=N(),t=f(),g=T(),{loading:h}=i(e=>e.common.product),{subCategoriesList:p}=i(e=>e.common.menu),P=async e=>{var n;t(c(!0));const a=new FormData;a.append("tenSanPham",e.tenSanPham),a.append("giaGoc",String(e.giaGoc)),e.giaGiam>0&&a.append("giaGiam",String(e.giaGiam)),e.tongSoLuong>0&&a.append("tongSoLuong",String(e.tongSoLuong)),a.append("moTa",e.moTa),a.append("moTaNgan",e.moTaNgan),a.append("maDanhMucNho",e.maDanhMucNho),a.append("seoTitle",e.seoTitle),a.append("seoDetail",e.seoDetail),a.append("youtubeVideo",e.youtubeVideo),e.hinhAnh&&((n=e.hinhAnh)==null||n.forEach(s=>{a.append("hinhAnh",s.originFileObj)}));try{(await V.postProduct(a)).status===C.success&&(t(u({message:m.createSuccess,status:l.success})),t(G({page:1})),g(`/${d.product}`))}catch(s){t(u({message:s.response.data.message??m.createFaild,status:l.error}))}finally{t(c(!1))}};return o.jsxDEV(A,{headerprops:{breadcrumb:{items:[{href:"/",title:o.jsxDEV(S,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:82,columnNumber:22},globalThis)},{href:`/${d.product}`,title:d.product},{title:o.jsxDEV(F,{children:r.pathname.split("/")[r.pathname.split("/").length-1]},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:90,columnNumber:17},globalThis)}]},title:"Thêm Sản Phẩm"},footerprops:{children:x,className:"text-center"},className:"bg-inherit h-auto",children:o.jsxDEV(D,{spinning:h,children:o.jsxDEV(y,{className:"px-8",children:o.jsxDEV(E,{className:"rounded-none",children:o.jsxDEV(L,{getFormValue:e=>P(e),subCategories:p},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:112,columnNumber:13},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:111,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:110,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:109,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/AddProductPage/AddProductPage.tsx",lineNumber:76,columnNumber:5},globalThis)};export{R as default};