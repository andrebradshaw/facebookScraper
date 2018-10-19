
function elmConditionMatch(elmArr, str, cond){var x = new RegExp(str, "i");	if(cond == "t"){		for(i=0; i<elmArr.length; i++){			if(x.test(elmArr[i].innerText) === true){				return elmArr[i];			}		}	}	if(cond == "f"){		for(i=0; i<elmArr.length; i++){			if(x.test(elmArr[i].innerText) === false){				return elmArr[i];			}		}    }}
function grp(elm,n){if(elm != null){return elm[n];}else{return "";}}


var buttons = document.getElementById("member_requests_pagelet").getElementsByTagName("button");
for(b=0; b<buttons.length; b++){
	var itext = buttons[b].innerText;
	if(itext == "Approve"){
		var info = buttons[b].parentElement.parentElement.getElementsByTagName("ul")[0];
		var atags = elmConditionMatch(buttons[b].parentElement.parentElement.getElementsByTagName("a"),"More Actions","f");


		var joinQ = buttons[b].parentElement.parentElement.getElementsByTagName("ul")[3].getElementsByTagName("text")[0].innerText;	
		var fullname = atags.innerText;
		var linky = atags.href;
		var friends = grp(/\d+(?= Friends · )/.exec(elmConditionMatch(info.getElementsByTagName("li"),"friend","t").innerText),0);
		var groupConn = grp(/\d+(?= Friends in Group)/.exec(elmConditionMatch(info.getElementsByTagName("li"),"friend","t").innerText),0);
		var otherGroup = grp(/\d+(?= Other Group)/.exec(elmConditionMatch(info.getElementsByTagName("li"),"Other Group","t").innerText),0);
		var joinedFB = grp(/(?<=Joined Facebook on ).+/.exec(elmConditionMatch(info.getElementsByTagName("li"),"Joined Facebook","t").innerText),0);
		var livesIn = grp(/(?<=Lives in ).+/.exec(elmConditionMatch(info.getElementsByTagName("li"),"Lives in","t").innerText),0);
		var geoLink = grp(/\d+/.exec(elmConditionMatch(info.getElementsByTagName("li"),"Lives in","t").getElementsByTagName("a")[0].href),0);//https://www.facebook.com/pages/

var output = "?fn="+fullname+"&url="+linky+"frn="+friends+"&gc="+groupConn+"&og="+otherGroup+"&liv="+livesIn+"&geo="+geoLink+"&jq="+joinQ;
		console.log(output);
	}
}


