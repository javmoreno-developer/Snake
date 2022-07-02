var xFood=0;
var yFood=0;
var s1;
var f1;
var requestID;
var timer;
var requestID2;

//insertamos la comida
function insertFood() {
	//posiciones random para la food
	xFood=parseInt(Math.random()*9);
	yFood=parseInt(Math.random()*9)+1;

	console.log("x comida: "+xFood);
	console.log("y comida: "+yFood);
	//instancia de food
	f1=new food(xFood,yFood);
	f1.asociar();
}

//insertamos snake
function insertSnake() {
	//posiciones random para la snake (deben ser diferentes a food)
	let xSnake,ySnake=0;
	do {
		xSnake=parseInt(Math.random()*9);
		ySnake=parseInt(Math.random()*9)+1;
	} while(xFood==xSnake && yFood==ySnake);

	s1=new Snake(xSnake,ySnake,1);
	//s1=new Snake(4,2,5);
	
	console.log("x snake: "+xSnake);
	console.log("y snake: "+ySnake);

	s1.asociar();
}

window.onload=function(e) {
	insertFood();
	insertSnake();
	//move(e);

	

}

$("body").keydown((e)=> {
	//teclas: 37 izq 38 arriba 39 derecha 40 abajo
	//console.log(s1.direccion);
    pause();
    setTimeout(()=>{
			requestID2 = window.requestAnimationFrame(function() {
	    		move(e);
	   		});
			
		},300);



});

//mobile controls
 $('.button').each(function () {
    var i = $(this).attr('id');
    console.log(i);
    $("#"+i+"").click(()=> {
    	let dir=$(this).attr('id');
    	pause();
	    setTimeout(()=>{
			requestID2 = window.requestAnimationFrame(function() {
		    	moveMobile(dir);
			});
				
		},300);
    });
});


function moveMobile(param) {
	console.log("mobile: "+param);
	timer=setTimeout(function() {
		switch(param) {
	    	case "left":
	    		if(s1.direccion=="right") {
	    			s1.direccion="right";
	    		} else {
	    			s1.direccion="left";
	    		}
	    	break;
	    	case "up":
	    		if(s1.direccion=="down") {
	    			s1.direccion="down";
	    		} else {
	    			s1.direccion="up";
	    		}
	    	break;
	    	case "right":
	    		if(s1.direccion=="left") {
	    			s1.direccion="left";
	    		} else {
	    			s1.direccion="right";
	    		}
	    	break;
	    	case "down":
	    		if(s1.direccion=="up") {
	    			s1.direccion="up";
	    		} else {
	    			s1.direccion="down";
	    		}
	    	break;
	    	default:
	    }
	    s1.desplazar();
	    checkFood();
	    //requestID2 = requestAnimationFrame(move(e));
	    requestID2 = window.requestAnimationFrame(function(e) {
	    	moveMobile(param);
	    });
    }, 300);
}

//fin mobile
function move(e) {
 timer=setTimeout(function() {
		switch(e.which) {
	    	case 37:
	    		if(s1.direccion=="right") {
	    			s1.direccion="right";
	    		} else {
	    			s1.direccion="left";
	    		}
	    	break;
	    	case 38:
	    		if(s1.direccion=="down") {
	    			s1.direccion="down";
	    		} else {
	    			s1.direccion="up";
	    		}
	    	break;
	    	case 39:
	    		if(s1.direccion=="left") {
	    			s1.direccion="left";
	    		} else {
	    			s1.direccion="right";
	    		}
	    	break;
	    	case 40:
	    		if(s1.direccion=="up") {
	    			s1.direccion="up";
	    		} else {
	    			s1.direccion="down";
	    		}
	    	break;
	    	default:
	    }
	    s1.desplazar();
	    checkFood();
	    //requestID2 = requestAnimationFrame(move(e));
	    requestID2 = window.requestAnimationFrame(function(e) {
	    	move(e);
	    });
    }, 300);
}

function checkFood() {
	//sacar primero la posicion de la food
	let posFoodTotal=f1.x*9+f1.y;
	let posSnakeTotal=s1.x*9+s1.y;
	if(posFoodTotal==posSnakeTotal) {
		$(".food").css("display","none");
		f1.comido();
		s1.agrandar();
		insertFood();
	}
}

function pause() {
    // pass in the id returned from the last call to requestAnimationFrame
    window.cancelAnimationFrame(requestID);
    window.cancelAnimationFrame(requestID2);
    clearTimeout(timer);
}