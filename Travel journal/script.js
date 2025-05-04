// File Upload for Photos
document
  .getElementById("photo-upload")
  .addEventListener("change", function (e) {
    const preview = document.getElementById("photo-preview");
    preview.innerHTML = "";

    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/")) continue;

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "uploaded-photo";
        preview.appendChild(img);

        // Also add to gallery
        const galleryImg = img.cloneNode();
        document.getElementById("gallery-display").appendChild(galleryImg);
      };
      reader.readAsDataURL(files[i]);
    }
  });

// Video Upload
document
  .getElementById("video-upload")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("video/")) return;

    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = true;
    video.className = "uploaded-video";

    document.getElementById("gallery-display").appendChild(video);
  });

// Audio Upload
document
  .getElementById("audio-upload")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("audio/")) return;

    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(file);
    audio.controls = true;
    audio.className = "uploaded-audio";

    document.getElementById("gallery-display").appendChild(audio);
  });

// Geolocation
document.getElementById("get-location").addEventListener("click", function () {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  const locationDisplay = document.getElementById("location-display");
  locationDisplay.innerHTML = "<p>Getting location...</p>";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      locationDisplay.innerHTML = `
                        <p>Location tagged at: ${new Date().toLocaleString()}</p>
                        <p>Latitude: ${position.coords.latitude.toFixed(4)}</p>
                        <p>Longitude: ${position.coords.longitude.toFixed(
                          4
                        )}</p>
                        <p>Accuracy: ${position.coords.accuracy} meters</p>
                    `;
    },
    function (error) {
      locationDisplay.innerHTML = `<p>Error getting location: ${error.message}</p>`;
    }
  );
});

// Drag and Drop
const dropZone = document.getElementById("drop-zone");

// Highlight drop zone when item is dragged over it
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add("highlight");
}

function unhighlight(e) {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove("highlight");
}

// Handle dropped files
dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  const gallery = document.getElementById("gallery-display");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "uploaded-photo";
        gallery.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.className = "uploaded-video";
      gallery.appendChild(video);
    } else if (file.type.startsWith("audio/")) {
      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(file);
      audio.controls = true;
      audio.className = "uploaded-audio";
      gallery.appendChild(audio);
    }
  }
});

// Save Journal Entry
document.getElementById("save-entry").addEventListener("click", function () {
  const entryText = document.getElementById("entry-text").value;
  const locationInfo = document.getElementById("location-display").innerHTML;

  if (!entryText.trim()) {
    alert("Please write something in your journal entry");
    return;
  }

  const entryDiv = document.createElement("div");
  entryDiv.className = "entry";
  entryDiv.innerHTML = `
                <p><strong>${new Date().toLocaleString()}</strong></p>
                <p>${entryText}</p>
                ${locationInfo}
                <div class="entry-media"></div>
            `;

  // Copy media from gallery to entry
  const gallery = document.getElementById("gallery-display");
  const entryMedia = entryDiv.querySelector(".entry-media");

  // Clone each media element to the entry
  Array.from(gallery.children).forEach((media) => {
    entryMedia.appendChild(media.cloneNode(true));
  });

  document.getElementById("entries-container").prepend(entryDiv);

  // Clear form
  document.getElementById("entry-text").value = "";
  document.getElementById("location-display").innerHTML = "";
  gallery.innerHTML = "";
});

// Debugging helper
console.log("Application initialized. Ready for debugging with browser tools.");
