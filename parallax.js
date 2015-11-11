//Parallax using background images
//change position of baxckkground image based on window offset

function setParallax(d, classN){
	var parallax = document.getElementsByClassName("classN");
	var delta = d;  //difference in speeds up to 1

  window.addEventListener('scroll', function(){
	 
    for(var i=0; i < parallax.length; i++){
		
      var windowYOffset = window.pageYOffset;
      var newBackgrounPos = "0 " + (windowYOffset * delta) + "px";

      parallax[i].style.backgroundPosition = newBackgrounPos;
	  
	}
  });

}