function ComplexNumber(r = 0, i = 0){
	this.r = r;
	this.i = i;
	this.gt = (n) => { return (this.i + this.r > n) }
	this.pow = (n = 2) => {
		let newR = this.r;
		let newI = this.i;
		for (let i = 1 ; i < n ; i += 1) { newR = newR * newR }
		for (let i = 1 ; i < n ; i += 1) { newI = newI * newI }
		return new ComplexNumber(newR, newI) 
	}
	this.display = () => { console.log(this.r + " " + this.i); }
	return this;
}