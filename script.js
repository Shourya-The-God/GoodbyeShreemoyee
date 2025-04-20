const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");

  // Autoplay after first user interaction (needed for most browsers)
  const enableAudio = () => {
    music.play().catch((e) => {
      console.log("Autoplay blocked. User interaction needed.");
    });
    document.removeEventListener("click", enableAudio);
  };

  document.addEventListener("click", enableAudio);
});

// Function to preview uploaded image
function handleImageUpload(input) {
  const slot = input.parentElement;
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      slot.classList.remove('placeholder'); // Remove placeholder style
      slot.innerHTML = ''; // Clear placeholder text
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'Uploaded memory';
      slot.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}


document.getElementById("screenshotBothBtn").addEventListener("click", () => {
  const front = document.querySelector(".card-front").cloneNode(true);
  const back = document.querySelector(".card-back").cloneNode(true);

  // Clean up cloned styles
  [front, back].forEach((face) => {
    face.style.position = "static";
    face.style.transform = "none";
    face.style.backfaceVisibility = "visible";
    face.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
    face.style.marginBottom = "20px";
    face.classList.remove("card-face");
  });

  // Create hidden container for screenshot
  const screenshotContainer = document.createElement("div");
  screenshotContainer.style.position = "fixed";
  screenshotContainer.style.top = "-9999px";
  screenshotContainer.style.left = "-9999px";
  screenshotContainer.style.display = "flex";
  screenshotContainer.style.flexDirection = "column";
  screenshotContainer.style.alignItems = "center";
  screenshotContainer.style.padding = "20px";
  screenshotContainer.style.background =
    "linear-gradient(135deg, #ffe4f0, #e0c3fc)";
  screenshotContainer.appendChild(front);
  screenshotContainer.appendChild(back);
  document.body.appendChild(screenshotContainer);

  // Screenshot
  html2canvas(screenshotContainer, { useCORS: true, scale: 2 }).then(
    (canvas) => {
      const link = document.createElement("a");
      link.download = "shreemoyee_card_full.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      document.body.removeChild(screenshotContainer);
    }
  );
});
