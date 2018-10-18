var members = parseInt(/(?<=Members).+/.exec(document.getElementById("groupsMemberBrowser").innerText).toString().replace(/\D+/g, ''));
var numScrollEventsNeeded = Math.round((members-30)/15);
function timedScroller(num){
setTimeout(()=>{
window.scrollTo(0,document.body.scrollHeight);
},num);
}

for(i=0; i<numScrollEventsNeeded; i++){
timedScroller(i*2000);
}

function downloaded(){
setTimeout(()=>{ 
var members = document.getElementsByClassName("clearfix _60rh _gse");
var containStr = '';
for(m=10; m<20; m++){
	var fullname = members[m].getElementsByClassName("_60ri fsl fwb fcb")[0].innerText.replace(/ −.+/, '');
	var linky = members[m].getElementsByClassName("_60ri fsl fwb fcb")[0].getElementsByTagName("a")[0].href.replace(/\?.+/, '');
	var otherData = parseDetails(members[m].getElementsByClassName("_60rj"));
	var containStr = containStr + (fullname+','+linky+','+otherData) +'\r';
}

var output = "member_name,profile_link,added_by,join_date,job_title,employer\r"+containStr;


function grp(elm,n){if(elm != null){return elm[n].trim();}else{return '';}}

function parseDetails(elm){
	var addedBy = ' '; 
	var addedOn = '';
	var joined = '';
	var regXadded = /(?<=Added by ).+?(?= on )/;
	var regXaddon = /(?<=Added by .{1,45}? on ).+/;
	var regXjoin = /(?<=Joined about |Joined on ).+/;
	var regXjob = /^.+?(?= at )/;
	var regXempl = /(?<= at ).+/;
	for (i = 0; i < elm.length; i++) {
		var elmText = elm[i].innerText;
		var addedBy = addedBy + grp(regXadded.exec(elmText),0).trim();
		var addedOn = addedOn + parseDate(grp(regXaddon.exec(elmText),0).trim()).toString().replace(/\s+\d{2}:\d{2}:\d{2}.+/, '').replace(/\s{0,4}\w{3}\s+/, '');
		var joined = joined + parseDate(grp(regXjoin.exec(elmText),0).trim()).toString().replace(/\s+\d{2}:\d{2}:\d{2}.+/, '').replace(/\s{0,4}\w{3}\s+/, '');
		if(regXjob.test(elmText) === true){	var job = grp(regXjob.exec(elmText),0);}else{job = ' ';}
		if(regXempl.test(elmText) === true){ var empl = grp(regXempl.exec(elmText),0);}else{empl = ' ';}
	}
	if(/\d+/.test(addedOn) === true){var dateJoin = addedOn;}else{var dateJoin = joined;}
	return addedBy+','+dateJoin+','+job+','+empl;
}


function parseJoinUnit(x,str){
		if(x.test(str) === true){
			var measure = x.exec(str)[0];
			if(/a/.test(measure) === true){
				var unit = 0;	
			}else{
				var unit = /\d+/.exec(measure)[0];
			}
		}else{return ''}
}
var day = 86400000;
function parseDate(str){
	if(str.length > 3){
		var regXweek = /.+?(?= week)/;
		var regXmonth = /.+?(?= month)/;
		var regXhour = /.+?(?= hour)/
		if(regXweek.test(str) === true){
			return new Date(new Date().getTime() - (parseJoinUnit(regXweek,str) * (day*7)));
		}
		if(regXmonth.test(str) === true){
			return new Date(new Date().getTime() - (parseJoinUnit(regXweek,str) * (day*3)));
		}
		if(regXhour.test(str) === true){
			return new Date(new Date().getTime() - (parseJoinUnit(regXweek,str) * (day/24)));
		}
		if(/[a-zA-Z]+\s\d+,\s\d{4}/.test(str) === true){
			return new Date(/[a-zA-Z]+\s\d+,\s\d{4}/.exec(str)[0]);
		}
	}else{return ' '}
}
function dl(filename, text) {
    var elmi = document.createElement('a');
    elmi.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    elmi.setAttribute('download', filename);

    elmi.style.display = 'none';
    document.body.appendChild(elmi);

    elmi.click();

    document.body.removeChild(elmi);
  }
var namethis = /(?<=groups\/)\w+/.exec(window.location.href)[0];
dl(namethis + ".csv", output);
},(numScrollEventsNeeded*2008));
}
downloaded();
