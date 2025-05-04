// Function to calculate Fibonacci number (heavy computation)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Listen for messages from the main thread
self.addEventListener("message", function (e) {
  if (e.data.command === "calculate") {
    const n = e.data.value;
    self.postMessage({ status: "started", value: n });

    const result = fibonacci(n);

    self.postMessage({
      status: "completed",
      value: n,
      result: result,
    });
  }
});
