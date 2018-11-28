
function checker(elm, type) {  if (elm != undefined) {    if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim();    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}



function getAccessibleObj(){
	var accessible = document.getElementsByClassName('accessible_elem');
	for(i=0; i< accessible.length; i++){
	var txt = checker(accessible[i], 'text')
		if(txt == 'About Section Navigation'){
			return accessible[i].parentElement.parentElement.parentElement.parentElement;
		}
	}
}
var sectionTab = getAccessibleObj().getElementsByTagName('ul')[0];
var detailTab = getAccessibleObj().getElementsByTagName('ul')[1];


//sectionTab.getElementsByTagName('a')[0].click()
checker(detailTab.getElementsByTagName('li')[0], 'text')
