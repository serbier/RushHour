var Alimentador = {
	create: function(id, estacion){
		var obj = Object.create(this);
		this.id = id;
		this.startTime = 0;
		this.optimumCapacity = 40;
		this.maxCapacity = 60;
		this.currentLevel = 0;
		this.state = true;
		this.travel = function(){
			this.startTime = new Date();
			this.state = false;
		};
		this.checkStatus = function(){
			var currentTime = new Date();
			if(currentTime - this.startTime >= estacion.timeRute){
				this.state = true;
				}
			};
		}
};	


var Pasajero = {
	create: function(estacion){
		var obj = Object.create(this);
		this.initialTime = new Date();
		this.angerTime = Math.floor(Math.random()*15000);
		this.isAnger = function(){
			currentTime = new Date();
			if (currentTime - initialTime >= this.angerTime){
				return true;
			};
		estacion.currentUsers.push(this);
		};
	}
};
var Estacion = {
	create: function(id, timeRute){
		var obj = Object.create(this);
		this.id = id;
		this.timeRute = timeRute;
		this.currentUsers = [];
	}
};




window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	
	update();
	function update(){
		context.clearRect(-width/2,-height/2,width,height);
	}
	requestAnimationFrame(update);
};
