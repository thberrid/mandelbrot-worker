document.addEventListener("DOMContentLoaded", (event) => {
	console.log("Rien ne me choque. Je suis un scientifique.")
	loader.init();
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	complexPlan = new ComplexPlan();
	canvasSetSizes();
	canvasStartDraw();
});