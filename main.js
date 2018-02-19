var Alimentador = {
	create: function(id){
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
		return obj;
		}
};	


var Pasajero = {
	create: function(){
		var obj = Object.create(this);
		this.initialTime = new Date();
		this.angerTime = Math.floor(Math.random()*15000);
		this.isAnger = function(){
			currentTime = new Date();
			if (currentTime - this.initialTime >= this.angerTime){
				return true;
			}
			else {
				return false;
			};
		return obj;
		};
	}
};
var Estacion = {
	create: function(id, timeRute){
		var obj = Object.create(this);
		this.id = id;
		this.timeRute = timeRute;
		this.currentUsers = [];
		this.associatedAlim = [];
	return obj;
	}
};

var Portal = {
	create: function(){
		var obj = Object.create(this);
		this.estaciones = {};
	return obj;
	}
}


window.onload = function () {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = 750 ,
		height = canvas.height = 580,
		portal = new Portal.create(),
		nEst = ['Ciudadela Colsubsidio','Cortijo','Garces Navas','Bochica','Bolivia','Calle 80', 'Quirigua', 'Alamos','Villas de granada','Bolivia-Bochica', 'Villas del dorado'],
		buttons = [];

		for (let i in nEst){
			var button;
			var nAlimen = Math.floor(Math.random()*10);
			portal.estaciones[nEst[i]] = new Estacion.create(nEst[i],15000);
			for (var j = 0; j<= nAlimen; j++){
				portal.estaciones[nEst[i]].associatedAlim.push(new Alimentador.create(j));
			}
			button = $("<button type=\"button\" class=\"btn btn-primary btn-sm list-group-item list-group-item-action\"></button>").text(nEst[i]);
			button.attr('id',nEst[i]);
			button.click(function(){
				$("#alimentadores").empty();
				var estacion = portal.estaciones[nEst[i]];
				for(var alimen in estacion.associatedAlim){
					content = $("<button type=\"button\" class=\"btn btn-primary btn-sm  \"></button>").text(alimen);
					$("#alimentadores").append(content);
				}
			});
			$("#estaciones").append(button);
			




	
	update();
	function update(){
		context.clearRect(0,0,width,height);
		context.rect(0,0,width,height);
		context.fill();
		
		}
	}
	requestAnimationFrame(update);
};
