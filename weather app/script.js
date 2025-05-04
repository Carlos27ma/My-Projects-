const API_KEY = "3c2f8f0c8c1e4a1696e195234250704"; // REPLACE THIS with your actual API key
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

// Utility function to safely get elements
function getElementOrFail(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Could not find element with ID: ${id}`);
  }
  return element;
}

// Display weather data (updated to match your HTML)
function displayWeatherData(data) {
  if (data.error) {
    showError(data.error.message);
    return;
  }

  const location = data.location;
  const current = data.current;

  getElementOrFail(
    "cityName"
  ).textContent = `${location.name}, ${location.country}`;
  getElementOrFail("temperature").textContent = current.temp_c;
  getElementOrFail("humidity").textContent = current.humidity;
  getElementOrFail("conditions").textContent = current.condition.text;

  getElementOrFail("weatherResult").style.display = "block";
  getElementOrFail("errorMessage").style.display = "none";
}

// Show error message
function showError(message) {
  const errorElement = getElementOrFail("errorMessage");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  getElementOrFail("weatherResult").style.display = "none";
}

// Fetch API implementation
async function fetchWeatherData(location) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Weather API error");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error(`Failed to get weather: ${error.message}`);
  }
}

// jQuery AJAX implementation
function fetchWeatherWithJQuery(location) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}`;

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: resolve,
      error: function (xhr, status, error) {
        const errorMsg = xhr.responseJSON?.error?.message || error;
        reject(new Error(errorMsg));
      },
    });
  });
}

// XMLHttpRequest implementation
function fetchWeatherWithXHR(location) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}`;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          reject(new Error("Failed to parse response"));
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.error?.message || "API error"));
        } catch (e) {
          reject(new Error(`API request failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    xhr.send();
  });
}

// DOM initialization
document.addEventListener("DOMContentLoaded", function () {
  try {
    const getWeatherBtn = getElementOrFail("getWeatherBtn");
    const locationInput = getElementOrFail("locationInput");
    const methodSelect = getElementOrFail("methodSelect");

    getWeatherBtn.addEventListener("click", async function () {
      const location = locationInput.value.trim();
      const method = methodSelect.value;

      if (!location) {
        showError("Please enter a location");
        return;
      }

      try {
        let data;
        switch (method) {
          case "fetch":
            data = await fetchWeatherData(location);
            break;
          case "jquery":
            data = await fetchWeatherWithJQuery(location);
            break;
          case "xhr":
            data = await fetchWeatherWithXHR(location);
            break;
          default:
            throw new Error(`Unknown method: ${method}`);
        }

        if (data) {
          displayWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        showError(error.message);
      }
    });
  } catch (error) {
    console.error("Initialization error:", error);
    document.body.innerHTML = `
      <div style="color: red; padding: 20px; font-family: Arial;">
        <h2>Application Error</h2>
        <p>${error.message}</p>
        <p>Please check the console for details.</p>
      </div>
    `;
  }
});
