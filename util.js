
////////////////////////////////////
//Web workers
var w;

function startWorker(wsource, resID){
	
	 if(typeof(Worker) !== "undefined") {
	        if(typeof(w) == "undefined") {
	            w = new Worker(wsource);
	        }
	        //w.onmessage = function(event) {
	         //   document.getElementById("result").innerHTML = event.data;
	        //};
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
function preventBubble(e){
	var ev = e || window.event;
	ev.cancelBubble = true;
	if (ev.stopPropagation) ev.stopPropagation();
	
}



//////////////////////////////////
// iframe containing div stretch
function resizeIFrame(iframeID) {

	var el = document.getElementById(iframeID);

	//The added 17 pixels for scroll bar.
	var framePageHeight = null;
	if(el.contentWindow)
		framePageHeight = el.contentWindow.document.body.scrollHeight + 17 + "px";
	else if(el.contentWindow)	
		framePageHeight = el.contentDocument.document.body.scrollHeight + 17 + "px";

	el.style.height = framePageHeight;
}



///////////////////////////////////
// change iframe source
function changeSrc(src, frameID){
	
	if(document.body){
		document.getElementById(frameID).src = src +".html";
	}

		
	resizeIFrame(frameID);
			
		

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
	//response if ready do this

	xmlhttp.open("POST",url,async);
	xmlhttp.onreadystatechange=callback;

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