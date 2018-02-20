//en este documento se definen los objetos y sus relaciones que compondrán el juego. 
var Alimentador = {
	// create es el constructor del las instancias del objeto, en esta funcion se definen los atributos y métodos que 
	// componen al objeto Alimentador. 
	create: function(id){ // el único argumento para crear un  objeto Alimentador será el id (identificador)
		var obj = Object.create(this); // la variable obj es una convención, en dicha variable se guardarán los atributos 
		this.id = id; // se usa el prefijo this para referirse a la variable Obj. Acá se le asigna el atributo id
		this.startTime = 0; // atributo que guardará el tiempo desde que sale el bus del  portal
		this.optimumCapacity = 40; // se establece la capacidad óptima de pasajeros 40 es un valor arbitrario hay que revisar
		this.maxCapacity = 60; // esta es la capacidad máxima del alimentador igualmente revisar	
		this.currentLevel = 0; // este atributo indicará qué tantos pasajeros hay subidos al alimentador
		this.state = true; // este atributo indica está o no disponible para embarcar pasajeros
		this.travel = function(){ //esto es un método que va a ser el que se active cuando salga el alimentador del portal
			this.startTime = new Date(); // el objeto date almacena la hora en la cual se llama 
			this.state = false; // se cambia el estado a false debido a que ya no se encuentra disponible
		};
		this.checkStatus = function(estacion){ // este método revisa si ya acabó de hacer la ruta el alimentador 
			var currentTime = new Date();
			if(currentTime - this.startTime >= estacion.timeRute){ // condicional, cada estacion tiene un tiempo de ruta definido
				this.state = true;
				}
			};
		return obj;
		}
};	


var Pasajero = { // se define el objeto pasajero
	create: function(){
		var obj = Object.create(this);
		this.initialTime = new Date(); // momento que llega a esperar en la estación del alimentador
		this.angerTime = Math.floor(Math.random()*15000); // se define aleatoriamente un tiempo apartir del cual empieza a disgustarse (las unidades están en ms).
		this.isAnger = function(){ // método que verifica si se encuentra disgustado o no.
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
var Estacion = { // se define el objeto estación 
	create: function(id, timeRute){
		var obj = Object.create(this);
		this.id = id; // cada estación tendrá un identificador
		this.timeRute = timeRute; // el tiempo que tomará hacer la ruta para la estación en cuestión. 
		this.currentUsers = []; // cuantos usuarios hay esperando
		this.associatedAlim = []; // cuales alimentadores se encuentran haciendo la ruta 
	return obj;
	}
};

var Portal = { // objeto portal que almacenara cada estación 
	create: function(){
		var obj = Object.create(this);
		this.estaciones = {};
	return obj;
	}
}


window.onload = function () { // función que dirá que hacer apenas cargue la página
	var canvas = document.getElementById("canvas"), // acá se toma la etiqueta <canvas></canvas> de index.html
		context = canvas.getContext("2d"), // se define el contexto que trae por defecto herramientas para animar y dibujar en el lienzo (canvas)
		width = canvas.width = 750 , //ancho  del canvas
		height = canvas.height = 580, // alto del canvas
		portal = new Portal.create(), // se crea una instancia del objeto portal
	    	background = new Image(),
		nEst = ['Ciudadela Colsubsidio','Cortijo','Garces Navas','Bochica','Bolivia','Calle 80', 'Quirigua', 'Alamos','Villas de granada','Bolivia-Bochica', 'Villas del dorado'], // se defien los ids de cada estacion
	background.src = "img/g4483.png";
	for (let i in nEst){ // se utiliza el let para declarar a i como una variable global, se itera por cada id de las estaciones para crear instancias de objeto estacion
		var button; 
		var nAlimen = Math.floor(Math.random()*10); // para cada estacion se asignan n alimntadores donde n es un numero aleatorio ente 0 y 10
		portal.estaciones[nEst[i]] = new Estacion.create(nEst[i],15000); // se crea instancia estacion con un tiempo de ruta de 15 s
		for (var j = 0; j<= nAlimen; j++){
			portal.estaciones[nEst[i]].associatedAlim.push(new Alimentador.create(j)); // se crean instancias del objeto alimentador y se asignan a la i-esima estacion
		}
		button = $("<button type=\"button\" class=\"btn btn-primary btn-sm list-group-item list-group-item-action\"></button>").text(nEst[i]); // se definen los botones del panel derecho que lista cada ruta alimentadora
		button.attr('id',nEst[i]); //  se le asigna un id a cada boton para su posterior localizacion
		button.click(function(){ // se defin el comportamiento de cada boton una vez se hace click en él 
			$("#alimentadores").empty(); //se borran todos los botones de alimentador previos para que no se sumen
			var estacion = portal.estaciones[nEst[i]]; // se obtiene el objeto estacion para el boton en cuestion 
			for(var alimen in estacion.associatedAlim){ // se itera por los laimentadores asocioados con esta estación
				content = $("<button type=\"button\" class=\"btn btn-primary btn-sm  \"></button>").text(alimen); // se crea el boton para cada alimentador
				$("#alimentadores").append(content); // se agrega a index.html en la etiqueta con id #alimentadores
			}
		});
		$("#estaciones").append(button); // se agrega a index.html en la etiqueta con id #estaciones
			




	
	update();
	function update(){
		context.clearRect(0,0,width,height);
		context.drawImage(background,33,0);

		
		}
	}
	requestAnimationFrame(update);
};
