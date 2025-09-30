// --- Lightbox ---
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImgWrap = document.getElementById("lbImgWrap");
const lbClose = document.getElementById("lbClose");

// Open lightbox
gallery.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;

  const type = thumb.dataset.type;
  const full = thumb.dataset.full;

  lbImgWrap.innerHTML = "";

  if (type === "image") {
    const img = document.createElement("img");
    img.src = full;
    lbImgWrap.appendChild(img);
  } else if (type === "video") {
    const video = document.createElement("video");
    video.src = full;
    video.controls = true;
    video.autoplay = true;
    video.style.borderRadius = "12px";
    lbImgWrap.appendChild(video);
  }

  lightbox.classList.add("active");

  // animasi muncul
  anime({
    targets: "#lightbox",
    opacity: [0, 1],
    duration: 400,
    easing: "easeOutQuad"
  });
});

// Close lightbox
lbClose.addEventListener("click", () => {
  anime({
    targets: "#lightbox",
    opacity: [1, 0],
    duration: 300,
    easing: "easeInQuad",
    complete: () => {
      lightbox.classList.remove("active");
    }
  });
});

// Close by clicking outside
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lbClose.click();
  }
});

// --- Shuffle Gallery ---
function shuffleChildren(parent) {
  let children = Array.from(parent.children);
  for (let i = children.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    parent.appendChild(children[j]);
    children.splice(j, 1);
  }
}

document.getElementById("shuffle").addEventListener("click", () => {
  shuffleChildren(gallery);

  anime({
    targets: "#gallery .thumb",
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(100),
    duration: 500,
    easing: "easeOutQuad"
  });
});

// --- Show All (reset order) ---
const originalOrder = Array.from(gallery.children);

document.getElementById("showAll").addEventListener("click", () => {
  originalOrder.forEach(child => gallery.appendChild(child));

  anime({
    targets: "#gallery .thumb",
    opacity: [0, 1],
    scale: [0.9, 1],
    delay: anime.stagger(80),
    duration: 400,
    easing: "easeOutBack"
  });
});

// Musik
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  } else {
    music.play();
    musicBtn.classList.add("playing");
    musicBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

