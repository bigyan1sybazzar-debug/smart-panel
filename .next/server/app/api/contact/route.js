"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2048:e=>{e.exports=require("fs")},5315:e=>{e.exports=require("path")},7718:e=>{e.exports=require("node:child_process")},6005:e=>{e.exports=require("node:crypto")},604:e=>{e.exports=require("node:dns")},5673:e=>{e.exports=require("node:events")},7561:e=>{e.exports=require("node:fs")},8849:e=>{e.exports=require("node:http")},2286:e=>{e.exports=require("node:https")},7503:e=>{e.exports=require("node:net")},612:e=>{e.exports=require("node:os")},9411:e=>{e.exports=require("node:path")},4492:e=>{e.exports=require("node:stream")},1764:e=>{e.exports=require("node:tls")},3020:e=>{e.exports=require("node:url")},7261:e=>{e.exports=require("node:util")},5628:e=>{e.exports=require("node:zlib")},2677:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>b,requestAsyncStorage:()=>f,routeModule:()=>c,serverHooks:()=>x,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>l});var n=r(9303),a=r(8716),s=r(3131),i=r(7070),p=r(4191),d=r(2546);async function l(e){try{let{name:t,email:r,phone:o,message:n}=await e.json();if(!t||!r||!n)return i.NextResponse.json({error:"Missing required fields"},{status:400});let a={id:(0,p.pZ)(),name:t,email:r,phone:o||"",message:n,date:new Date().toISOString()};return(0,p.l6)(e=>{e.messages=e.messages||[],e.messages.unshift(a)}),(0,d.L)({name:t,email:r,phone:o,message:n}).catch(e=>{console.error("Error triggering contact notification:",e)}),i.NextResponse.json({ok:!0})}catch(e){return console.error("Contact API Error:",e),i.NextResponse.json({error:"Internal Server Error"},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"D:\\web apps\\sypanel-nextjs\\app\\api\\contact\\route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:f,staticGenerationAsyncStorage:u,serverHooks:x}=c,g="/api/contact/route";function b(){return(0,s.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:u})}},4191:(e,t,r)=>{r.d(t,{CZ:()=>p,l6:()=>d,pZ:()=>l});var o=r(2048),n=r.n(o),a=r(5315),s=r.n(a);function i(){for(let e of[s().join(process.cwd(),"data","db.json"),s().join(process.cwd(),"smart-panel","data","db.json"),s().join(__dirname,"..","data","db.json"),s().join(__dirname,"..","..","data","db.json"),s().resolve("data","db.json")])if(n().existsSync(e))return e;return s().join(process.cwd(),"data","db.json")}function p(){try{let e=i(),t=n().readFileSync(e,"utf-8");return JSON.parse(t)}catch(e){return console.error("Error reading db.json:",e),{settings:{},advantages:[],servicesList:[],products:[],notices:[],heroSlides:[],reviews:[],projects:[],processSteps:[],faqs:[],governmentRates:[],additionalRates:[],technicalData:[],installationTools:[],sectors:[]}}}function d(e){let t=p(),r=e(t);return function(e){let t=i();n().writeFileSync(t,JSON.stringify(e,null,2),"utf-8")}(t),r}function l(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}},2546:(e,t,r)=>{r.d(t,{J:()=>s,L:()=>a});var o=r(8892);function n(){let e=process.env.SMTP_HOST||"mail.prefabpanelnepal.com",t=parseInt(process.env.SMTP_PORT||"465",10),r="false"!==process.env.SMTP_SECURE&&465===t,n=process.env.SMTP_USER||"contact@prefabpanelnepal.com",a=process.env.SMTP_PASS||"";return a?o.ZP.createTransport({host:e,port:t,secure:r,auth:{user:n,pass:a},tls:{rejectUnauthorized:!1}}):(console.warn("SMTP_PASS is not configured. Email notification skipped."),null)}async function a({name:e,email:t,phone:r,message:o}){try{let a=n();if(!a)return!1;let s=`"Smart Panel Website" <${process.env.SMTP_USER||"contact@prefabpanelnepal.com"}>`,i=process.env.SMTP_TO||"contact@prefabpanelnepal.com, info@prefabpanelnepal.com",p={from:s,to:i,replyTo:t,subject:`New Contact Inquiry from ${e} - Smart Panel`,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1b5d92; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Contact Message</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Smart Panel Website Inquiry</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${e}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${t}">${t}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${r||"Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Message:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${o}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            Sent automatically from prefabpanelnepal.com contact form.
          </div>
        </div>
      `};return await a.sendMail(p),!0}catch(e){return console.error("Failed to send contact email notification:",e),!1}}async function s({name:e,email:t,phone:r,location:o,message:a}){try{let s=n();if(!s)return!1;let i=`"Smart Panel Website" <${process.env.SMTP_USER||"contact@prefabpanelnepal.com"}>`,p=process.env.SMTP_TO||"contact@prefabpanelnepal.com, info@prefabpanelnepal.com",d={from:i,to:p,replyTo:t,subject:`🚨 New Dealership Application from ${e} (${o})`,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #2b8a3e; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Dealership Inquiry</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Smart Panel Partner Application</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 130px;"><strong>Applicant Name:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${e}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${t}">${t}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Phone Number:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><strong>${r}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px;"><strong>Target District/City:</strong></td>
                <td style="padding: 8px 0; color: #2b8a3e; font-size: 14px; font-weight: bold;">${o}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;"><strong>Details / Message:</strong></td>
                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${a||"No additional message provided."}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            Sent automatically from prefabpanelnepal.com dealership application form.
          </div>
        </div>
      `};return await s.sendMail(d),!0}catch(e){return console.error("Failed to send dealership email notification:",e),!1}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,8892],()=>r(2677));module.exports=o})();