import{j as e,bd as C,v as w,S as L,B as P,be as I,ah as K,bf as M,T as z,G as Y,aM as q,aN as E,J as b,K as v,L as ae,F as se,bg as R,E as ie,r as N,b as le,e as te,bh as S,bi as j,bj as h,bk as T,k as F,l as d,M as g,m as p,bl as V,bm as A,P as oe,bn as ne,C as re,f as ue,bo as ce,x as k,bp as me,bq as he}from"./index-783c8751.js";import{M as de,r as ge}from"./index-8887135f.js";import{T as H}from"./TextEditor-a629affa.js";const{Title:pe}=z,be=({postList:t,onDelete:l,onUpdate:r})=>{const c=[{title:"Tiêu Đề",dataIndex:"tieuDe",width:"20%",key:"tieuDe",render:s=>e.jsxDEV(pe,{level:5,className:"capitalize",children:s},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:33,columnNumber:25},globalThis)},{title:"Nội Dung",width:"45%",dataIndex:"noiDung",key:"noiDung",render:s=>e.jsxDEV(de,{rehypePlugins:[ge],children:s},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:40,columnNumber:25},globalThis)},{title:"Link",width:"10%",dataIndex:"slug",key:"slug"},{title:"Ngày Đăng",width:"10%",key:"createAt",dataIndex:"createAt",render:s=>e.jsxDEV("span",{children:w(s).format("DD/MM/YYYY")},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:53,columnNumber:25},globalThis)},{title:"Tương Tác",width:"15%",key:"id",dataIndex:"key",render:s=>e.jsxDEV(L,{size:"middle",children:[e.jsxDEV(P,{onClick:()=>r&&r(s),icon:e.jsxDEV(I,{className:"text-green-500"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:62,columnNumber:66},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:62,columnNumber:11},globalThis),e.jsxDEV(K,{okText:"xoá",cancelText:"huỷ",title:"Xoá Bài Viết",description:"xác nhận xoá",onConfirm:()=>l&&l(s),children:e.jsxDEV(P,{icon:e.jsxDEV(M,{className:"text-red-500"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:64,columnNumber:25},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:64,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:63,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:61,columnNumber:9},globalThis)}],n=t?t.map(s=>({key:s.id,tieuDe:s.tieuDe,noiDung:s.noiDung,slug:s.slug,createAt:s.createAt})):[];return e.jsxDEV("div",{children:e.jsxDEV(C,{pagination:!1,columns:c,dataSource:n},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:81,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportPostList.tsx",lineNumber:80,columnNumber:5},globalThis)},Ne=({onSubmit:t,defaultVal:l})=>{const r=Y({enableReinitialize:!0,initialValues:{tieuDe:l?l.tieuDe:"",noiDung:l?l.noiDung:"",tenKySu:l&&l.tenKySu?l.tenKySu:"",hinhAnh:null},validationSchema:q({tieuDe:E().required("*tiêu đề buộc nhập"),noiDung:E().required("*nội dung buộc nhập")}),onSubmit:u=>{t(u),r.resetForm()}}),{handleSubmit:c,handleChange:n,errors:s,touched:m,setFieldValue:i,values:x}=r;return e.jsxDEV(b,{wrapperCol:{span:18},labelCol:{span:6},onSubmitCapture:c,children:[e.jsxDEV(b.Item,{label:"Tiêu Đề",children:[e.jsxDEV(v,{name:"tieuDe",value:x.tieuDe,placeholder:"Nhập Tiêu Đề",onChange:n},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:43,columnNumber:9},globalThis),s.tieuDe&&m.tieuDe&&e.jsxDEV("span",{className:"text-red-500",children:s.tieuDe},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:50,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:42,columnNumber:7},globalThis),e.jsxDEV(b.Item,{label:"Người Hướng Dẫn",children:[e.jsxDEV(v,{name:"tenKySu",value:x.tenKySu,placeholder:"Nhập Tên Người Hướng Dẫn",onChange:n},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:54,columnNumber:9},globalThis),s.tenKySu&&m.tenKySu&&e.jsxDEV("span",{className:"text-red-500",children:s.tenKySu},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:61,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:53,columnNumber:7},globalThis),e.jsxDEV(b.Item,{label:"Hình Ảnh",children:[e.jsxDEV(ae,{filesQuantity:4,getfiles:u=>i("hinhAnh",u)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:66,columnNumber:9},globalThis),l&&l.hinhAnh&&Array.isArray(l.hinhAnh)&&e.jsxDEV(se,{gap:8,children:l.hinhAnh.map(u=>e.jsxDEV(R,{shape:"square",src:u.hinhAnh,size:80},u.id,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:75,columnNumber:24},globalThis))},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:73,columnNumber:13},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:65,columnNumber:7},globalThis),e.jsxDEV(b.Item,{wrapperCol:{span:24},children:[e.jsxDEV(H,{defaultValue:x.noiDung,height:700,onChange:u=>i("noiDung",u)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:82,columnNumber:9},globalThis),s.noiDung&&m.noiDung&&e.jsxDEV("span",{className:"text-red-500",children:s.noiDung},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:88,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:81,columnNumber:7},globalThis),e.jsxDEV(b.Item,{wrapperCol:{span:24},className:"sticky bottom-0 right-0",children:e.jsxDEV(P,{htmlType:"submit",type:"primary",className:"w-full rounded-none",children:l?"Cập Nhật":"Đăng Bài"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:92,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:91,columnNumber:7},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostForm.tsx",lineNumber:36,columnNumber:5},globalThis)};function xe(t){const l="àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",r="aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";for(let c=0,n=l.length;c<n;c++)t=t.replace(RegExp(l[c],"gi"),r[c]);return t=t.toLowerCase().trim().replace(/[^a-z0-9/-]/g,"-").replace(/-+/g,"-"),t}const fe=({onSubmit:t,defaultVal:l})=>{const r=Y({enableReinitialize:!0,initialValues:{tieuDe:l?l.tieuDe:"",noiDung:l?l.noiDung:"",slug:l?l.slug:""},validationSchema:q({tieuDe:E().required("*tiêu đề buộc nhập"),noiDung:E().required("*nội dung buộc nhập")}),onSubmit:u=>{const f={...u,slug:xe(u.tieuDe)};t(f),r.resetForm()}}),{handleSubmit:c,handleChange:n,errors:s,touched:m,setFieldValue:i,values:x}=r;return e.jsxDEV(b,{onSubmitCapture:c,children:[e.jsxDEV(b.Item,{label:"Tiêu Đề",children:[e.jsxDEV(v,{name:"tieuDe",value:x.tieuDe,placeholder:"Nhập Tiêu Đề",onChange:n},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:43,columnNumber:9},globalThis),s.tieuDe&&m.tieuDe&&e.jsxDEV("span",{className:"text-red-500",children:s.tieuDe},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:49,columnNumber:45},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:42,columnNumber:7},globalThis),e.jsxDEV(b.Item,{children:[e.jsxDEV(H,{defaultValue:x.noiDung,height:700,onChange:u=>i("noiDung",u)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:53,columnNumber:9},globalThis),s.noiDung&&m.noiDung&&e.jsxDEV("span",{className:"text-red-500",children:s.noiDung},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:54,columnNumber:47},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:52,columnNumber:7},globalThis),e.jsxDEV(b.Item,{className:"sticky bottom-0 right-0",children:e.jsxDEV(P,{htmlType:"submit",type:"primary",className:"w-full rounded-none",children:l?"Cập Nhật":"Đăng Bài"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:57,columnNumber:9},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:56,columnNumber:7},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/SupportForm.tsx",lineNumber:40,columnNumber:5},globalThis)},{Title:ye}=z,Pe=({postList:t,onDelete:l,onUpdate:r})=>{const c=[{title:"Hình Ảnh",width:"15%",dataIndex:"hinhAnh",key:"hinhAnh",render:(s,m)=>e.jsxDEV(R,{size:100,shape:"square",src:m.hinhAnh.hinhAnh??ie},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:35,columnNumber:20},globalThis)},{title:"Tiêu Đề",dataIndex:"tieuDe",width:"20%",key:"tieuDe",render:s=>e.jsxDEV(ye,{level:5,className:"capitalize",children:s},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:43,columnNumber:25},globalThis)},{title:"Kỹ Sư",width:"15%",dataIndex:"tenKySu",key:"tenKySu"},{title:"Ngày Đăng",width:"10%",key:"createAt",dataIndex:"createAt",render:s=>e.jsxDEV("span",{children:w(s).format("DD/MM/YYYY")},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:56,columnNumber:25},globalThis)},{title:"Tương Tác",width:"15%",key:"id",dataIndex:"key",render:s=>e.jsxDEV(L,{size:"middle",children:[e.jsxDEV(P,{onClick:()=>r&&r(s),icon:e.jsxDEV(I,{className:"text-green-500"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:65,columnNumber:66},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:65,columnNumber:11},globalThis),e.jsxDEV(K,{okText:"xoá",cancelText:"huỷ",title:"Xoá Bài Viết",description:"xác nhận xoá",onConfirm:()=>l&&l(s),children:e.jsxDEV(P,{icon:e.jsxDEV(M,{className:"text-red-500"},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:67,columnNumber:25},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:67,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:66,columnNumber:11},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:64,columnNumber:9},globalThis)}],n=t?t.map(s=>({key:s.maBaiViet,tieuDe:s.tieuDe,noiDung:s.noiDung,tenKySu:s.tenKySu,hinhAnh:s.hinhAnh[0],createAt:s.createAt})):[];return e.jsxDEV("div",{children:e.jsxDEV(C,{pagination:!1,columns:c,dataSource:n},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:85,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/partials/FixPostList.tsx",lineNumber:84,columnNumber:5},globalThis)},Be=()=>{const t=new AbortController,[l,r]=N.useState("1"),[c,n]=N.useState(!1),[s,m]=N.useState(!1),i=le(),{loading:x,supportPostList:u,supportPost:f,fixPostList:O,fixPost:D}=te(a=>a.common.blog);N.useEffect(()=>(i(S()),i(j()),()=>{t.abort()}),[]);const U=a=>{r(a)},_=N.useCallback(async a=>{i(h(!1));try{(await T.createSupportPost(a,t.signal)).status===F.success&&(i(d({message:g.createSuccess,status:p.success})),n(!1),i(S()))}catch{i(d({message:g.createFaild,status:p.error}))}finally{i(h(!1))}},[]),G=N.useCallback(async a=>{i(h(!0));try{(await T.deleteSupportPost(a,t.signal)).status===F.success&&(i(d({message:g.deleteSuccess,status:p.success})),i(S()))}catch{i(d({message:g.deleteFaild,status:p.error}))}finally{i(h(!1))}},[]),X=async a=>{await i(me(a)),n(!0)},$=N.useCallback(async a=>{if(f){i(h(!0));try{(await T.updateSupportPost(f==null?void 0:f.id,a,t.signal)).status===F.success&&(i(d({message:g.updateSuccess,status:p.success})),i(S()),n(!1),i(V()))}catch{i(d({message:g.updateFaild,status:p.error}))}finally{i(h(!1))}}},[]),J=async a=>{var B;i(h(!0));const o=new FormData;o.append("tieuDe",a.tieuDe),o.append("noiDung",a.noiDung),a.tenKySu&&o.append("tenKySu",a.tenKySu),a.hinhAnh&&Array.isArray(a.hinhAnh)&&((B=a.hinhAnh)==null||B.forEach(y=>{o.append("hinhAnh",y.originFileObj)}));try{(await T.createFixPost(o,t.signal)).status===F.success&&(i(d({message:g.createSuccess,status:p.success})),m(!1))}catch{i(d({message:g.createFaild,status:p.error}))}finally{i(h(!1))}},Q=N.useCallback(async a=>{i(h(!0));try{(await T.deleteFixPost(a,t.signal)).status===F.success&&(i(d({message:g.deleteSuccess,status:p.success})),i(j()))}catch{i(d({message:g.deleteFaild,status:p.error}))}finally{i(h(!1))}},[]),W=async a=>{await i(he(a)),m(!0)},Z=N.useCallback(async a=>{var B;if(!D)return;i(h(!0));const o=new FormData;a.tieuDe&&o.append("tieuDe",a.tieuDe),a.noiDung&&o.append("noiDung",a.noiDung),a.tenKySu&&o.append("tenKySu",a.tenKySu),a.hinhAnh&&Array.isArray(a.hinhAnh)&&((B=a.hinhAnh)==null||B.forEach(y=>{o.append("hinhAnh",y.originFileObj)}));try{(await T.updateFixPost(D==null?void 0:D.maBaiViet,o,t.signal)).status===F.success&&(i(d({message:g.updateSuccess,status:p.success})),i(j()),m(!1),i(A()))}catch{i(d({message:g.updateFaild,status:p.error}))}finally{i(h(!1))}},[]),ee=[{key:"1",label:"Bài Viết Chính Sách",children:e.jsxDEV(be,{onUpdate:a=>X(a),onDelete:a=>G(a),postList:u},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:284,columnNumber:9},globalThis)},{key:"2",label:"Bài Viết Hướng Dẫn",children:e.jsxDEV(Pe,{onDelete:a=>Q(a),onUpdate:a=>W(a),postList:O},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:295,columnNumber:9},globalThis)}];return e.jsxDEV(oe,{headerprops:{title:"Bài Viết Hỗ Trợ",extra:[e.jsxDEV(P,{onClick:()=>{l==="1"?n(a=>!a):m(a=>!a)},type:"primary",className:"capitalize flex items-center justify-between",icon:e.jsxDEV(ne,{},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:320,columnNumber:19},globalThis),children:"Thêm Bài Viết"},"button-add-post",!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:309,columnNumber:11},globalThis)],className:"mt-4"},footerprops:{children:re,className:"text-center"},className:"bg-inherit",children:e.jsxDEV(ue,{spinning:x,children:[e.jsxDEV(ce,{defaultActiveKey:l,items:ee,onChange:U},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:334,columnNumber:9},globalThis),e.jsxDEV(k,{title:"Đăng Bài",width:"50%",open:c,onClose:()=>{n(!1),i(V())},className:"relative",children:e.jsxDEV(fe,{defaultVal:f,onSubmit:a=>{f?$(a):_(a)}},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:350,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:340,columnNumber:9},globalThis),e.jsxDEV(k,{title:"Đăng Bài",width:"50%",open:s,onClose:()=>{i(A()),m(!1)},className:"relative",children:e.jsxDEV(Ne,{defaultVal:D,onSubmit:a=>{D?Z(a):J(a)}},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:373,columnNumber:11},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:363,columnNumber:9},globalThis)]},void 0,!0,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:333,columnNumber:7},globalThis)},void 0,!1,{fileName:"/home/dsu792/source/learn-technical/duy-hai-admin/src/pages/BlogPage/BlogPage.tsx",lineNumber:305,columnNumber:5},globalThis)};export{Be as default};
