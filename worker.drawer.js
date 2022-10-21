importScripts("complexnumber.js")
importScripts('complexplan.js')
importScripts('pixel.js');
importScripts('mandelbrot.js')

self.onmessage = function(e){
	var data = e.data[0];
	let pixel = new Pixel(data.pixelStart.x, data.pixelStart.y);
	let imgDataPixel = new Pixel();
	while (imgDataPixel.y < data.height){
		imgDataPixel.x = 0;
		pixel.x = data.pixelStart.x;
		while (imgDataPixel.x < data.width){
			let color = mandelbrotPoint(pixel, data.iterations, data.complexPlan);
			let index = (imgDataPixel.x + imgDataPixel.y * data.img.width) * 4;
			data.img.data[index] = color.red;
			data.img.data[index + 1] = color.green;
			data.img.data[index + 2] = color.blue;
			data.img.data[index + 3] = 255;
			imgDataPixel.x += 1;
			pixel.x += 1;
		}
		pixel.y += 1;
		imgDataPixel.y += 1;
	}
	self.postMessage({
		img: data.img,
		pixelStart: data.pixelStart
	});
}