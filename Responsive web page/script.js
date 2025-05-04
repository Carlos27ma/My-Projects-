// Device detection and layout adjustments
document.addEventListener("DOMContentLoaded", function () {
  // Detect device type
  const userAgent = navigator.userAgent;
  let deviceType = "desktop";

  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    if (/iPhone|iPod|Android.*Mobile/i.test(userAgent)) {
      deviceType = "mobile";
    } else {
      deviceType = "tablet";
    }
  }

  console.log(`Device detected: ${deviceType}`);

  // Apply device-specific adjustments if needed
  if (deviceType === "mobile") {
    // Example: Add a mobile-specific class to body
    document.body.classList.add("mobile-device");
  }

  // Example: Toggle mobile menu
  const menuToggle = document.createElement("button");
  menuToggle.className = "menu-toggle";
  menuToggle.textContent = "☰ Menu";
  menuToggle.style.display = "none";

  const nav = document.querySelector("nav ul");
  nav.parentNode.insertBefore(menuToggle, nav);

  function toggleMenu() {
    nav.style.display = nav.style.display === "none" ? "flex" : "none";
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Show/hide menu toggle based on screen size
  function handleResize() {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = "block";
      nav.style.display = "none";
    } else {
      menuToggle.style.display = "none";
      nav.style.display = "flex";
    }
  }

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial check
});
