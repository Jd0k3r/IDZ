var gameFrame = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
var idInt;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
var sorted;

function win(){

	if(gameFrame[15] == 0){
		for (var i = 0; i < gameFrame.length - 2; i++) {
    		if (gameFrame[i] > gameFrame[i+1]) {
        	sorted = false;
        	break;
    		}else{
    			sorted = true;
    		}
		}
	}
}

function clickListener(e) {
	var clickX = e.target.id.charAt(0);
	var clickY = e.target.id.charAt(2);
	var emptyX = $(".empty")[0].id.charAt(0);
	var emptyY = $(".empty")[0].id.charAt(2);


	if( clickX == emptyX && clickY == emptyY-1 ||
	    clickX == emptyX && clickY-1 == emptyY ||
	    clickX == emptyX-1 && clickY == emptyY || 
	    clickX-1 == emptyX && clickY == emptyY){

		var clickIndex = gameFrame.indexOf(parseInt(e.target.innerHTML));
		var zeroIndex = gameFrame.indexOf(0);
		[gameFrame[clickIndex], gameFrame[zeroIndex]] = [gameFrame[zeroIndex], gameFrame[clickIndex]];
		
		var temp = e.target.innerHTML;
     	e.target.innerHTML = $(".empty")[0].innerHTML;
     	$(".empty")[0].innerHTML = temp;
     	$(".empty")[0].className = "cells";
     	e.target.className = "cells empty";

     	win();
     	if (sorted) {
     		$(document).prop("onclick", null).off("click");
     		clearInterval(idInt);
				$(".right")[0].innerHTML = "YOU WIN";
     	}
     	
	}
}

function msToTime(duration) {
var milliseconds = parseInt((duration%1000))
    , seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60);

minutes = (minutes < 10) ? "0" + minutes : minutes;
seconds = (seconds < 10) ? "0" + seconds : seconds;

return  minutes + ":" + seconds + "." + milliseconds;
}



$("#startGame").on('click', function(e){
	const startTime = new Date();
	clearInterval(idInt);
	idInt = setInterval(() => {
  const milliseconds = new Date().getTime() - startTime.getTime();
	
  $(".left")[0].innerHTML = msToTime(milliseconds);
}, 1);
	shuffle(gameFrame);
	sorted = false;
	$(".right")[0].innerHTML = "";
	$(".empty")[0].className = "cells";
	var g = -1;
	for(var i = 1 ; i <= 4 ; i++){
		for(var j = 1 ; j <= 4 ; j++){
		g++;
		if(gameFrame[g] == 0){
			$("#"+i+"-"+j)[0].innerHTML = "";
			$("#"+i+"-"+j)[0].className = "cells empty";
		}else{
			$("#"+i+"-"+j)[0].innerHTML = gameFrame[g];
		}
	}}
	$(document).on('click', function(e) {clickListener(e)});
});
