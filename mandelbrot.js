function iterationToColor(n){
	return {
		red: 255 - n * 2,
		green: 255 - n * 2,
		blue: 255 - n * 2
	};

}

function mandelbrotPoint(px, iterations, complexPlan){
	const c = px.toComplexNumber(complexPlan);
//	if (c.r.toFixed(2) == 0.00 || c.i.toFixed(2) == 0.00)
//		return { red: 255, blue: 0, green: 0}
	let z = new ComplexNumber()
	let zSquare = new ComplexNumber()
	let n = 0;
	/*
	let white = {
		red: 255,
		green: 255,
		blue: 255
	};
	*/
	let dark = {
		red: 70, green: 70, blue: 70
	}
	
	const p = Math.sqrt(((c.r - (1/4)) * (c.r - (1/4))) + (c.i * c.i));
	if (c.r < p - 2 * (p * p) + (1/4))	// avoid cardioide
		return dark;
	if ((c.r + 1) * (c.r + 1) + (c.i * c.i) < 1/16) // avoid main bourgeon
		return dark;
	
	while (n < iterations){
		z.i = 2 * z.r * z.i + c.i;
		z.r = zSquare.r - zSquare.i + c.r;
		zSquare = z.pow();
		if (zSquare.gt(4))
			return iterationToColor(n % 255);
		n += 1;
	}
	return dark;
}