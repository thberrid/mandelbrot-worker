function Pixel(x = 0, y = 0){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.display = () => { console.log(this.x + " " + this.y); }
	this.toComplexNumber = (thiscomplexPlan) => {
		return new ComplexNumber (
			this.x * thiscomplexPlan.precision + thiscomplexPlan.min.r, 
			this.y * thiscomplexPlan.precision * -1 + thiscomplexPlan.min.i
		)
	}
}