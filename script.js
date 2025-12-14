gsap.registerPlugin(ScrollTrigger);

// HERO ANIMATION
gsap.from(".hero-content", { opacity: 0, y: 80, duration: 1.4, ease: "power4.out" });

// PARALLAX
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".parallax").forEach(el => {
    const depth = el.dataset.depth;
    const x = (window.innerWidth / 2 - e.pageX) * depth;
    const y = (window.innerHeight / 2 - e.pageY) * depth;
    el.style.transform = `translate(${x / 40}px,${y / 40}px)`;
  });
});

// ABOUT ANIMATION
gsap.from(".about-text, .about-visual", {
  scrollTrigger: { trigger: "#about-section", start: "top 70%" },
  opacity: 0,
  y: 80,
  stagger: 0.3,
  duration: 1.2
});

// TECH STACK ANIMATION
gsap.utils.toArray(".tech-card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%", // when the card enters viewport
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1
  });

  // Animate each skill bar individually
  const fill = card.querySelector(".skill-fill");
  gsap.to(fill, {
    width: fill.dataset.width,
    duration: 1.5,
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

// THEME SWITCH WITH ICON VISIBILITY
const body = document.body;
const themeSwitch = document.querySelector(".theme-switch");
const sunIcon = document.querySelector(".theme-switch .sun");
const moonIcon = document.querySelector(".theme-switch .moon");

// Initialize icons
function updateIcons() {
  if (body.classList.contains("dark")) {
    sunIcon.style.display = "inline";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline";
  }
}
updateIcons();

themeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  updateIcons();
});
