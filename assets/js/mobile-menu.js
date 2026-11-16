(() => {
  document.querySelectorAll(".mobile-menu").forEach((details) => {
    const summary = details.querySelector(".menu-toggle");
    const menu = details.querySelector(".site-nav");
    if (!summary || !menu) return;

    const syncState = () => {
      summary.setAttribute("aria-label", details.open ? "Close navigation menu" : "Open navigation menu");
      summary.classList.toggle("is-open", details.open);
      menu.classList.toggle("is-open", details.open);
    };

    details.addEventListener("toggle", syncState);
    syncState();

    const closeMenu = (restoreFocus = false) => {
      details.open = false;
      syncState();
      if (restoreFocus) summary.focus();
    };

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && details.open) closeMenu(true);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("header.site") && details.open) closeMenu();
    });

    window.matchMedia("(min-width: 1101px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  });
})();
