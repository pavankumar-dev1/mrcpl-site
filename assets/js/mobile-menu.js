(() => {
  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("primary-navigation");
  if (!button || !menu) return;

  const closeMenu = (restoreFocus = false) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    button.classList.remove("is-open");
    menu.classList.remove("is-open");
    if (restoreFocus) button.focus();
  };

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    button.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("header.site") && button.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 1101px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
})();
