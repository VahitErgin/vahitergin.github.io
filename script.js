// ===== Tema (açık/koyu) =====
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ===== Nav gölgesi (scroll) =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobil menü =====
(function () {
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");

  const close = () => {
    links.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
})();

// ===== Reveal animasyonu =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Metrik sayaçları =====
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nums = document.querySelectorAll(".metrics strong[data-count]");
  if (!nums.length || reduce) return;

  const counter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counter.unobserve(entry.target);

        const el = entry.target;
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const duration = 1100;
        const start = performance.now();

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        el.textContent = "0" + suffix;
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.5 }
  );

  nums.forEach((el) => counter.observe(el));
})();

// ===== Yıl =====
document.getElementById("year").textContent = new Date().getFullYear();
