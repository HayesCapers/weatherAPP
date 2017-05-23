

$(document).ready(()=>{

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');	

	var assumedTemperature = 65;
	var currenPercent = 0;

	function animateCircle(currentArc){
		// Draw inner circle
		context.fillStyle = '#ccc';
		context.beginPath();
		context.arc(155,100,70,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill()

		// draw outter line
		context.lineWidth = 5;
		context.strokeColor = '#ffff00';
		context.beginPath();
		context.arc(155,100,75,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI * 1.5);
		context.stroke();
		currenPercent++
		if (currenPercent < assumedTemperature){
			requestAnimationFrame(()=>{
				animateCircle(currenPercent / 100);
			})
		}	
	}
	animateCircle();

})
