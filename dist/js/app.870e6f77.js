(function(t){function e(e){for(var s,r,o=e[0],i=e[1],u=e[2],d=0,b=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&b.push(c[r][0]),c[r]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s]);l&&l(e);while(b.length)b.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,o=1;o<n.length;o++){var i=n[o];0!==c[i]&&(s=!1)}s&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var s={},c={app:0},a=[];function r(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=s,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=i;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0d11":function(t,e,n){},"0f38":function(t,e,n){"use strict";n("8eea")},"4a40":function(t,e,n){"use strict";n("56b8")},"56b8":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("7a23"),c=n("6c02"),a=(n("b0c0"),{class:"container"}),r=Object(s["g"])("h2",{class:"text-center m-5"},"サインアップ",-1),o={class:"form-group m-5"},i=Object(s["g"])("label",{for:"name"},"ユーザー名",-1),u=Object(s["g"])("small",{id:"nameHelp",class:"form-text text-muted"},"質問や回答を投稿する際に表示されるユーザー名です。後で変更することができます。",-1),l={class:"form-group m-5"},d=Object(s["g"])("label",{for:"email"},"メールアドレス",-1),b=Object(s["g"])("small",{id:"emailHelp",class:"form-text text-muted"},"あなたのメールアドレスを他の誰とも共有することはありません。",-1),p={class:"form-group m-5"},m=Object(s["g"])("label",{for:"password"},"パスワード",-1),O=Object(s["g"])("small",{id:"passwordHelp",class:"form-text text-muted"},"パスワードは8文字以上入力してください。",-1),j={class:"form-group m-5"},g=Object(s["g"])("label",{for:"passwordConfirmation"},"パスワードの確認",-1),f=Object(s["g"])("small",{id:"passwordConfirmationHelp",class:"form-text text-muted"},"パスワードは8文字以上入力してください。",-1),h={class:"text-center m-5"};function v(t,e,n,c,v,w){return Object(s["q"])(),Object(s["d"])("div",a,[r,Object(s["g"])("div",o,[i,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return c.data.name=t}),type:"text",class:"form-control",id:"name","aria-describedby":"nameHelp",placeholder:"ユーザー名を入力してください。"},null,512),[[s["B"],c.data.name]]),u]),Object(s["g"])("div",l,[d,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return c.data.email=t}),type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"メールアドレスを入力してください。"},null,512),[[s["B"],c.data.email]]),b]),Object(s["g"])("div",p,[m,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return c.data.password=t}),type:"password",class:"form-control",id:"password","aria-describedby":"passwordHelp",placeholder:"パスワードを入力してください。"},null,512),[[s["B"],c.data.password]]),O]),Object(s["g"])("div",j,[g,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[4]||(e[4]=function(t){return c.data.passwordConfirmation=t}),type:"password",class:"form-control",id:"passwordConfirmation","aria-describedby":"passwordConfirmationHelp",placeholder:"パスワードを確認のためもう一度入力してください。"},null,512),[[s["B"],c.data.passwordConfirmation]]),f]),Object(s["g"])("div",h,[Object(s["g"])("button",{onClick:e[5]||(e[5]=function(){return c.backToHome&&c.backToHome.apply(c,arguments)}),class:"btn btn-secondary m-3"},"ホームに戻る"),Object(s["g"])("button",{onClick:e[6]||(e[6]=function(){return c.signup&&c.signup.apply(c,arguments)}),class:"btn btn-primary m-3"},"アカウント制作")])])}var w=n("1da1"),y=(n("96cf"),n("bc3a")),q=n.n(y),x=n("5502"),k={name:"Signup",props:{},setup:function(){var t=Object(c["d"])(),e=Object(x["b"])(),n=Object(s["u"])({name:"",email:"",password:"",passwordConfirmation:""});function a(){return r.apply(this,arguments)}function r(){return r=Object(w["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,q.a.post("".concat("http://localhost:3000","/signup"),{user:{name:n.name,email:n.email,password:n.password,passwordConfirmation:n.passwordConfirmation}},{withCredentials:!0}).then((function(n){n.data.signed_up?(e.dispatch("checkSignedIn"),e.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"サインアップに成功し、サインインしました。"}}),t.push({name:"home"})):e.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{error:"サインアップに失敗しました。既に登録されているメールアドレスか確認パスワードが間違っています。"}})})).catch((function(t){alert(t)}));case 2:case"end":return s.stop()}}),s)}))),r.apply(this,arguments)}function o(){e.commit("resetAlert"),t.push({name:"home"})}return{data:n,signup:a,backToHome:o}}};k.render=v;var A=k,_={class:"container"},D=Object(s["g"])("h2",{class:"text-center m-5"},"サインイン",-1),C={class:"form-group m-5"},S=Object(s["g"])("label",{for:"email"},"メールアドレス",-1),Q=Object(s["g"])("small",{id:"emailHelp",class:"form-text text-muted"},"あなたのメールアドレスを他の誰とも共有することはありません。",-1),$={class:"form-group m-5"},H=Object(s["g"])("label",{for:"password"},"パスワード",-1),R={class:"text-center m-5"};function z(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("div",_,[D,Object(s["g"])("div",C,[S,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return c.data.email=t}),type:"email",class:"form-control",id:"email","aria-describedby":"emailHelp",placeholder:"メールアドレスを入力してください。"},null,512),[[s["B"],c.data.email]]),Q]),Object(s["g"])("div",$,[H,Object(s["D"])(Object(s["g"])("input",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return c.data.password=t}),type:"password",class:"form-control",id:"password",placeholder:"パスワードを入力してください。"},null,512),[[s["B"],c.data.password]])]),Object(s["g"])("div",R,[Object(s["g"])("button",{onClick:e[3]||(e[3]=function(){return c.backToHome&&c.backToHome.apply(c,arguments)}),class:"btn btn-secondary m-3"},"ホームに戻る"),Object(s["g"])("button",{onClick:e[4]||(e[4]=function(){return c.signin&&c.signin.apply(c,arguments)}),class:"btn btn-primary m-3"},"アカウント接続")])])}var B={name:"Signin",props:{},setup:function(){var t=Object(c["d"])(),e=Object(x["b"])(),n=Object(s["u"])({email:"",password:""});function a(){q.a.post("".concat("http://localhost:3000","/signin"),{user:{email:n.email,password:n.password}},{withCredentials:!0}).then((function(n){console.log(n),n.data.signed_in?(e.dispatch("checkSignedIn"),e.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"サインインに成功しました。"}}),t.push({name:"home"})):e.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{error:"サインインに失敗しました。メールアドレスかパスワードが間違っています。"}})})).catch((function(t){alert(t)}))}function r(){e.commit("resetAlert"),t.push({name:"home"})}return{data:n,signin:a,backToHome:r}}};B.render=z;var E=B;function T(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("h2",null,"this is home")}var M={name:"Home",props:{},setup:function(){var t=Object(c["d"])(),e=Object(s["u"])({test:Object});return Object(s["o"])((function(){t.push({name:"question_list"})})),{data:e}}};M.render=T;var L=M,P={class:"container"},U=Object(s["g"])("h2",{class:"text-center m-5"},"マイページ",-1),I={class:"text-center"};function V(t,e,n,c,a,r){var o=Object(s["x"])("QuestionList");return Object(s["q"])(),Object(s["d"])("div",P,[U,Object(s["g"])("p",I,Object(s["z"])(t.$store.state.user.email),1),Object(s["g"])(o,{"is-my-page":!0})])}var F={class:"container"},J=Object(s["g"])("h2",{class:"text-center m-4"},"質問一覧",-1),G={class:"card-header"},K={class:"row"},N={class:"col-6"},W={class:"col-6 text-right"},X={key:0,class:"badge badge-secondary p-2"},Y={class:"card-body"},Z={class:"card-title"},tt={class:"card-text"},et={class:"card-footer text-muted"},nt={class:"row"},st={class:"col-6"},ct={class:"mt-2"},at={class:"col-6 text-right"};function rt(t,e,n,c,a,r){var o=Object(s["x"])("LikeButton");return Object(s["q"])(),Object(s["d"])("div",F,[J,(Object(s["q"])(!0),Object(s["d"])(s["a"],null,Object(s["w"])(t.$store.state.questions,(function(t,e){return Object(s["q"])(),Object(s["d"])("div",{key:e,onClick:function(e){return c.showDetail(t)},class:"card mb-4"},[Object(s["g"])("div",G,[Object(s["g"])("div",K,[Object(s["g"])("div",N,[Object(s["g"])("div",null,Object(s["z"])(t.username),1)]),Object(s["g"])("div",W,[t.solved?(Object(s["q"])(),Object(s["d"])("span",X,"解決済")):Object(s["e"])("",!0)])])]),Object(s["g"])("div",Y,[Object(s["g"])("h5",Z,Object(s["z"])(t.title),1),Object(s["g"])("p",tt,Object(s["z"])(t.content),1)]),Object(s["g"])("div",et,[Object(s["g"])("div",nt,[Object(s["g"])("div",st,[Object(s["g"])("div",ct,Object(s["z"])(t.updated_at),1)]),Object(s["g"])("div",at,[Object(s["g"])(o,{question:t,"is-my-page":!1},null,8,["question"])])])])],8,["onClick"])})),128))])}var ot=Object(s["f"])(" いいね "),it={class:"badge badge-light"};function ut(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("button",{onClick:e[1]||(e[1]=Object(s["E"])((function(){return c.addLike&&c.addLike.apply(c,arguments)}),["stop"])),type:"button",class:"btn btn-primary"},[ot,Object(s["g"])("span",it,Object(s["z"])(n.question.count),1)])}n("99af");var lt={name:"QuestionList",components:{},props:{question:Object,isMyPage:Boolean},setup:function(t){var e=Object(c["c"])(),n=Object(x["b"])(),a=Object(s["u"])({});function r(){q.a.post("".concat("http://localhost:3000","/like/add/").concat(t.question.like_id)).then((function(s){s.data.add_like?t.isMyPage?n.dispatch("getQuestionDetails"):(n.dispatch("getQuestions"),e.params.id&&n.dispatch("getQuestionDetails",e.params.id)):n.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{success:"いいねに失敗しました。"}})})).catch((function(t){alert(t)}))}return{data:a,addLike:r}}};lt.render=ut;var dt=lt,bt={name:"QuestionList",components:{LikeButton:dt},props:{isMyPage:Boolean},setup:function(t){var e=Object(c["d"])(),n=Object(x["b"])(),a=Object(s["u"])({});function r(n){t.isMyPage?e.push({path:"/question/detail/".concat(n.id)}):e.push({path:"detail/".concat(n.id)})}return Object(s["o"])((function(){t.isMyPage?n.dispatch("getMyQuestions"):n.dispatch("getQuestions")})),{data:a,showDetail:r}}};bt.render=rt;var pt=bt,mt={name:"MyPage",components:{QuestionList:pt},props:{},setup:function(){var t=Object(s["u"])({});return Object(s["o"])((function(){})),{data:t}}};mt.render=V;var Ot=mt,jt={class:"row"},gt={class:"col-3"},ft={class:"col-9"};function ht(t,e,n,c,a,r){var o=Object(s["x"])("TagList"),i=Object(s["x"])("router-view");return Object(s["q"])(),Object(s["d"])("div",jt,[Object(s["g"])("div",gt,[Object(s["g"])(o)]),Object(s["g"])("div",ft,[Object(s["g"])(i)])])}var vt=Object(s["F"])("data-v-10de878e");Object(s["t"])("data-v-10de878e");var wt={class:"container sticky"},yt=Object(s["g"])("h2",{class:"text-center m-4"},"タグ一覧",-1),qt={class:"list-group overflow-auto"};Object(s["r"])();var xt=vt((function(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("div",wt,[yt,Object(s["g"])("ul",qt,[(Object(s["q"])(!0),Object(s["d"])(s["a"],null,Object(s["w"])(t.$store.state.tags,(function(t,e){return Object(s["q"])(),Object(s["d"])("li",{key:e,class:"list-group-item"},Object(s["z"])(t.name),1)})),128))])])})),kt={name:"TagList",props:{},setup:function(){var t=Object(x["b"])(),e=Object(s["u"])({});return Object(s["o"])((function(){t.dispatch("getTags")})),{data:e}}};n("d16a");kt.render=xt,kt.__scopeId="data-v-10de878e";var At=kt,_t={name:"Question",components:{TagList:At},props:{},setup:function(){var t=Object(s["u"])({});function e(t){console.log(t)}return{data:t,showDetail:e}}};_t.render=ht;var Dt=_t,Ct=Object(s["F"])("data-v-12ef13ac");Object(s["t"])("data-v-12ef13ac");var St={class:"container"},Qt=Object(s["g"])("h2",{class:"text-center m-4"},"質問詳細",-1),$t={key:0,class:"card mb-4"},Ht={class:"card-header"},Rt={class:"row"},zt=Object(s["g"])("div",{class:"col-6"},[Object(s["g"])("div",null,"質問者")],-1),Bt={class:"col-6 text-right"},Et={key:0,class:"badge badge-secondary p-2"},Tt={class:"card-body"},Mt={class:"card-title"},Lt={class:"card-text"},Pt={class:"card-footer text-muted"},Ut={class:"row"},It={class:"col-6"},Vt={class:"mt-2"},Ft={class:"col-6 text-right"},Jt=Object(s["g"])("div",{class:"card-header"},[Object(s["g"])("div",{class:"row"},[Object(s["g"])("div",{class:"col-6"},[Object(s["g"])("div",null,"回答者")]),Object(s["g"])("div",{class:"col-6 text-right"})])],-1),Gt={class:"card-body"},Kt={class:"card-text"},Nt={class:"card-footer text-muted"},Wt={class:"row"},Xt={class:"col-6"},Yt={class:"mt-2"},Zt={class:"col-6 text-right"},te={type:"button",class:"btn btn-primary"},ee=Object(s["f"])(" いいね "),ne={class:"badge badge-light"};Object(s["r"])();var se=Ct((function(t,e,n,c,a,r){var o=Object(s["x"])("LikeButton");return Object(s["q"])(),Object(s["d"])("div",St,[Qt,t.$store.state.questionDetails?(Object(s["q"])(),Object(s["d"])("div",$t,[Object(s["g"])("div",Ht,[Object(s["g"])("div",Rt,[zt,Object(s["g"])("div",Bt,[t.$store.state.questionDetails.solved?(Object(s["q"])(),Object(s["d"])("span",Et,"解決済")):Object(s["e"])("",!0)])])]),Object(s["g"])("div",Tt,[Object(s["g"])("h5",Mt,Object(s["z"])(t.$store.state.questionDetails.title),1),Object(s["g"])("p",Lt,Object(s["z"])(t.$store.state.questionDetails.content),1)]),Object(s["g"])("div",Pt,[Object(s["g"])("div",Ut,[Object(s["g"])("div",It,[Object(s["g"])("div",Vt,Object(s["z"])(t.$store.state.questionDetails.updated_at),1)]),Object(s["g"])("div",Ft,[Object(s["g"])(o,{question:t.$store.state.questionDetails,"is-my-page":!1},null,8,["question"])])])])])):Object(s["e"])("",!0),(Object(s["q"])(!0),Object(s["d"])(s["a"],null,Object(s["w"])(t.$store.state.answers,(function(t,e){return Object(s["q"])(),Object(s["d"])("div",{key:e,class:"card mb-4 answer-card"},[Jt,Object(s["g"])("div",Gt,[Object(s["g"])("p",Kt,Object(s["z"])(t.content),1)]),Object(s["g"])("div",Nt,[Object(s["g"])("div",Wt,[Object(s["g"])("div",Xt,[Object(s["g"])("div",Yt,Object(s["z"])(t.updated_at),1)]),Object(s["g"])("div",Zt,[Object(s["g"])("button",te,[ee,Object(s["g"])("span",ne,Object(s["z"])(t.like),1)])])])])])})),128))])})),ce={name:"Question",components:{LikeButton:dt},props:{},setup:function(){var t=Object(c["c"])(),e=Object(x["b"])(),n=Object(s["u"])({});return Object(s["o"])((function(){e.dispatch("getQuestionDetails",t.params.id),e.dispatch("getAnswers",t.params.id)})),{data:n}}};n("0f38");ce.render=se,ce.__scopeId="data-v-12ef13ac";var ae=ce;function re(t,e,n,c,a,r){var o=Object(s["x"])("Form");return Object(s["q"])(),Object(s["d"])("div",null,[Object(s["g"])(o),Object(s["g"])("button",{onClick:e[1]||(e[1]=function(t){return c.createQuestion()}),class:"btn btn-primary"},"投稿")])}var oe={class:"form-group m-1"},ie={key:0},ue=Object(s["g"])("div",{class:""},"匿名",-1),le={key:1},de={class:""},be=Object(s["g"])("br",null,null,-1);function pe(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("div",oe,[Object(s["g"])("button",{type:"button",class:"btn btn-dark btn-sm",onClick:e[1]||(e[1]=function(){return c.isAnon&&c.isAnon.apply(c,arguments)})},"匿名で投稿する"),t.$store.state.questionDetails.anonymous?(Object(s["q"])(),Object(s["d"])("div",ie,[ue])):(Object(s["q"])(),Object(s["d"])("div",le,[Object(s["g"])("div",de,Object(s["z"])(t.$store.state.user.email),1)])),Object(s["D"])(Object(s["g"])("input",{placeholder:"タイトル",id:"title","onUpdate:modelValue":e[2]||(e[2]=function(e){return t.$store.state.questionDetails.title=e})},null,512),[[s["B"],t.$store.state.questionDetails.title]]),be,Object(s["D"])(Object(s["g"])("textarea",{placeholder:"内容",id:"content","onUpdate:modelValue":e[3]||(e[3]=function(e){return t.$store.state.questionDetails.content=e})},null,512),[[s["B"],t.$store.state.questionDetails.content]])])}var me={props:{},components:{},setup:function(){var t=Object(x["b"])(),e=Object(s["u"])({title:t.state.questionDetails.title,content:t.state.questionDetails.content,anonymous:t.state.questionDetails.anonymous});function n(){t.state.questionDetails.anonymous=!t.state.questionDetails.anonymous}return Object(s["o"])((function(){t.dispatch("getTags"),t.state.questionDetails.anonymous||(t.state.questionDetails.anonymous=!1)})),{data:e,isAnon:n}}};me.render=pe;var Oe=me,je={components:{Form:Oe},props:[],setup:function(){var t=Object(c["d"])(),e=Object(x["b"])();function n(){return s.apply(this,arguments)}function s(){return s=Object(w["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,q.a.post("".concat("http://localhost:3000","/questions/create"),{question:{title:e.state.questionDetails.title,content:e.state.questionDetails.content,anonymous:e.state.questionDetails.anonymous,solved:0,tag_ids:e.state.post_tags_id}},{withCredentials:!0}).then((function(n){console.log(n),n.data.posted?(e.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"投稿に成功しました"}}),t.push({name:"home"})):e.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{success:"投稿に失敗しました。"}})})).catch((function(t){alert(t)}));case 2:case"end":return n.stop()}}),n)}))),s.apply(this,arguments)}return{createQuestion:n}}};je.render=re;var ge=je;function fe(t,e,n,c,a,r){var o=Object(s["x"])("Form");return Object(s["q"])(),Object(s["d"])("div",null,[Object(s["g"])(o),Object(s["g"])("button",{onClick:e[1]||(e[1]=function(t){return c.updateQuestion()}),class:"btn btn-primary m-3"},"修正")])}var he={props:{},components:{Form:Oe},setup:function(){var t=Object(c["c"])(),e=Object(x["b"])();function n(){return a.apply(this,arguments)}function a(){return a=Object(w["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,q.a.patch("".concat("http://localhost:3000","/questions/update/").concat(t.params.id),{question:{title:e.state.questionDetails.title,content:e.state.questionDetails.content,anonymous:e.state.questionDetails.anonymous,solved:e.state.questionDetails.solved,tag_ids:e.state.post_tags_id}},{withCredentials:!0}).then((function(n){console.log(n),n.data.posted?(e.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"修正に成功しました。"}}),t.push({name:"home"})):e.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"修正に失敗しました。"}})})).catch((function(t){alert(t)}));case 2:case"end":return n.stop()}}),n)}))),a.apply(this,arguments)}return Object(s["o"])((function(){e.dispatch("getQuestionDetails",t.params.id)})),{updateQuestion:n}}};he.render=fe;var ve=he,we=Object(c["a"])({history:Object(c["b"])(),routes:[{path:"/signup",name:"signup",component:A},{path:"/signin",name:"signin",component:E},{path:"/",name:"home",component:L},{path:"/my_page",name:"my_page",component:Ot},{path:"/question",name:"question",component:Dt,children:[{path:"list",name:"question_list",component:pt,props:{isMyPage:!1}},{path:"detail/:id",name:"question_detail",component:ae},{path:"/post_form",name:"post_form",component:ge},{path:"/update_form/:id",name:"update_form",component:ve}]}]}),ye=Object(x["a"])({state:function(){return{user:{name:"ゲストユーザー"},alert:{flag:{showSuccessAlert:!1,showErrorAlert:!1},message:{success:"",error:""}},questions:{},questionDetails:{},answers:{},tags:{},post_tags_id:[]}},getters:{},mutations:{updateUser:function(t,e){t.user=e},resetUser:function(t){t.user.name="ゲストユーザー"},setAlert:function(t,e){t.alert=e},resetAlert:function(t){t.alert={flag:{showSuccessAlert:!1,showErrorAlert:!1},message:{success:"",error:""}}},setQuestions:function(t,e){t.questions=e},setQuestionDetails:function(t,e){t.questionDetails=e},setAnswers:function(t,e){t.answers=e},setTags:function(t,e){t.tags=e}},actions:{checkSignedIn:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/signed_in"),{withCredentials:!0}).then((function(t){t.data.signed_in?e.commit("updateUser",t.data.user):e.commit("resetUser")})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),getMyQuestions:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/questions/user"),{withCredentials:!0}).then((function(t){console.log(t),t.data.get_my_questions?e.commit("setQuestions",t.data.questions):ye.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{error:"自分の質問を取得できませんでした。"}})})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),getQuestions:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/questions/index"),{withCredentials:!0}).then((function(t){console.log(t),e.commit("setQuestions",t.data.questions)})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),getQuestionDetails:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/questions/show/").concat(n),{withCredentials:!0}).then((function(t){console.log(t),e.commit("setQuestionDetails",t.data.question)})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e,n){return t.apply(this,arguments)}return e}(),getAnswers:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e,n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/answers/show/").concat(n),{withCredentials:!0}).then((function(t){e.commit("setAnswers",t.data.answers)})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e,n){return t.apply(this,arguments)}return e}(),getTags:function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,q.a.get("".concat("http://localhost:3000","/tags/index"),{withCredentials:!0}).then((function(t){e.commit("setTags",t.data.tags)})).catch((function(t){alert(t)}));case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()}});function qe(t,e,n,c,a,r){var o=Object(s["x"])("Header"),i=Object(s["x"])("Alert"),u=Object(s["x"])("router-view");return Object(s["q"])(),Object(s["d"])(s["a"],null,[Object(s["g"])(o),Object(s["g"])(i),Object(s["g"])(u)],64)}var xe=Object(s["F"])("data-v-ccd25a98");Object(s["t"])("data-v-ccd25a98");var ke={class:"row"},Ae=Object(s["g"])("div",{class:"col-8"},[Object(s["g"])("h1",{class:"p-2"},"Connect 会津大学")],-1),_e={class:"col-2 d-flex align-items-center justify-content-end"},De={class:"col-2 d-flex align-items-center justify-content-center"},Ce={class:"dropdown text-center"},Se=Object(s["g"])("button",{class:"btn btn-secondary dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"メニュー",-1),Qe={class:"dropdown-menu","aria-labelledby":"dropdownMenuButton"},$e=Object(s["f"])("マイページ"),He=Object(s["f"])("質問一覧"),Re=Object(s["f"])("サインアップ"),ze=Object(s["f"])("サインイン");Object(s["r"])();var Be=xe((function(t,e,n,c,a,r){var o=Object(s["x"])("router-link");return Object(s["q"])(),Object(s["d"])("header",null,[Object(s["g"])("div",ke,[Ae,Object(s["g"])("div",_e,[Object(s["g"])("div",null,Object(s["z"])(t.$store.state.user.name),1)]),Object(s["g"])("div",De,[Object(s["g"])("div",Ce,[Se,Object(s["g"])("div",Qe,[Object(s["g"])(o,{onClick:e[1]||(e[1]=function(e){return t.$store.commit("resetAlert")}),class:"dropdown-item",to:"/my_page"},{default:xe((function(){return[$e]})),_:1}),Object(s["g"])(o,{onClick:e[2]||(e[2]=function(e){return t.$store.commit("resetAlert")}),class:"dropdown-item",to:"/question/list"},{default:xe((function(){return[He]})),_:1}),Object(s["g"])(o,{onClick:e[3]||(e[3]=function(e){return t.$store.commit("resetAlert")}),class:"dropdown-item",to:"/signup"},{default:xe((function(){return[Re]})),_:1}),Object(s["g"])(o,{onClick:e[4]||(e[4]=function(e){return t.$store.commit("resetAlert")}),class:"dropdown-item",to:"/signin"},{default:xe((function(){return[ze]})),_:1}),Object(s["g"])("button",{onClick:e[5]||(e[5]=function(){return c.signOut&&c.signOut.apply(c,arguments)}),class:"dropdown-item"},"サインアウト")])])])])])})),Ee={name:"Header",props:{user:Object},setup:function(){var t=Object(c["c"])(),e=Object(c["d"])(),n=Object(x["b"])(),a=Object(s["u"])({user_id:t.query.user_id,email:"",password:""});function r(){q.a.delete("".concat("http://localhost:3000","/signout"),{withCredentials:!0}).then((function(t){n.dispatch("checkSignedIn"),t.data.signed_out?(n.commit("setAlert",{flag:{showSuccessAlert:!0,showErrorAlert:!1},message:{success:"ログアウトしました。"}}),e.push({name:"home"})):n.commit("setAlert",{flag:{showSuccessAlert:!1,showErrorAlert:!0},message:{error:"ログアウトに失敗しました。もう一度行ってください。"}})})).catch((function(t){alert(t)}))}return{data:a,signOut:r}}};n("6336");Ee.render=Be,Ee.__scopeId="data-v-ccd25a98";var Te=Ee,Me={class:"container"},Le={key:0,class:"alert alert-success mt-3",role:"alert"},Pe={key:1,class:"alert alert-danger mt-3",role:"alert"};function Ue(t,e,n,c,a,r){return Object(s["q"])(),Object(s["d"])("div",Me,[t.$store.state.alert.flag.showSuccessAlert?(Object(s["q"])(),Object(s["d"])("div",Le,Object(s["z"])(t.$store.state.alert.message.success),1)):Object(s["e"])("",!0),t.$store.state.alert.flag.showErrorAlert?(Object(s["q"])(),Object(s["d"])("div",Pe,Object(s["z"])(t.$store.state.alert.message.error),1)):Object(s["e"])("",!0)])}var Ie={name:"Alert",props:{user:Object},setup:function(){var t=Object(s["u"])({});return{data:t}}};Ie.render=Ue;var Ve=Ie,Fe={name:"App",components:{Header:Te,Alert:Ve},props:{},setup:function(){var t=Object(x["b"])(),e=Object(s["u"])({user:Object});return Object(s["o"])((function(){t.dispatch("checkSignedIn")})),{data:e}}};n("4a40");Fe.render=qe;var Je=Fe,Ge=Object(s["c"])(Je);Ge.use(we),Ge.use(ye),Ge.mount("#app")},6336:function(t,e,n){"use strict";n("0d11")},"63a0":function(t,e,n){},"8eea":function(t,e,n){},d16a:function(t,e,n){"use strict";n("63a0")}});
//# sourceMappingURL=app.870e6f77.js.map