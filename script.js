(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var menuButton = document.getElementById("nav-menu");
  var mobileMenu = document.getElementById("mobile-menu");
  var navLinks = document.querySelectorAll(".nav__link");
  var sections = Array.from(document.querySelectorAll("main section[id]"));
  var activeId = "";
  var scrollTick = 0;

  function closeMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
    document.body.classList.remove("is-locked");
  }

  function openMenu() {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
    mobileMenu.hidden = false;
    document.body.classList.add("is-locked");
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
    var next = "";
    for (var i = 0; i < sections.length; i += 1) {
      if (sections[i].getBoundingClientRect().top <= 160) next = sections[i].id;
    }
    if (next === activeId) return;
    activeId = next;
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("is-active", !!(href && href.slice(1) === activeId));
    });
  }

  var navProgress = document.getElementById("nav-progress");
  var spinePath = document.getElementById("spine-path");
  var spineNodes = Array.from(document.querySelectorAll(".spine__node"));
  var stations = [];
  var lastNode = "";

  function collectStations() {
    stations = [];
    var hero = document.getElementById("hero");
    var approach = document.getElementById("approach");
    var write = document.getElementById("write");
    if (hero) stations.push({ name: "intake", el: hero });
    document.querySelectorAll(".chapter[data-node]").forEach(function (el) {
      stations.push({ name: el.getAttribute("data-node"), el: el });
    });
    if (approach) stations.push({ name: "bound", el: approach });
    if (write) stations.push({ name: "write", el: write });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setProgress(progress) {
    if (navProgress) {
      navProgress.setAttribute("width", String((progress * 100).toFixed(2)));
    }
    if (spinePath) {
      spinePath.setAttribute("stroke-dashoffset", String((1 - progress).toFixed(4)));
    }
  }

  function setActiveNode(name) {
    if (name === lastNode) return;
    lastNode = name;

    var activeIndex = -1;
    for (var i = 0; i < spineNodes.length; i += 1) {
      if (spineNodes[i].getAttribute("data-node") === name) activeIndex = i;
    }

    spineNodes.forEach(function (node, index) {
      node.classList.toggle("is-active", index === activeIndex);
      node.classList.toggle("is-done", activeIndex > -1 && index < activeIndex);
    });

    stations.forEach(function (station) {
      var on = station.name === name;
      station.el.classList.toggle("is-active", on);
      if (on) station.el.setAttribute("aria-current", "true");
      else station.el.removeAttribute("aria-current");
    });
  }

  function updateWorkflow() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var progress = max > 0 ? window.scrollY / max : 0;
    setProgress(clamp(progress, 0, 1));

    if (!stations.length) return;

    var line = window.innerHeight * 0.42;
    var current = stations[0].name;
    for (var i = 0; i < stations.length; i += 1) {
      var top = stations[i].el.getBoundingClientRect().top;
      if (top <= line) current = stations[i].name;
    }
    setActiveNode(current);
  }

  function onScroll() {
    if (scrollTick) return;
    scrollTick = requestAnimationFrame(function () {
      scrollTick = 0;
      updateActiveNav();
      if (!reduced.matches) updateWorkflow();
    });
  }

  collectStations();

  if (reduced.matches) {
    if (spinePath) spinePath.setAttribute("stroke-dashoffset", "0");
    spineNodes.forEach(function (node) {
      node.classList.add("is-done");
      node.classList.remove("is-active");
    });
    stations.forEach(function (station) {
      station.el.classList.add("is-active");
      station.el.removeAttribute("aria-current");
    });
  } else {
    updateWorkflow();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
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
