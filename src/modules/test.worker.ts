// This will be an embedded worker when processed by the loader
// Cast self from dom to webworker 
const worker = self as unknown as Worker;

worker.addEventListener("message", evt => {
	// Log request
	console.log(`Worker got: ${evt.data}`);

	// Send response in x ms
	setTimeout(() => worker.postMessage("Hello from worker"), 1500);
});

// Dummy export to ensure this file is a module
export default function(){};