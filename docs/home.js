/* FG-COMPASS home page: rating demo, decision-tree paths and audience picker. */
(function(){
  if(!document.getElementById("rate"))return;
  var LV={1:["Initial","The key proficient feature is missing and the early pattern is confirmed."],
          2:["Emerging","The key feature is still missing, but the child has moved past the early pattern."],
          3:["Developing","The key feature is present, but the proficient pattern is not yet complete."],
          4:["Proficient","The key feature is present and the proficient pattern is confirmed."]};
  var T={q1:{s:"Question 1 of 2",q:"Did the trunk rotate to the side of the throw during preparation?",yes:"up",no:"low"},
         up:{s:"Question 2 of 2",q:"Was there a long step opposite the throwing arm?",yes:4,no:3},
         low:{s:"Question 2 of 2",q:"Did the child fail to step forward?",yes:1,no:2}};
  var $=function(id){return document.getElementById(id)};
  var cur="q1";
  function show(k){cur=k;var n=T[k];$("rate-step").textContent=n.s;$("rate-q").textContent=n.q;$("p2").classList.toggle("on",k!=="q1");}
  function result(l){
    $("rate-ask").hidden=true;$("rate-result").hidden=false;$("rate-reset").hidden=false;
    var b=$("res-badge");b.textContent=l;b.className="lvl-badge l"+l;
    $("res-name").textContent="Level "+l+" · "+LV[l][0];$("res-desc").textContent=LV[l][1];
    $("res-art").style.setProperty("--src","url(images/home/throw-l"+l+".png)");
    document.querySelectorAll(".scale span").forEach(function(s,i){s.classList.toggle("hit",i+1===l)});
  }
  function answer(a){var nx=T[cur][a];typeof nx==="number"?result(nx):show(nx);}
  $("btn-yes").addEventListener("click",function(){answer("yes")});
  $("btn-no").addEventListener("click",function(){answer("no")});
  $("rate-reset").addEventListener("click",function(){
    $("rate-ask").hidden=false;$("rate-result").hidden=true;$("rate-reset").hidden=true;
    document.querySelectorAll(".scale span").forEach(function(s){s.classList.remove("hit")});show("q1");$("btn-yes").focus();
  });

  // tree
  var PATH={1:["n-q","e-ql","n-l","e-1","n-1"],2:["n-q","e-ql","n-l","e-2","n-2"],3:["n-q","e-qr","n-r","e-3","n-3"],4:["n-q","e-qr","n-r","e-4","n-4"]};
  var CAP={1:"Key feature not seen, early pattern confirmed: <strong>Level 1, Initial</strong>.",
           2:"Key feature not seen, early pattern not confirmed: <strong>Level 2, Emerging</strong>.",
           3:"Key feature seen, proficient pattern not confirmed: <strong>Level 3, Developing</strong>.",
           4:"Key feature seen, proficient pattern confirmed: <strong>Level 4, Proficient</strong>."};
  function path(l){
    document.querySelectorAll(".tree-svg .on").forEach(function(e){e.classList.remove("on")});
    PATH[l].forEach(function(id){$(id).classList.add("on")});
    document.querySelectorAll(".paths button").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.l==l))});
    $("tree-cap").innerHTML=CAP[l];
  }
  document.querySelectorAll(".paths button").forEach(function(b){b.addEventListener("click",function(){path(+b.dataset.l)})});
  path(4);

  // audiences
  var AUD={
    pe:{h:"Check a whole class in a regular lesson.",p:"Two quick questions per skill keep the pace of a normal class. Rate every child on the same 1–4 scale and see who needs help with what.",
        u:[["Screen a class","See each child's level on all 10 skills."],["Plan the next step","The level tells you which part of the pattern to teach next."],["Show progress","Rate again later in the year and compare."]],
        n:[["Open the Rater","assess/index.html"],["Print the decision trees","static/files/fgcompass-decision-trees-v2.2.pdf"]]},
    cl:{h:"Spot movement delays early and plan support.",p:"Clear levels for each skill help you see where a child is stuck and explain it to families in plain words.",
        u:[["Find the gaps","A profile across 10 skills shows which ones lag behind."],["Target support","Each level names the feature that is missing."],["Share with families","Initial, Emerging, Developing and Proficient are easy to explain."]],
        n:[["Read the manual","https://fgcompass.github.io/manual/"],["See the four levels","#levels"]]},
    rs:{h:"A criterion-referenced instrument with published reliability.",p:"FG-COMPASS is process-oriented, with expert-rater agreement and inter- and intra-rater reliability reported in peer-reviewed journals.",
        u:[["Composite trees","Three key criteria per skill, drawn from developmental sequences."],["Reliable ratings","Agreement with expert raters, reported since 2012."],["Live or recorded","Designed for live observation in the field."]],
        n:[["See the publications","publications.html"],["The decision-tree model","#how-it-works"]]},
    pa:{h:"Understand how a child moves, and how a program is doing.",p:"Four plain-language levels make results easy to read, whether you are a parent following one child or an administrator looking at a whole program.",
        u:[["Plain results","Each level describes what the child can already do."],["Program check","Compare levels before and after a program."],["Free to use","The decision trees and manual are free."]],
        n:[["See the four levels","#levels"],["How it works","#how-it-works"]]}
  };
  var arrow='<svg><use href="#i-arrow"/></svg>';
  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;")}
  function aud(k,btn){
    var a=AUD[k];$("aud-h").textContent=a.h;$("aud-p").textContent=a.p;
    $("aud-uses").innerHTML=a.u.map(function(x){return "<li><b>"+esc(x[0])+"</b><span>"+esc(x[1])+"</span></li>"}).join("");
    $("aud-next").innerHTML='<span class="label">Start here</span>'+a.n.map(function(x){return '<a href="'+x[1]+'">'+esc(x[0])+" "+arrow+"</a>"}).join("");
    document.querySelectorAll(".aud-tab").forEach(function(t){t.setAttribute("aria-selected",String(t===btn))});
    $("aud-panel").setAttribute("aria-labelledby",btn.id);
  }
  document.querySelectorAll(".aud-tab").forEach(function(t){t.addEventListener("click",function(){aud(t.dataset.k,t)})});
  aud("pe",$("tab-pe"));
})();
