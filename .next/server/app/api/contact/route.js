"use strict";(()=>{var e={};e.id=386,e.ids=[386],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},92048:e=>{e.exports=require("fs")},55315:e=>{e.exports=require("path")},17718:e=>{e.exports=require("node:child_process")},6005:e=>{e.exports=require("node:crypto")},30604:e=>{e.exports=require("node:dns")},15673:e=>{e.exports=require("node:events")},87561:e=>{e.exports=require("node:fs")},88849:e=>{e.exports=require("node:http")},22286:e=>{e.exports=require("node:https")},87503:e=>{e.exports=require("node:net")},70612:e=>{e.exports=require("node:os")},49411:e=>{e.exports=require("node:path")},84492:e=>{e.exports=require("node:stream")},31764:e=>{e.exports=require("node:tls")},41041:e=>{e.exports=require("node:url")},47261:e=>{e.exports=require("node:util")},65628:e=>{e.exports=require("node:zlib")},95206:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>m,requestAsyncStorage:()=>f,routeModule:()=>c,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>l});var n=r(49303),a=r(88716),s=r(60670),i=r(87070),p=r(84191),d=r(42546);async function l(e){try{let{name:t,email:r,phone:o,message:n}=await e.json();if(!t||!r||!n)return i.NextResponse.json({error:"Missing required fields"},{status:400});let a={id:(0,p.pZ)(),name:t,email:r,phone:o||"",message:n,date:new Date().toISOString()};return(0,p.l6)(e=>{e.messages=e.messages||[],e.messages.unshift(a)}),(0,d.L)({name:t,email:r,phone:o,message:n}).catch(e=>{console.error("Error triggering contact notification:",e)}),i.NextResponse.json({ok:!0})}catch(e){return console.error("Contact API Error:",e),i.NextResponse.json({error:"Internal Server Error"},{status:500})}}let c=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},resolvedPagePath:"D:\\web apps\\sypanel-nextjs\\app\\api\\contact\\route.js",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:f,staticGenerationAsyncStorage:u,serverHooks:g}=c,x="/api/contact/route";function m(){return(0,s.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}},84191:(e,t,r)=>{r.d(t,{CZ:()=>p,l6:()=>d,pZ:()=>l});var o=r(92048),n=r.n(o),a=r(55315),s=r.n(a);function i(){for(let e of[s().join(process.cwd(),"data","db.json"),s().join(process.cwd(),"smart-panel","data","db.json"),s().join(__dirname,"..","data","db.json"),s().join(__dirname,"..","..","data","db.json"),s().resolve("data","db.json")])if(n().existsSync(e))return e;return s().join(process.cwd(),"data","db.json")}function p(){try{let e=i(),t=n().readFileSync(e,"utf-8");return JSON.parse(t)}catch(e){return console.error("Error reading db.json:",e),{settings:{},advantages:[],servicesList:[],products:[],notices:[],heroSlides:[],reviews:[],projects:[],processSteps:[],faqs:[],governmentRates:[],additionalRates:[],technicalData:[],installationTools:[],sectors:[],about:{chairperson:{name:"",title:"",image:"",message:""},story:"",mission:"",vision:"",whatWeStandFor:[],boardOfDirectors:[],management:[]},gallery:[],catalogue:[],blogs:[],investorRelations:[],dealershipInquiries:[],messages:[],newsletterSubs:[]}}}function d(e){let t=p(),r=e(t);return function(e){let t=i();n().writeFileSync(t,JSON.stringify(e,null,2),"utf-8")}(t),r}function l(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}},42546:(e,t,r)=>{r.d(t,{J:()=>s,L:()=>a});var o=r(8892);function n(){let e=process.env.SMTP_HOST||"mail.prefabpanelnepal.com",t=parseInt(process.env.SMTP_PORT||"465",10),r="false"!==process.env.SMTP_SECURE&&465===t,n=process.env.SMTP_USER||"contact@prefabpanelnepal.com",a=process.env.SMTP_PASS||"";return a?o.ZP.createTransport({host:e,port:t,secure:r,auth:{user:n,pass:a},tls:{rejectUnauthorized:!1}}):(console.warn("SMTP_PASS is not configured. Email notification skipped."),null)}async function a({name:e,email:t,phone:r,message:o}){try{let a=n();if(!a)return!1;let s=`"Smart Panel Website" <${process.env.SMTP_USER||"contact@prefabpanelnepal.com"}>`,i=process.env.SMTP_TO||"contact@prefabpanelnepal.com, info@prefabpanelnepal.com",p={from:s,to:i,replyTo:t,subject:`New Contact Inquiry from ${e} - Smart Panel`,html:`
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
      `};return await s.sendMail(d),!0}catch(e){return console.error("Failed to send dealership email notification:",e),!1}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,8892],()=>r(95206));module.exports=o})();