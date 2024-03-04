import{r as m,V as H,_ as $,j as e,bd as G,af as R,aL as U,v as Y,T as M,d as _,h as w,S as I,F as A,B as y,p as x,D as k,b as F,n as L,ah as z,bv as K,L as X,s as h,i as T,k as v,l as g,m as b,bB as D,M as E,be as Q,bf as q,aP as J,c as N,E as B,ag as W,ai as Z,I as C,u as ee,e as ae,P as le,H as ie,C as se,g as te,f as re,R as oe,o as S}from"./index-783c8751.js";import{S as ce}from"./SettingFilled-150d9367.js";import{M as ne,r as ue}from"./index-8887135f.js";var de={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM513.1 518.1l-192 161c-5.2 4.4-13.1.7-13.1-6.1v-62.7c0-2.3 1.1-4.6 2.9-6.1L420.7 512l-109.8-92.2a7.63 7.63 0 01-2.9-6.1V351c0-6.8 7.9-10.5 13.1-6.1l192 160.9c3.9 3.2 3.9 9.1 0 12.3zM716 673c0 4.4-3.4 8-7.5 8h-185c-4.1 0-7.5-3.6-7.5-8v-48c0-4.4 3.4-8 7.5-8h185c4.1 0 7.5 3.6 7.5 8v48z"}}]},name:"code",theme:"filled"};const me=de;var O=function(l,s){return m.createElement(H,$({},l,{ref:s,icon:me}))};O.displayName="CodeFilled";const he=m.forwardRef(O),{Text:f}=M,ge=({product:a})=>{const l=[{title:"Tiêu Đề",dataIndex:"title",width:"30%",render:t=>e.jsxDEV(f,{children:t},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:27,columnNumber:16},globalThis)},{title:"Kết Quả",className:"column-money",dataIndex:"content",render:(t,c)=>typeof t=="boolean"?t?e.jsxDEV(f,{children:[" ",e.jsxDEV("span",{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:39,columnNumber:15},globalThis),"Có"]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:37,columnNumber:13},globalThis):e.jsxDEV(R,{color:"red",children:"Không"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:42,columnNumber:13},globalThis):typeof t=="number"&&c.key!=="7"?e.jsxDEV(f,{children:[t.toLocaleString()," ",U.vnd]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:46,columnNumber:13},globalThis):c.key==="10"?e.jsxDEV(f,{children:Y(t).format("dddd MM-DD-YYYY hh:mm:ss a")},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:51,columnNumber:18},globalThis):e.jsxDEV(f,{children:t},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:53,columnNumber:20},globalThis),align:"right",width:"70%"}],s=a?[{key:"1",title:"Tiêu Đề SEO",content:a.seoTitle},{key:"2",title:"Mô Tả SEO",content:a.seoDetail},{key:"3",title:"SEO",content:a.seo},{key:"4",title:"Hot",content:a.hot},{key:"5",title:"Giá Gốc",content:a.giaGoc},{key:"6",title:"Giá Bán",content:a.giaGiam},{key:"7",title:"Tổng Số Lượng",content:a.tongSoLuong},{key:"8",title:"Link Youtube",content:a.youtubeVideo},{key:"9",title:"Danh Mục Sản phẩm",content:a.danhMucNho.tenDanhMucNho},{key:"10",title:"Ngày Thêm",content:a.createAt}]:[];return e.jsxDEV(G,{rootClassName:"rounded-none",pagination:!1,columns:l,dataSource:s,bordered:!0},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/TableProduct.tsx",lineNumber:117,columnNumber:5},globalThis)},{Title:be,Text:Pe}=M,pe=({data:a})=>{const l=_();return e.jsxDEV(w,{className:"rounded-none",children:e.jsxDEV(I,{direction:"vertical",className:"w-full",children:[e.jsxDEV(A,{align:"center",justify:"space-between",children:[e.jsxDEV(be,{level:4,children:a==null?void 0:a.tenSanPham},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:19,columnNumber:11},globalThis),e.jsxDEV(y,{onClick:()=>l(`/${x.product}/${x.updateProduct}/${a==null?void 0:a.maSanPham}`),type:"primary",children:"Chỉnh Sửa"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:20,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:18,columnNumber:9},globalThis),e.jsxDEV(k,{className:"my-0"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:22,columnNumber:9},globalThis),e.jsxDEV(Pe,{children:a==null?void 0:a.moTaNgan},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:23,columnNumber:9},globalThis),e.jsxDEV(ge,{product:a},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:24,columnNumber:9},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:17,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailContent.tsx",lineNumber:16,columnNumber:5},globalThis)};const Ne=({onClick:a,id:l})=>{const[s,t]=m.useState(!1),[c,u]=m.useState(),r=F(),n=L(),j=async(o,d)=>{r(h(!0));try{(await T.changeBaseImage(o,d)).status===v.success&&(r(g({message:"Đổi hình chính thành công!",status:b.success})),n.id&&r(D(n.id)))}catch(p){r(g({message:p.response.data.message,status:b.error}))}finally{r(h(!1))}},V=async(o,d)=>{r(h(!0));try{const p=await T.updateImageProduct(o,d);p.status===v.success&&(t(!1),r(g({message:p.data.message,status:b.success})),n.id&&r(D(n.id)))}catch{r(g({message:E.updateFaild,status:b.error}))}finally{r(h(!1))}},i=async o=>{r(h(!0));try{const d=await T.deleteImageProdcut(o);d.status===v.success&&(r(g({message:d.data.message,status:b.success})),n.id&&r(D(n.id)))}catch(d){r(g({message:d.response.data.message??E.deleteFaild,status:b.error}))}finally{r(h(!1))}},P=[{label:"Đặt Làm Hình Chính",icon:e.jsxDEV(he,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:107,columnNumber:13},globalThis),action:()=>{l&&j(l,!0)}},{label:"Đổi Hình Ảnh",icon:e.jsxDEV(Q,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:114,columnNumber:13},globalThis),action:()=>{t(o=>!o)}},{label:"Xoá Hình Ảnh",icon:e.jsxDEV(q,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:121,columnNumber:13},globalThis)}];return e.jsxDEV(I,{direction:"vertical",children:[P.map((o,d)=>d===P.length-1?e.jsxDEV(z,{title:"Xoá Hình Ảnh",description:"Có chắc chắn muốn xoá hình ảnh ?",onCancel:()=>a&&a(),onConfirm:()=>{l&&i(l),a&&a()},okText:"Có",cancelText:"Không",children:e.jsxDEV(y,{className:"w-full",icon:o.icon,children:o.label},d,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:141,columnNumber:15},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:130,columnNumber:13},globalThis):e.jsxDEV(y,{onClick:()=>{o.action&&o.action(),a&&a()},className:"w-full",icon:o.icon,children:o.label},d,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:152,columnNumber:13},globalThis)),e.jsxDEV(K,{open:s,onCancel:()=>t(!1),footer:[e.jsxDEV(y,{onClick:()=>{if(c&&l){const o=new FormData;o.append("hinhAnh",c),V(l,o)}},type:"primary",children:"Cập Nhật"},"action-update",!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:171,columnNumber:11},globalThis)],children:e.jsxDEV(X,{resetFile:s,filesQuantity:1,getfiles:o=>{o&&u(o[0].originFileObj)}},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:186,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:167,columnNumber:7},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/partials/MediaAction.tsx",lineNumber:126,columnNumber:5},globalThis)},fe=({media:a,direction:l="vertical",onUpload:s,lengthLimit:t=6})=>{const[c,u]=m.useState(a[0]),[r,n]=m.useState();m.useEffect(()=>{if(a){const i=a.find(P=>P.mainImage);u(i)}},[a]);const j=m.useCallback(i=>{u(i)},[]),V=a.sort(i=>i.id===(c==null?void 0:c.id)?-1:1);return e.jsxDEV(A,{vertical:l==="vertical",gap:8,children:[e.jsxDEV(J,{className:N("flex",l==="horizontal"?"flex-col gap-2":"order-2"),children:[a&&a.length>0&&a.map(i=>e.jsxDEV("div",{onClick:()=>j(i),className:N("w-[93px] h-[93px] border-2 border-solid border-white cursor-pointer relative",{"!border-sky-500":i.id===(c==null?void 0:c.id)}),children:[e.jsxDEV("img",{className:"w-full h-full overflow-hidden object-cover grayscale-[60%] hover:grayscale-0 transition-all duration-150",src:i.src??B},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:75,columnNumber:15},globalThis),e.jsxDEV("span",{className:N("w-3 h-3 border border-solid border-bg-white absolute top-1 left-1 rounded-full",i.mainImage?"bg-green-500":"bg-red-500")},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:81,columnNumber:15},globalThis),e.jsxDEV(W,{onOpenChange:()=>n(""),content:e.jsxDEV(Ne,{id:i.id,onClick:()=>n("")},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:88,columnNumber:26},globalThis),placement:"bottomLeft",trigger:"click",open:r===i.id,children:e.jsxDEV("div",{onClick:()=>n(P=>P?"":i.id),className:"absolute top-1 right-1 w-6 h-6 text-center leading-6 bg-black/50 hover:bg-black rounded-sm",children:e.jsxDEV(ce,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:99,columnNumber:19},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:93,columnNumber:17},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:86,columnNumber:15},globalThis)]},i.id,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:65,columnNumber:13},globalThis)),t>a.length&&e.jsxDEV("div",{className:N("w-[93px] h-[93px]","border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-all duration-200 relative"),children:[e.jsxDEV("input",{onChange:i=>{i.target&&i.target.files&&s&&s(i.target.files)},type:"file",className:"w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0  cursor-pointer z-50"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:112,columnNumber:13},globalThis),e.jsxDEV(Z,{className:"text-2xl"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:121,columnNumber:13},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:106,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:56,columnNumber:7},globalThis),e.jsxDEV("div",{className:N("w-full"),children:e.jsxDEV(C.PreviewGroup,{items:a&&c&&V.map(i=>i.src),children:e.jsxDEV(C,{rootClassName:"w-full",className:"object-cover",height:600,loading:"lazy",src:(c==null?void 0:c.src)??B,alt:"media list"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:129,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:126,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:125,columnNumber:7},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/MediaBox/MediaBox.tsx",lineNumber:55,columnNumber:5},globalThis)},{Title:xe}=M,De=({media:a,markdownContent:l,onUpload:s})=>e.jsxDEV("div",{children:[e.jsxDEV("div",{children:e.jsxDEV(fe,{onUpload:s,direction:"horizontal",media:a?a==null?void 0:a.map(t=>({id:t.id,src:t.hinhAnh,mainImage:t.hinhChinh})):[]},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:19,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:18,columnNumber:7},globalThis),e.jsxDEV(w,{className:"mt-8 rounded-none",children:[e.jsxDEV(xe,{level:5,children:"Chi Tiết Sản Phẩm"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:34,columnNumber:9},globalThis),e.jsxDEV(k,{className:"my-2"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:35,columnNumber:9},globalThis),e.jsxDEV(ne,{rehypePlugins:[ue],children:l},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:36,columnNumber:9},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:33,columnNumber:7},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/partials/DetailItem.tsx",lineNumber:17,columnNumber:5},globalThis),{Text:ye}=M,Te=()=>{ee({title:"App - Chi Tiết Sản Phẩm"});const a=L(),l=F(),{productDetail:s,loading:t}=ae(u=>u.common.product);m.useEffect(()=>{a.id&&l(D(a.id))},[]);const c=async u=>{l(h(!0));const r=new FormData;u&&u.length>0&&r.append("hinhAnh",u[0]);try{if(s){const n=await T.addImageToProduct(s.maSanPham,r);n.status===v.success&&(l(g({message:n.data.message??E.createSuccess,status:b.success})),a.id&&l(D(a.id)))}}catch(n){l(g({message:n.response.data.message??E.createFaild,status:b.error}))}finally{l(h(!1))}};return e.jsxDEV(le,{headerprops:{breadcrumb:{items:[{href:"/",title:e.jsxDEV(ie,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:76,columnNumber:22},globalThis)},{href:`/${x.product}`,title:x.product},{title:e.jsxDEV(ye,{children:x.productDetail},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:83,columnNumber:22},globalThis)}]},title:"Chi Tiết Sản Phẩm"},footerprops:{children:se,className:"text-center"},className:"bg-inherit h-auto",children:e.jsxDEV(te,{className:"px-8",children:e.jsxDEV(re,{spinning:t,children:e.jsxDEV(oe,{gutter:[64,64],children:[e.jsxDEV(S,{span:24,xl:12,children:e.jsxDEV(De,{onUpload:u=>c(u),markdownContent:s==null?void 0:s.moTa,media:s==null?void 0:s.hinhAnh},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:100,columnNumber:15},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:99,columnNumber:13},globalThis),e.jsxDEV(S,{span:24,xl:12,children:e.jsxDEV(pe,{data:s},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:108,columnNumber:15},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:107,columnNumber:13},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:97,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:96,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:95,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/ProductPage/ProductDetail/ProductDetail.tsx",lineNumber:70,columnNumber:5},globalThis)},je=Te;export{je as default};
