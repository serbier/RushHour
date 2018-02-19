window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
	}


	update();

	function update(){
		context.clearRect(-width/2,-height/2,width,height);
		}


		requestAnimationFrame(update);
	}
};