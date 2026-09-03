(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var menuButton = document.getElementById("nav-menu");
  var mobileMenu = document.getElementById("mobile-menu");
  var navLinks = document.querySelectorAll(".nav__link");
  var sections = Array.from(document.querySelectorAll("main section[id]"));
  var activeId = "";

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
    document.body.style.overflow = "hidden";
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      if (mobileMenu.hidden) openMenu();
      else closeMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: reduced.matches ? "auto" : "smooth",
        block: "start"
      });
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });

  function updateActiveNav() {
    var y = window.scrollY + 160;
    var next = "";
    for (var i = 0; i < sections.length; i += 1) {
      if (sections[i].offsetTop <= y) next = sections[i].id;
    }
    if (next === activeId) return;
    activeId = next;
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("is-active", !!(href && href.slice(1) === activeId));
    });
  }

  var scrollTick = 0;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollTick) return;
      scrollTick = requestAnimationFrame(function () {
        scrollTick = 0;
        updateActiveNav();
      });
    },
    { passive: true }
  );
  updateActiveNav();

  if (!reduced.matches && "IntersectionObserver" in window) {
    var reveals = document.querySelectorAll(".section");
    reveals.forEach(function (el) {
      el.classList.add("reveal");
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

})();
