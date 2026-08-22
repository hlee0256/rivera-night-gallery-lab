# BRIEF — RIVERA 2.0 TOTAL TRANSFORMATION (read this first)

You are one of three competing studios. A demanding client wants his boutique Melbourne
property site **completely transformed** — not improved, TRANSFORMED. He will open the page
and if he recognizes the old site, you failed. Your concept competes against two other
studios. The winner gets built out across the whole site.

## Hard identity (the ONLY things you must keep)
- Brand word: **RIVERA** (you may style it differently, add a Vietnamese sub-brand line, but the word stays)
- Brand color DNA available: warm near-black `#0E0B08`, espresso `#1B130D`, brown `#7A4E2D`, clay `#9A6A41`, champagne tan `#C9A982`, sand `#E6DACA`, cream paper `#F4F0E9`
- Fonts allowed: Manrope + Instrument Serif (EN accent) + Cormorant Garamond (VI accent), via Google Fonts link
- Contact facts (do not invent others): info.riveraau@gmail.com · VN +84 782 067 555 · AUS +61 450 151 686
- Form posts to the same Google Apps Script endpoint as v1 (copy from `app.js` FORM_ENDPOINT)

## Everything else MUST be different from v1
New layout grammar, new section order, new components, new motion language, new copy.
Do NOT reuse: the old hero formula, old card grids, old eyebrow+h2+p patterns as-is,
old nav layout, old footer structure. If a section feels familiar, rebuild it differently.

## Assets you can use (all exist locally, relative paths from index.html location)
- `images/<project>/…` for: aura-melbourne-square, collins-wharf-aluna, collins-wharf-ancora,
  671-chapel-street, 380-melbourne, piccolo-house, aspire (each has exterior*, interior,
  amenities, hero-poster.jpg, some hero.mp4)
- Local videos: `images/aura-melbourne-square/hero-cut.mp4`, plus hero.mp4 in several folders
- You may ALSO hotlink free stock media (Unsplash/Pexels direct URLs) for texture/atmosphere
  shots that local photos lack. Never let a stock photo pretend to be a specific project —
  use stock only for mood/texture/city shots, label nothing fake.
- Self-written canvas/SVG/CSS effects encouraged (grain, particles, WebGL-ish vibes without libs).
  If you use a CDN lib, the page must still work with the lib failing.

## Vietnamese copy — THE CLIENT IS SCREAMING ABOUT THIS
The old copy reads like translated-by-AI Vietnamese ("Kiến tạo những không gian sống xứng đáng
với sự chờ đợi của bạn"). Write like a sharp Vietnamese person actually talks about beautiful
homes. Rules:
- Short sentences. Punchy. Confident. A little poetic but never purple.
- NO calques from English. Draft the thought in Vietnamese first.
- Kill these AI-smell words: tinh tuyển, kiệt tác, tận tâm (overused), nâng tầm, đẳng cấp,
  sang trọng (show it instead), "không gian sống" as a crutch.
- Good vibe examples of the register (do not copy verbatim, absorb the tone):
  - "Nhà đẹp thì nhiều. Nhà hợp thì hiếm."
  - "Bảy dự án. Không hơn. Chúng tôi chỉ bán những gì mình tự đi xem."
  - "Mua nhà là chuyện lớn. Hỏi người đã đi hết con đường ấy."
- Every visible string: `data-en` + `data-vi` on leaf elements, VI is source, then natural EN.
  Placeholders use data-en-ph/data-vi-ph. Counts must balance.
- No em-dash anywhere in visible copy. Use "." or "·".

## Tech contract
- ONE self-contained `index.html` per studio (inline <style> + inline <script>). No local css/js deps.
- VI default language, toggle button EN/VI, persists via localStorage key `rivera-lang`.
- Works from file:// with no server. All local image paths relative and correct.
- Motion: bold but buttery. Honor prefers-reduced-motion (content visible, animation off).
- Page must be complete and readable even if JS dies halfway (don't gate core content behind JS-only opacity unless html class-gated).
- Mobile must genuinely work (test your breakpoints mentally: 380px, 768px, 1200px).
- Target: wow within 3 seconds of load. One signature moment minimum.

## Facts about the practice (for honest copy)
Boutique Melbourne property practice. ~10 years. 100+ families, 50+ suburbs. 7 real projects
(see images/). They personally inspect every property. Off-the-plan and completed apartments.
Audience: high-end buyers, many Vietnamese-speaking. Tone: quiet confidence, never salesy,
no exclamation marks.

## Deliverable
Write exactly one file: `index.html` inside your assigned folder. Then reply with:
(a) concept name + one-line organizing idea, (b) your signature moment, (c) any risks.
