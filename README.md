# Serra Bilişim — Kurumsal Web Sitesi

Saf HTML/CSS/JS ile yapılmış, ürün odaklı kurumsal site. Framework yok, build adımı yok.
Yayında: https://serrabilisim.com

## Dosyalar
- `index.html` — sayfa içeriği (ürünler, hizmetler, hakkımızda, iletişim)
- `styles.css` — tasarım, açık/koyu tema ve ürün arayüz mockup'ları
- `script.js` — tema geçişi, mobil menü, reveal animasyonları, metrik sayaçları
- `CNAME` — özel alan adı (serrabilisim.com)
- `.nojekyll` — GitHub Pages'in Jekyll işlemesini atlaması için

## Ürünler
Ürün bölümü `index.html` içindeki `<div class="products">` altında,
her ürün bir `<article class="pcard">` olarak duruyor.

Sıra: **Panora** (öne çıkan, `pcard--feature`), Serra Bordro, Serra Banka,
Serra Üretim, SAWBot, Serra e-Dönüşüm.

**Yeni ürün eklemek:** mevcut bir `pcard`'ı kopyala, şunları değiştir:
- `style="--p:#RENK"` — ürünün vurgu rengi (tüm mockup öğeleri bu rengi kullanır)
- `pcard--rev` sınıfı — görselin sağa mı sola mı geleceğini belirler (sırayla ekle)
- `pcard__kicker`, `h3`, `p`, `pcard__feats` ve `tags` içeriği
- `pcard__visual` içindeki mockup

**Görseller:** ürün ekranları şu an CSS/SVG ile çizilmiş mockup'lar
(`.mock`, `.phone`, `.kpis`, `.bars`, `.gantt`, `.rows`, `.chips` vb.).
Gerçek ekran görüntüsü koymak istersen `pcard__visual` içeriğini
`<img src="assets/urun.png" alt="..." />` ile değiştirmen yeterli.

## Yerelde açmak
`index.html` dosyasına çift tıkla — tarayıcıda açılır. Kurulum gerekmez.

## Yayınlama (GitHub Pages)
Depo **public** olmalı, site kaynağı deponun kökü.

Depo → **Settings → Pages → Build and deployment → Source: Deploy from a branch**
→ Branch: `main`, klasör: `/ (root)` → **Save**.

Her `git push` sonrası site birkaç dakika içinde güncellenir.
