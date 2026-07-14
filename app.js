(function(){
"use strict";
const D = window.CODEX_DATA;
const homeView=document.getElementById("homeView");
const contentView=document.getElementById("contentView");
const searchView=document.getElementById("searchView");
const contentBody=document.getElementById("contentBody");
const breadcrumbs=document.getElementById("breadcrumbs");
const searchInput=document.getElementById("searchInput");
const searchResults=document.getElementById("searchResults");
const stack=[];

function show(view){[homeView,contentView,searchView].forEach(v=>v.classList.remove("active"));view.classList.add("active")}
function home(){stack.length=0;show(homeView)}
function settlement(id){return D.settlements.find(x=>x.id===id)}
function location(id){return D.locations.find(x=>x.id===id)}
function person(id){return D.people.find(x=>x.id===id)}
function tile(title,subtitle,fn){const b=document.createElement("button");b.className="tile-button";b.innerHTML="<strong>"+title+"</strong>"+(subtitle?"<span>"+subtitle+"</span>":"");b.addEventListener("click",fn);return b}
function push(view){stack.push(view);render(view)}
function back(){if(stack.length>1){stack.pop();render(stack[stack.length-1])}else{home()}}
function art(src,name,portrait){return src?'<img '+(portrait?'class="portrait" ':'')+'src="'+src+'" alt="'+name+'">':'<div class="placeholder">Artwork not yet added</div>'}

function renderPlaces(){
 show(contentView);breadcrumbs.textContent="Places";
 contentBody.innerHTML='<section class="directory"><h2>Places</h2><p>Settlements and landmarks known to the party.</p><div class="directory-list" id="placeList"></div></section>';
 const list=document.getElementById("placeList");
 D.settlements.forEach(s=>{const b=document.createElement("button");b.className="directory-button";b.innerHTML="<strong>"+s.name+"</strong><span>"+s.subtitle+"</span>";b.addEventListener("click",()=>push({type:"settlement",id:s.id}));list.appendChild(b)})
}
function renderSettlement(id){
 const s=settlement(id);show(contentView);breadcrumbs.textContent="Places › "+s.name;
 contentBody.innerHTML='<article class="entry">'+art(s.image,s.name,false)+'<div class="entry-copy"><div class="kicker">Settlement</div><h1>'+s.name+'</h1><div class="subtitle">'+s.subtitle+'</div><p class="overview">'+s.overview+'</p><section class="entry-section"><h2>Places of Interest</h2><div class="tile-grid" id="locations"></div></section><section class="entry-section"><h2>Notable Residents</h2><div class="tile-grid" id="residents"></div></section></div></article>';
 const lg=document.getElementById("locations");s.locations.map(location).filter(Boolean).forEach(l=>lg.appendChild(tile(l.name,l.subtitle,()=>push({type:"location",id:l.id}))));
 const rg=document.getElementById("residents");s.residents.map(person).filter(Boolean).forEach(p=>rg.appendChild(tile(p.name,p.subtitle,()=>push({type:"person",id:p.id}))))
}
function renderLocation(id){
 const l=location(id),s=settlement(l.settlementId);show(contentView);breadcrumbs.textContent="Places › "+s.name+" › "+l.name;
 contentBody.innerHTML='<article class="entry">'+art(l.image,l.name,false)+'<div class="entry-copy"><div class="kicker">Location</div><h1>'+l.name+'</h1><div class="subtitle">'+l.subtitle+'</div><p class="overview">'+l.overview+'</p><section class="entry-section"><h2>Residents</h2><div class="tile-grid" id="residents"></div></section></div></article>';
 const rg=document.getElementById("residents");l.residents.map(person).filter(Boolean).forEach(p=>rg.appendChild(tile(p.name,p.subtitle,()=>push({type:"person",id:p.id}))))
}
function renderPerson(id){
 const p=person(id),s=settlement(p.settlementId),l=location(p.locationId);show(contentView);breadcrumbs.textContent="Places › "+s.name+(l?" › "+l.name:"")+" › "+p.name;
 const influence = p.influence ? '<section class="entry-section influence-section"><h2>Your Influence</h2><p class="influence-text"><em>'+p.influence+'</em></p></section>' : '';
 contentBody.innerHTML='<article class="entry">'+art(p.image,p.name,true)+'<div class="entry-copy"><div class="kicker">Person</div><h1>'+p.name+'</h1><div class="subtitle">'+p.subtitle+'</div>'+(p.quote?'<blockquote class="quote">“'+p.quote+'”</blockquote>':'')+'<p class="overview">'+p.overview+'</p><section class="entry-section"><h2>Known Location</h2><div class="tile-grid" id="knownLocation"></div></section>'+(p.associates.length?'<section class="entry-section"><h2>Known Associates</h2><div class="tile-grid" id="associates"></div></section>':'')+influence+'</div></article>';
 const kl=document.getElementById("knownLocation");if(l)kl.appendChild(tile(l.name,s.name,()=>push({type:"location",id:l.id})));else kl.appendChild(tile(s.name,s.subtitle,()=>push({type:"settlement",id:s.id})));
 const ag=document.getElementById("associates");if(ag)p.associates.map(person).filter(Boolean).forEach(a=>ag.appendChild(tile(a.name,a.subtitle,()=>push({type:"person",id:a.id}))))
}
function empty(title){show(contentView);breadcrumbs.textContent=title;contentBody.innerHTML='<div class="empty"><div><h2>'+title+'</h2><p>Nothing has been recorded here yet.</p></div></div>'}
function render(v){if(v.type==="places")renderPlaces();else if(v.type==="settlement")renderSettlement(v.id);else if(v.type==="location")renderLocation(v.id);else if(v.type==="person")renderPerson(v.id);else if(v.type==="empty")empty(v.title)}
function openSearch(){show(searchView);searchInput.value="";searchResults.innerHTML="";setTimeout(()=>searchInput.focus(),50)}
function search(){
 const q=searchInput.value.trim().toLowerCase();searchResults.innerHTML="";if(!q)return;
 const items=[];
 D.settlements.forEach(x=>{if((x.name+" "+x.subtitle+" "+x.overview).toLowerCase().includes(q))items.push({type:"settlement",item:x})});
 D.locations.forEach(x=>{if((x.name+" "+x.subtitle+" "+x.overview).toLowerCase().includes(q))items.push({type:"location",item:x})});
 D.people.forEach(x=>{if((x.name+" "+x.subtitle+" "+x.overview).toLowerCase().includes(q))items.push({type:"person",item:x})});
 items.forEach(m=>{const b=document.createElement("button");b.className="directory-button";b.innerHTML="<strong>"+m.item.name+"</strong><span>"+m.type+" · "+m.item.subtitle+"</span>";b.addEventListener("click",()=>{stack.length=0;stack.push({type:"places"});stack.push({type:m.type,id:m.item.id});render(stack[stack.length-1])});searchResults.appendChild(b)})
}
function action(a){if(a==="places"){stack.length=0;stack.push({type:"places"});renderPlaces()}else if(a==="factions"){stack.length=0;stack.push({type:"empty",title:"Factions"});empty("Factions")}else if(a==="history"){stack.length=0;stack.push({type:"empty",title:"History"});empty("History")}else if(a==="search")openSearch()}
document.getElementById("homeButton").addEventListener("click",home);
document.getElementById("placesButton").addEventListener("click",()=>action("places"));
document.getElementById("factionsButton").addEventListener("click",()=>action("factions"));
document.getElementById("historyButton").addEventListener("click",()=>action("history"));
document.getElementById("searchButton").addEventListener("click",()=>action("search"));
document.getElementById("backButton").addEventListener("click",back);
document.getElementById("closeButton").addEventListener("click",home);
document.getElementById("closeSearchButton").addEventListener("click",home);
searchInput.addEventListener("input",search);
document.querySelectorAll("[data-mobile]").forEach(b=>b.addEventListener("click",()=>action(b.dataset.mobile)));
document.addEventListener("keydown",e=>{if(e.key==="Escape")home()});
})();
