  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("primary-nav");

  function setOpen(isOpen){
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Close menu when clicking a link (mobile)
  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) setOpen(false);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) setOpen(false);
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });




//TRANSITIONS CODE 
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".fade-on-load");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const section = el.closest(".fade-section");

      // Stagger everything inside the section when it hits the screen
      if (section) {
        const group = section.querySelectorAll(".fade-on-load");
        group.forEach((node, i) => {
          node.style.animationDelay = `${i * 120}ms`;
          node.classList.add("in-view");
        });
        group.forEach((node) => io.unobserve(node));
      } else {
        // Single element fallback
        el.style.animationDelay = "0ms";
        el.classList.add("in-view");
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

  items.forEach((el) => io.observe(el));
});






// MODAL CODE 
const modal = document.getElementById("videoModal");
const iframe = document.getElementById("videoIframe");
const closeBtn = document.querySelector(".video-close");

// OPEN MODAL
document.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        const videoURL = this.dataset.video + "?autoplay=1";

        iframe.src = videoURL;
        modal.style.display = "flex";
    });
});

// CLOSE MODAL
function closeModal() {
    modal.style.display = "none";
    iframe.src = ""; // stop video
}

closeBtn.addEventListener("click", closeModal);

// Click outside video closes modal
modal.addEventListener("click", function(e) {
    if (e.target === modal) closeModal();
});
