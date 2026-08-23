/* =========================================================
   Serra Bilişim — site betikleri
   ========================================================= */

/* ---------------------------------------------------------
   LinkedIn Insight Tag — Partner ID
   Campaign Manager > Analiz > Insight Etiketi ekranından alınır.
   Doldurulmadığı sürece hiçbir ölçüm kodu yüklenmez.
   --------------------------------------------------------- */
const LINKEDIN_PARTNER_ID = ""; // örn: "1234567"

/* Dönüşüm takibi (opsiyonel).
   Campaign Manager > Analiz > Dönüşümler ekranından her biri için
   bir dönüşüm oluşturup ID'sini buraya yazın. Boş bırakılırsa
   ilgili tıklama izlenmez. */
const LINKEDIN_CONVERSIONS = {
  email: "", // "Demo talep et" / e-posta tıklaması
  phone: "", // telefon tıklaması
};

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

/* =========================================================
   ÇEREZ RIZASI (KVKK) + LinkedIn Insight Tag
   Ölçüm kodu YALNIZCA kullanıcı açıkça kabul ettiğinde yüklenir.
   ========================================================= */
(function () {
  const KEY = "serra-cerez-rizasi"; // "kabul" | "ret"
  const banner = document.getElementById("consent");
  let loaded = false;

  const read = () => {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null; // gizli sekme / depolama kapalı
    }
  };
  const write = (v) => {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {
      /* yoksay */
    }
  };

  // --- LinkedIn Insight Tag ---
  function loadInsightTag() {
    if (loaded || !LINKEDIN_PARTNER_ID) return;
    loaded = true;

    window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

    if (!window.lintrk) {
      window.lintrk = function (a, b) {
        window.lintrk.q.push([a, b]);
      };
      window.lintrk.q = [];
    }

    const s = document.getElementsByTagName("script")[0];
    const b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  }

  // --- CTA tıklamalarını dönüşüm olarak işaretle ---
  function trackConversions() {
    const hit = (id) => {
      if (id && window.lintrk) window.lintrk("track", { conversion_id: id });
    };
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='mailto:'], a[href^='tel:']");
      if (!a) return;
      hit(a.getAttribute("href").startsWith("mailto:") ? LINKEDIN_CONVERSIONS.email : LINKEDIN_CONVERSIONS.phone);
    });
  }

  function accept() {
    write("kabul");
    hideBanner();
    loadInsightTag();
    trackConversions();
  }
  function reject() {
    write("ret");
    hideBanner();
  }
  function hideBanner() {
    if (banner) banner.classList.remove("is-open");
  }
  function showBanner() {
    if (banner) banner.classList.add("is-open");
  }

  // Mevcut tercihi uygula
  const saved = read();
  if (saved === "kabul") {
    loadInsightTag();
    trackConversions();
  } else if (saved !== "ret") {
    showBanner();
  }

  if (banner) {
    const ok = document.getElementById("consentAccept");
    const no = document.getElementById("consentReject");
    if (ok) ok.addEventListener("click", accept);
    if (no) no.addEventListener("click", reject);
  }

  // Footer'daki "Çerez tercihleri" bağlantısı — kararı yeniden sorar
  document.querySelectorAll("[data-consent-reopen]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showBanner();
    });
  });
})();

// ===== Yıl =====
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
