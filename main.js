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





document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("audioModal");
    const audioPlayer = document.getElementById("audioPlayer");
    const openButtons = document.querySelectorAll(".open-audio");
    const closeModalBtn = document.querySelector(".close-modal");

    console.log("Modal JS loaded"); // Debug line

    // 🔹 OPEN MODAL
    openButtons.forEach(button => {
        button.addEventListener("click", () => {

            const audioFile = button.dataset.audio; 
            console.log("Opening:", audioFile);

            audioPlayer.src = audioFile;
            modal.style.display = "flex";

            audioPlayer.play().catch(err => {
                console.warn("Autoplay blocked:", err);
            });
        });
    });

    // 🔹 CLOSE MODAL (X button)
    closeModalBtn.addEventListener("click", () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        modal.style.display = "none";
    });

    // 🔹 CLOSE MODAL WHEN CLICKING OUTSIDE THE BOX
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            modal.style.display = "none";
        }
    });

});
