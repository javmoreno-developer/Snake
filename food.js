class food {
	constructor(x,y,puntuacion=1,color="black") {
		this.x=x;
		this.y=y;
		this.puntuacion=puntuacion;
		this.color=color;
	}
	asociar() {
		let txt3 = document.createElement("div");
		txt3.className="food";
		let suma = (this.x*9)+this.y;
		$("#cell_"+suma).append(txt3);
	}
	comido() {
		let suma = (this.x*9)+this.y;
		$("#cell_"+suma).remove(".food");
	}
}