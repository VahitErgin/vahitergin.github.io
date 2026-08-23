/* =========================================================
   Serra Bilişim — site betikleri
   ========================================================= */

/* ---------------------------------------------------------
   Cloudflare Web Analytics — site token'ı
   dash.cloudflare.com > Analytics & Logs > Web Analytics >
   Add a site > JS snippet içindeki "token" değeri buraya yazılır.
   Boş bırakıldığı sürece hiçbir ölçüm kodu yüklenmez.

   Çerez kullanmaz, parmak izi çıkarmaz, kişisel veri toplamaz —
   bu yüzden çerez rızası banner'ına gerek yoktur.
   --------------------------------------------------------- */
const CLOUDFLARE_ANALYTICS_TOKEN = "79bc7bf30f7c4d0fa1f26ef336e6fa87";

(function () {
  if (!CLOUDFLARE_ANALYTICS_TOKEN) return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN }));
  document.head.appendChild(s);
})();

// ===== Tema (açık/koyu) =====
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ===== Nav gölgesi (scroll) =====
(function () {
  const nav = document.getElementById("nav");
  if (!nav) return;
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// ===== Mobil menü =====
(function () {
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  if (!burger || !links) return;

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
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
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
  items.forEach((el) => observer.observe(el));
})();

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
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
