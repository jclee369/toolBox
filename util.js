
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
	//if(self==parent) return false; /* Checks that page is in iframe. */
	else if(document.getElementById && document.all) /* Sniffs for IE5+.*/

	var FramePageHeight = iframeID.contentWindow.document.body.scrollHeight + 10 + "px";
	/*
	var FramePageHeight = framePage.scrollHeight + 10; /* framePage
	is the ID of the framed page's BODY tag. The added 10 pixels prevent an
	unnecessary scrollbar. */

	parent.document.getElementById(iframeID).style.height= FramePageHeight;
	/* "iframeID" is the ID of the inline frame in the parent page. */
	}

///////////////////////////////////
// change iframe source
function changeSrc(src, frameID){
		if(document.body){
			document.getElementById(frameID).src = src +".html";
		}

		try{	
			
			var frame = document.getElementById(frameID);
			
			if ( frame.contentDocument ) 
			{ // FF
			     ibody = frame.contentDocument.getElementsByTagName('body')[0];
			}
			else if ( frame.contentWindow ) 
			{ // IE
			     ibody = frame.contentWindow.document.getElementsByTagName('body')[0];
			}
			 
			resizeIFrame(frameID);
			
		}  
		//An error is raised if the IFrame domain != its container's domain
		catch(e)
		{
			window.status =	'Error: ' + e.number + '; ' + e.description;
		}
		return true;

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