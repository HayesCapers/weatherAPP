

$(document).ready(()=>{

	const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';

	$('.shine-wrapper').click(function(){
		$('#weather-form').addClass('showSearch');
		$('#outter-circle').addClass('circleExpand1');
		$('#inner-circle').addClass('innerExpand1');
		$('#inner-circle2').addClass('innerExpand2');
		$('.shine-partner1').addClass('maskOpen');
		$('.shine-partner2').addClass('maskOpen2');
		$('.shine-partner3').addClass('maskOpen3');
		$('.shine-partner4').addClass('maskOpen4');
		$('.search-wrapper').addClass('searchExpand');
	});

	$('#weather-form').submit((event)=>{
		event.preventDefault();
		var zipCode = $('#zip-code').val();
		var weatherUrl = `${weatherApi}?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
		// console.log(weatherUrl);

		$.getJSON(weatherUrl, (weatherData)=>{
			console.log(weatherData)
			var currTemp = weatherData.main.temp;
			var temps = {
				curr: weatherData.main.temp,
				max: weatherData.main.temp_max,
				min: weatherData.main.temp_min,
			}
			var name = weatherData.name;
			var humidity = weatherData.main.humidity;
			var icon = weatherData.weather[0].icon;
			var iconHTML = `<img src="./icons/PNG/${icon}.png">`;
			var weatherDesc = weatherData.weather[0].description;
			var windInt = weatherData.wind.deg;
			var windDirection = degToCompass(windInt);
			var windSpeed = weatherData.wind.speed;
			var date = new Date();
			var currDate = date.toDateString();
			// console.log(date.toDateString());
			$('.city-name').html(`${name}<span class="date"></span>`);
			$('.icon').html(iconHTML);
			$('.date').html(currDate);
			$('.description').html(weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1));
			$('.wind').html(`${windSpeed}mph ${windDirection}`)
			$('.humidity').html(`Humidity: ${humidity}%`);
			// var newHTML = `<img src='http://openweathermap.org/img/w/${icon}.png'>`
			// newHTML += `<div>The temp in ${name} is currently ${currTemp}&deg;</div>`
			// $('#temp-info').html(newHTML);
			currentPercent = 0;
			animateCircle(0,currTemp);
		})
	})

	var canvas = $('#weather-canvas');
	var context = canvas[0].getContext('2d');	

	var assumedTemperature = 65;
	var currentPercent = 0;

	function animateCircle(currentArc,currentTemp){
		context.clearRect(0,0,500,500);
		// Draw inner circle
		context.beginPath();
		context.fillStyle = '#3B8EA5';
		context.arc(155,100,70,Math.PI*0,Math.PI*2);
		context.closePath();
		context.fill()
		// draw outter line
		context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = '#F5EE9E';
		context.arc(155,100,70,Math.PI * 0,Math.PI * 2);
		context.stroke();
		context.closePath();
		// draw temp text
		context.font = '30px Arial';
		context.fillStyle = '#F5EE9E';
		context.beginPath();
		context.fillText(Math.floor(currentTemp) + String.fromCharCode(176),135,110);
		context.closePath();
		// draw temp line
		context.beginPath();
		context.lineWidth = 10;
		context.strokeStyle = getBarColor(currentPercent);
		context.arc(155,100,60,Math.PI*1.5,(Math.PI * 2 * currentArc) + Math.PI * 1.5);
		context.stroke();
		context.closePath();
		currentPercent++
		if (currentPercent < currentTemp){
			requestAnimationFrame(()=>{
				animateCircle(currentPercent / 100,currentTemp);
			})
		}	
	}

	function getBarColor(percent){
		var barColor = '#78C0E0';
		if (percent >50 && percent <= 70){
			barColor = '#96E072';
		}else if (percent > 70 && percent < 80){
			barColor = '#F5EE9E';
		}else if (percent >=80 && percent < 90) {
			barColor = '#F49E4C';
		}else if (percent >= 90 && percent <= 150){
			barColor = '#D00000';
		}
		return barColor;
	}

	function degToCompass(num) {
    	var val = Math.floor((num / 22.5) + 0.5);
    	var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    	return arr[(val % 16)];
	}

})






























