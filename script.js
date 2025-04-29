const card = document.getElementById("flip-card");
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");

  const enableAudio = () => {
    music.play().catch((e) => {
      console.log("Autoplay blocked. User interaction needed.");
    });
    document.removeEventListener("click", enableAudio);
  };

  document.addEventListener("click", enableAudio);
});

document.getElementById("screenshotBothBtn").addEventListener("click", () => {
  const front = document.querySelector(".card-front").cloneNode(true);
  const back = document.querySelector(".card-back").cloneNode(true);

  [front, back].forEach((face) => {
    face.style.position = "static";
    face.style.transform = "none";
    face.style.backfaceVisibility = "visible";
    face.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
    face.style.margin = "0 10px";
    face.style.width = "300px"; // Match your actual card width
    face.style.height = "auto";
    face.style.flexShrink = "0";
    face.classList.remove("card-face");

    // Fix image rendering
    const img = face.querySelector("img");
    if (img) {
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.objectFit = "cover";
      img.style.maxHeight = "250px";
      img.style.display = "block";
    }
  });

  const screenshotContainer = document.createElement("div");
  screenshotContainer.style.position = "fixed";
  screenshotContainer.style.top = "-9999px";
  screenshotContainer.style.left = "-9999px";
  screenshotContainer.style.display = "flex";
  screenshotContainer.style.flexDirection = "row";
  screenshotContainer.style.alignItems = "flex-start";
  screenshotContainer.style.padding = "20px";
  screenshotContainer.style.background =
    "linear-gradient(135deg, #ffe4f0, #e0c3fc)";
  screenshotContainer.style.gap = "20px";
  screenshotContainer.style.maxWidth = "100%";
  screenshotContainer.style.flexWrap = "nowrap";

  screenshotContainer.appendChild(front);
  screenshotContainer.appendChild(back);
  document.body.appendChild(screenshotContainer);

  html2canvas(screenshotContainer, {
    useCORS: true,
    scale: 2,
    allowTaint: true,
    backgroundColor: null,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "shreemoyee_card_full.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    document.body.removeChild(screenshotContainer);
  });
});
