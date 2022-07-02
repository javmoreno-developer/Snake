var posiciones=[];//array de posiciones para el desplazamiento
var stopGame=false;

class Snake {
	constructor(x,y,longitud=1,direccion="down") {
		this.x=x;
		this.y=y;
		this.longitud=longitud;
		this.direccion=direccion;
	}

	asociar() {
		let suma = (this.x*9)+this.y;
		let sn;

		for(let i=0;i<this.longitud;i++) {
			sn = document.createElement("div");
			if(i==0) {
				sn.className="head_snake";
				$("#cell_"+suma).append(sn);
			} else {
				sn.className="body_snake";
				sn.id=`body_${i}`;
				suma=suma-9;
				$("#cell_"+suma).append(sn);
			}
		}
	}

	agrandar() {
		this.longitud++;
	}
	desplazar() {
		//rellenamos el array de direcciones

		//fin
		if(stopGame==false) {
		for(let i=0;i<this.longitud;i++) {

			

			if(i==0) {
				let suma = (this.x*9)+this.y;//casiila original
				//introducimos la posicion en el array de posiciones
				posiciones.push(suma);
				$("#cell_"+suma).empty();
				//desplazamiento de cabeza
				switch(this.direccion) {
					case "up":
						this.x--;
					break;
					case "down":
						this.x++;
					break;
					case "left":
						this.y--;
					break;
					case "right":
						this.y++;
					break;
					default:
				}

				
				
				//limites
				if(suma>81) {
					this.x-=10;
				} else if(suma<1) {
					this.x+=10;
				}
				//fin limites

				suma = (this.x*9)+this.y;
				let sn = document.createElement("div");
				sn.className="head_snake";
				$("#cell_"+suma).append(sn);
			} else {
				let anteriorCell=0;
				let nextCell=0;
				let suma = (this.x*9)+this.y;
				switch(this.direccion) {
					case "up":
						anteriorCell=encontrarCuerpo(i);
						nextCell=posiciones[i-1];	
					break;
					case "down":
						anteriorCell=encontrarCuerpo(i);	
						nextCell=posiciones[i-1];	
					break;
					case "left":
						anteriorCell=encontrarCuerpo(i);
						nextCell=posiciones[i-1];	
					break;
					case "right":
						anteriorCell=encontrarCuerpo(i);
						nextCell=posiciones[i-1];	
					break;
					default:
				}

				posiciones.push(anteriorCell);
				//creacion del elemento
				let sn = document.createElement("div");
				sn.className="body_snake";
				sn.id=`body_${i}`;
				$("#cell_"+anteriorCell).empty();
				$("#cell_"+nextCell).append(sn);
				console.log(anteriorCell);
				console.log(posiciones);
			}
		} 
		//fin de desplazar
		checkGameOver(posiciones);
		posiciones=[];
	}
	}
}

function encontrarCuerpo(param) {
	let loot=document.getElementById(`body_${param}`);
	for(let i=1;i<=81;i++) {
		let elemento=document.getElementById(`cell_${i}`);
		if(elemento.contains(loot)) {
			return i;
		}
	}
}

function checkGameOver(param) {
	let total=s1.x*9+s1.y;
	for(let i=0;i<param.length;i++) {
		if(param[i]==total) {
			stopGame=true;

			swal({
			  title: "Game over",
			  type: "error",
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Reiniciar juego",
			  closeOnConfirm: false
			},
			function(){
			  window.location.reload();
			});
		}
	}
}