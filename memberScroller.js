var members = parseInt(/(?<=Members).+/.exec(document.getElementById("groupsMemberBrowser").innerText).toString().replace(/\D+/g, ''));

var numScrollEventsNeeded = Math.round((members-30)/15)+20;

function timedScroller(num){
setTimeout(()=>{
window.scrollTo(0,document.body.scrollHeight);
},num);
}

for(i=0; i<numScrollEventsNeeded; i++){
timedScroller(i*2000);
}
