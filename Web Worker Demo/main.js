document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startWorker");
  const stopBtn = document.getElementById("stopWorker");
  const resultDiv = document.getElementById("result");
  const statusDiv = document.getElementById("status");

  let worker;

  // Start the worker
  startBtn.addEventListener("click", function () {
    if (worker) {
      worker.terminate();
    }

    worker = new Worker("worker.js");

    // Update UI
    statusDiv.textContent = "Worker started... Calculating...";
    resultDiv.textContent = "";
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // Send data to worker
    worker.postMessage({ command: "calculate", value: 40 });

    // Receive messages from worker
    worker.onmessage = function (e) {
      if (e.data.status === "started") {
        statusDiv.textContent = `Calculating Fibonacci(${e.data.value})...`;
      } else if (e.data.status === "completed") {
        statusDiv.textContent = `Calculation completed!`;
        resultDiv.textContent = `Fibonacci(${e.data.value}) = ${e.data.result}`;
        startBtn.disabled = false;
        stopBtn.disabled = true;
      }
    };

    worker.onerror = function (error) {
      statusDiv.textContent = `Error: ${error.message}`;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    };
  });

  // Stop the worker
  stopBtn.addEventListener("click", function () {
    if (worker) {
      worker.terminate();
      statusDiv.textContent = "Worker terminated by user";
      startBtn.disabled = false;
      stopBtn.disabled = true;
      worker = null;
    }
  });
});
