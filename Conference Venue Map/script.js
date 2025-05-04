document.addEventListener("DOMContentLoaded", () => {
  const venueMap = document.getElementById("venueMap");
  const tooltip = document.getElementById("tooltip");

  const roomDetails = {
    mainHall: "Keynote sessions and main events.",
    workshopRoom: "Hands-on workshops and breakout sessions.",
    lounge: "Networking area with refreshments.",
    infoDesk: "Get help and conference information.",
  };

  venueMap.addEventListener("mouseover", (e) => {
    if (e.target.id && roomDetails[e.target.id]) {
      e.target.setAttribute("fill", "gold");
      tooltip.classList.remove("hidden");
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.style.top = `${e.pageY + 10}px`;
      document.getElementById("roomName").textContent = e.target.textContent;
      document.getElementById("roomDetails").textContent =
        roomDetails[e.target.id];
    }
  });

  venueMap.addEventListener("mouseout", (e) => {
    if (e.target.id) {
      e.target.setAttribute(
        "fill",
        e.target.id === "mainHall"
          ? "#4CAF50"
          : e.target.id === "workshopRoom"
          ? "#2196F3"
          : e.target.id === "lounge"
          ? "#FF9800"
          : "#9C27B0"
      );
      tooltip.classList.add("hidden");
    }
  });
});

function generateBadge() {
  const canvas = document.getElementById("badgeCanvas");
  const ctx = canvas.getContext("2d");
  const name = document.getElementById("name").value || "Guest Speaker";
  const title = document.getElementById("title").value || "Conference Speaker";

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw badge background
  ctx.fillStyle = "#1a73e8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add decorative border
  ctx.strokeStyle = "gold";
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Add text
  ctx.fillStyle = "white";
  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, 80);

  ctx.font = "18px Arial";
  ctx.fillText(title, canvas.width / 2, 120);

  // Optional: Add event logo (placeholder)
  ctx.font = "italic 16px Arial";
  ctx.fillText("TechConf 2024", canvas.width / 2, 180);
}