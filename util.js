var myUTILs = (function(){
//////////////////////////////////////
//
//Web workers
var w;

function startWorker(wsource, resID){
	
	if(typeof(Worker) !== "undefined") { //support web workers?
	    if(typeof(w) == "undefined") {   
	        w = new Worker(wsource); //worker will run code in wsource
	    }
	    
		//handle data posted from web worker
		w.onmessage = function(event) {
			//data posted from worker held in event.data
			//document.getElementById(resID).innerHTML = event.data;
	    };
	} else {
	    document.getElementById(resID).innerHTML = "Sorry, your browser does not support Web Workers...";
	}
}

function stopWorker() { 
	w.terminate();
	w = undefined;
}
	

//////////////////////////////////
//prevents event bubbling
// (stops events from registering on unintended elements)
function preventBubble(e){
	var ev = e || window.event; //Microsoft holds event object in Window.event
	ev.cancelBubble = true;
	if (ev.stopPropagation) ev.stopPropagation();
	
}



/////////////////////////////////////////
//
// Iframes 
// NOTES: to get rid of scrollbar use attributes: scrolling="no" and seamless="seamless" on iframe tag
//////////////////////////////////
// iframe stretch to content height
function resizeIFrame(iframeID) {

	var el = document.getElementById(iframeID);
	el.style.height = "1200px"; 	//height of iframe set to default

	
	var framePageHeight = null;
	
	//body/html for quirks/standard modes, diff doctypes 
	/*NOTES (found http://www.codingforums.com/javascript-programming/138407-document-documentelement-vs-document-body.html):  
	1. IE 6-8 strict, Mozilla strict and Opera 9.5+ strict
	document.body.clientHeight = document's height
	document.documentElement.clientHeight = window's viewport height

	2. IE 5 and IE 6-8 quirks
	document.body.clientHeight = window's viewport height
	document.documentElement.clientHeight = 0

	3. Opera 7-9.2 and Opera 9.5 quirks
	document.body.clientHeight = window's viewport height
	document.documentElement.clientHeight = document's height

	4.Safari
	document.body.clientHeight = document's height
	document.documentElement.clientHeight = document's height
	*/
 	var bd = (el.contentWindow.body || el.contentDocument.body); //contentWindow for earlier versions of IE
	var html = (el.contentWindow.documentElement || el.contentDocument.documentElement); //contentWindow for earlier versions of IE
	
	//calculate height of document in iframe
	framePageHeight = Math.max(bd.scrollHeight, bd.clientHeight, bd.offsetHeight,
							   html.scrollHeight, html.clientHeight, html.offsetHeight) + "px";
	
	
	el.style.height = framePageHeight;	//set height of iframe to calculated height

}

////////////////////////////////////
//get window height
function getWindowHeight(){
	 	var d = document,
	    var e = d.documentElement,
	    var g = d.getElementsByTagName('body')[0],
	   
	    return w.innerHeight|| e.clientHeight|| g.clientHeight;
}

///////////////////////////////////
// change iframe source
//use with resizeFrame call onload
//which should then resize frame when the source is changed
function changeSrc(src, frameID){
	
	if(document.body){
		document.getElementById(frameID).src = src +".html";
	}
	
	window.parent.scroll(0,0); //scroll back to top of parent
}


///////////////////////////////////////
//Ajax post to servlet
//
//callback -- NOTES on state:
//  readystate == 4 --> http request finishes
//  state == 200 --> successful
function XMLHttpPost(url, data, async, callback)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	else{
		alert("Your browser does not support AJAX.");
	}
	

	xmlhttp.open("POST",url,async);
	xmlhttp.onreadystatechange=callback;  //response if ready do this

	//xmlhttp.setRequestHeader("Content-type","application/json");
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("datastr="+ data);
}



/////////////////////////////////////////////////////
// 
// cookies
function storeCookie(cookien, value){
	document.cookie= cookien + "=" + value;

}

function getCookie(cookien){
	var searchstr = cookien + "=";
	var tokens = document.cookie.split(';');
	for(var i=0; i < tokens.length; i++) {
        var c = tokens[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(searchstr) != -1) return c.substring(searchstr.length,c.length);
    }
    return "";
}
})();