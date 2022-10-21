function canvasSetSizes(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function canvasStartDraw() {
	loader.start();
	let split = 0;
	const numberOfSplits = 64;
	loader.splitRemaining = numberOfSplits;
	divider = Math.sqrt(numberOfSplits)
	let pixelStart = new Pixel();
	workers = [];
	while (split < numberOfSplits){
		var drawer = new Worker("worker.drawer.js");
		workers.push(drawer); 
		var img = ctx.createImageData(canvas.width / divider, canvas.height / divider);
//		if (complexPlan.zoomDepth > 1)
//			loader.iterations *= Math.sqrt(complexPlan.zoomDepth / 8)
		drawer.postMessage([
			{
				iterations: loader.iterations,
				img: img,
				id: split,
				width: canvas.width / divider,
				height: canvas.height /divider,
				complexPlan: JSON.parse(JSON.stringify(complexPlan)),
				pixelStart: JSON.parse(JSON.stringify(pixelStart))
			}
		])
		drawer.onmessage = function (e){
			ctx.putImageData(e.data.img, e.data.pixelStart.x, e.data.pixelStart.y);
			loader.splitRemaining -= 1;
			if (!loader.splitRemaining){
				loader.stop();
		//		loader.iterations *= Math.round(loader.iterations / divider);
		//		if (loader.iterations < loader.maxIterations)
		//			canvasStartDraw();
		//		else
					loader.iterations = loader.iterationsStart;
			}
		}
		split += 1;
		pixelStart.x += Math.floor(canvas.width / divider);
		if (!(split % divider)){
			pixelStart.x = 0;
			pixelStart.y += Math.floor(canvas.height / divider);
		}
	}
}