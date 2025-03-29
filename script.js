document.addEventListener("DOMContentLoaded", () => {
  const toolCards = document.querySelectorAll(".tool-card");

  if (!toolCards.length) return; // Exit if no cards found

  // --- Intersection Observer for Staggered Card Animation ---
  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the card is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const cardIndex = parseInt(card.dataset.index || "0", 10); // Get index from data attribute
        const delay = cardIndex * 120; // Stagger delay in milliseconds (120ms)

        // Check if the class is already added to prevent re-adding styles/delay
        if (!card.classList.contains("visible")) {
          card.style.transitionDelay = `${delay}ms`;
          card.classList.add("visible");
        }

        observer.unobserve(card); // Stop observing once animated
      }
    });
  };

  const cardObserver = new IntersectionObserver(
    observerCallback,
    observerOptions
  );

  toolCards.forEach((card) => {
    cardObserver.observe(card);
  });

  // --- Smooth scrolling for internal links ---
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start", // Adjust scroll position if needed ('center', 'end')
        });
        // Optional: Update URL hash without page jump after scroll
        // setTimeout(() => { history.pushState(null, null, targetId); }, 1000); // Delay might need adjustment
      }
    });
  });
});
