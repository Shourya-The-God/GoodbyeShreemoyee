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
    face.style.position = "relative";
    face.style.transform = "none";
    face.style.backfaceVisibility = "visible";
    face.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
    face.style.margin = "0 0 20px 0";
    face.style.width = "100%";
    face.style.maxWidth = "400px";
    face.style.height = "auto";
    face.classList.remove("card-face");

    const img = face.querySelector("img");
    if (img) {
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.objectFit = "contain";
      img.style.maxHeight = "250px";
      img.style.display = "block";
    }
  });

  const screenshotContainer = document.createElement("div");
  screenshotContainer.style.position = "absolute";
  screenshotContainer.style.top = "0";
  screenshotContainer.style.left = "0";
  screenshotContainer.style.display = "flex";
  screenshotContainer.style.flexDirection = "column";
  screenshotContainer.style.alignItems = "center";
  screenshotContainer.style.padding = "20px";
  screenshotContainer.style.background = "white";
  screenshotContainer.style.gap = "20px";
  screenshotContainer.style.width = "100%";
  screenshotContainer.style.zIndex = "-1"; // hidden but capturable

  screenshotContainer.appendChild(front);
  screenshotContainer.appendChild(back);
  document.body.appendChild(screenshotContainer);

  // Wait for rendering
  setTimeout(() => {
    html2canvas(screenshotContainer, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "shreemoyee_card_vertical.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      document.body.removeChild(screenshotContainer);
    });
  }, 100);
});
