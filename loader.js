const loader = {
	id: 0,
	iterations: 0,
	iterationsStart: 255,
	maxIterations: 255,
	splitRemaining: 4,
    init: () => {
		buttonStop = document.getElementById("stop")
        loader.status = document.getElementById("status");
		iterationsRange = document.getElementById("range-iterations")
		loader.iterationsStart = iterationsRange.value
		loader.maxIterations = iterationsRange.value
		loader.iterations = iterationsRange.value
    },
	animationIndex: 0,
	animation: () => {
		let arr = [
			"processing",
			"processing.",
			"processing..",
			"processing...",
		];
		loader.status.innerHTML = arr[loader.animationIndex];
		loader.animationIndex += 1;
		if (loader.animationIndex == arr.length)
			loader.animationIndex = 0;
	},
    start: () =>{
		buttonStop.classList.remove("hidden")
		buttonStop.addEventListener("click", stopProcesses);
		iterationsRange.disabled = true;
		iterationsRange.removeEventListener("change", iterationsUpdate);
		window.removeEventListener("keyup", eventKeys);
		window.removeEventListener("resize", eventResize);
		window.removeEventListener("wheel", eventScroll);
		canvas.removeEventListener("click", eventClick);
		canvas.removeEventListener("touchstart", eventTouch);
		loader.time.start = performance.now();
		loader.id = setInterval(loader.animation, 100);
    },
    stop: () => {
		buttonStop.classList.add("hidden")
		buttonStop.removeEventListener("click", stopProcesses)
		iterationsRange.disabled = false;
		iterationsRange.addEventListener("change", iterationsUpdate);
		window.addEventListener("keyup", eventKeys);
		canvas.addEventListener("click", eventClick);
		canvas.addEventListener("touchstart", eventTouch);
		window.addEventListener("resize", eventResize)
		window.addEventListener("wheel", eventScroll)
        loader.time.end = performance.now()
        console.log(loader.iterations + " iterations in " + (loader.time.end - loader.time.start) + " ms")
		loader.status.innerHTML = "";
		loader.animationIndex = 0;
		clearInterval(loader.id);
		loader.id = null;
    },
    status: "",
    time: { start: 0, end:  0}
};