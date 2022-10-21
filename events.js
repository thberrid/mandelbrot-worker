function eventResize(e){
	complexPlan = new ComplexPlan();
	canvasSetSizes()
	canvasStartDraw()
}

function stopProcesses(){
	workers.forEach(worker => {
		worker.terminate()
	})
	loader.stop();
	loader.iterations = loader.iterationsStart;
}

function iterationsUpdate(){
	let value = iterationsRange.value;
	if (value < 0){
		value = 0;
		iterationsRange.value = value;
	}
	if (value > 1000){
		value = 255;
		iterationsRange.value = 255;
	}
	loader.iterations = parseInt(value);
	loader.iterationsStart = loader.iterations;
	loader.maxIterations = loader.iterations;
	canvasSetSizes()
	canvasStartDraw()
}

function zoom(x, y, direction){
	complexPlan.zoom(
		direction,
		new Pixel(x,y),
	);
	canvasSetSizes()
	canvasStartDraw()
}

function eventClick(e){
	zoom(e.clientX, e.clientY, -1);
}

function eventTouch(e){
	zoom(e.touches[0].clientX, e.touches[0].clientY, -1);
}

function eventScroll(e){
	zoom(e.clientX, e.clientY, e.deltaY);
}

function eventKeys(e){
//	console.log(e.key);
}