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
    face.style.marginBottom = "20px";
    face.classList.remove("card-face");
  });

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
