/**
 * @name christening-birthday-invitation
 * @description Beautiful Custom Paperless Christening-Birthday Invitation.
 *
 * @version 1.0.0
 * @author Eleonora Atanasova & Deyan Stamboliev
 * @license Apache-2.0
 */
!function(){"use strict";self.addEventListener("message",(async({data:e})=>{try{const s=await Promise.all(e.map((e=>fetch(e)))),a=await Promise.all(s.map((e=>e.blob()))),t=await Promise.all(a.map((e=>{return s=e,new Promise(((e,a)=>{const t=new FileReader;t.addEventListener("load",(()=>e(t.result))),t.addEventListener("error",a),t.readAsDataURL(s)}));var s})));self.postMessage({success:!0,base64:t})}catch(s){self.postMessage({success:!1,error:s})}}))}();
