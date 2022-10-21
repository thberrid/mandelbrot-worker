function ComplexPlan(abcsRange = 5, coordRange = 5){

	this.abcsRange = abcsRange;
	this.coordRange = coordRange;
	
	if (window.innerWidth > window.innerHeight){
		this.precision = this.coordRange / window.innerHeight;
		this.abcsRange = this.precision * window.innerWidth;
	}
	if (window.innerWidth < window.innerHeight){
		this.precision = this.abcsRange / window.innerWidth;
		this.coordRange = this.precision * window.innerHeight;
	}

	this.min = new ComplexNumber(
		this.abcsRange / 2  * -1,
		this.coordRange / 2
	);
		
	this.display = () => {
		console.log(
			"precision: " + this.precision + 
			" range : " + this.abcsRange + " " + this.coordRange + "; " +
			"min: " + this.min.r + " " + this.min.i
		)
	}
			
	this.zoomDepth = 0;
	this.zoom = (direction, zoomPosition) => {

		let complexPlanCenter = zoomPosition.toComplexNumber(this)
		this.min.r -= complexPlanCenter.r
		this.min.i -= complexPlanCenter.i

		let factor = 1;
		if (direction < 1){ // < 1 == scroll top
			this.zoomDepth += 1;
			factor = .5;
		} else {
			this.zoomDepth -= 1;
			factor = 2;
		}
		
		this.abcsRange *= factor;
		this.coordRange *= factor;
		this.precision = this.abcsRange / window.innerWidth;
		this.min.r *= factor;
		this.min.i *= factor;
	//	this.precision *= factor;
		
	
	//	complexPlanCenter = zoomPosition.toComplexNumber(this)
		this.min.r += complexPlanCenter.r
		this.min.i += complexPlanCenter.i

		
		
	/*	zoomPosition.x = window.innerWidth / 2 - zoomPosition.x
		zoomPosition.y = window.innerHeight / 2 - zoomPosition.y
		let complexPlanCenter = zoomPosition.toComplexNumber(this)
	*/


	}

}