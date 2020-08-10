self.addEventListener("message", evt => {
	// Log request
	console.log(`Worker got: ${evt.data}`);

	// Send response in 2000 ms
	setTimeout(() => (self as any).postMessage("Hello from worker"), 1500);
});

// This is a dummy export
export default function(){};