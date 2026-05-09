Design a mobile recipe app called "LEZZET" with Modern Maximalism & Playful Pop-Art style. Use a bold, energetic color system: Primary Orange #FF6B00, Action Green #00C853, Alert Red #FF1744, with Dark Charcoal #1A1A2E for outlines. All cards and buttons must have thick 3px dark outlines + offset box-shadows (5px 5px 0 #1A1A2E) for a tactile, pressable feel. Background: warm cream #FFF8F0 with subtle organic silhouettes (leaves, fruit outlines) at 6% opacity. Font pairing: Righteous (headers/display) + Nunito 900 (body/labels).

Design these 7 screens for a 375×812px (iPhone 14) frame:

---

SCREEN 1 — DISCOVER (Swipe Feed)
Data context: 605 total recipes across 14 categories.
- Dark header bar with app logo and an Orange streak/badge counter
- Hero swipe card: 340×220px, border-radius 28px, 3px dark border, 6px offset shadow, full-bleed food photo with dark gradient overlay
- LEFT edge: pulsing RED neon badge "✕ Geç" (neon glow: 0 0 20px #FF1744)
- RIGHT edge: pulsing GREEN neon badge "✓ Kaydet" (neon glow: 0 0 20px #00C853)
- Card shows: recipe name in Righteous 20px white, 2–3 category chips (frosted glass style)
- Below hero: 3 mini-cards in a row (90px tall, same outline style) for quick category jumps
- Swipe progress dots below hero card

---

SCREEN 2 — CATEGORIES
Data context: exactly 14 categories. Top 4 by count: Dessert (128), Vegetarian (82), Beef (79), Seafood (70). Smallest: Goat (2), Starter (6), Vegan (7).
- 2-column grid of category cards
- Each card: border-radius 22px, 3px dark border, 5px offset shadow, min-height 110px
- Color assignments: Dessert → Orange #FF6B00, Vegetarian → Green #00C853, Beef → Red #FF1744, Seafood → Teal #00BCD4, Chicken → Amber #FF9A3C, Pork → Purple #7C4DFF
- Each card: large emoji illustration (40px), category name in Righteous white 15px, recipe count in small white label
- Decorative duplicate emoji at bottom-right of each card, rotated –15°, opacity 22%
- Top 4 cards shown prominently; "Daha Fazla" expansion row for remaining 10

---

SCREEN 3 — RECIPE DETAIL
Data context: avg recipe has 10.6 ingredients (max 20). Instructions avg 1,000 chars = ~4–8 steps.
- Hero image: 375×180px with orange-to-red diagonal gradient overlay
- Top-right badge in Red: "⏱ 35 dk" (cooking time)
- Recipe title: Righteous 22px in Orange #FF6B00
- 3 meta pills (pill shape, 2px dark border): Red pill "⏱ 35 dk", Orange pill "👥 4 kişi", Green pill "★ Kolay"
- Ingredients section title in Orange; each ingredient as a green-tinted row (#E0FFF0 bg, 2px green border, border-radius 14px) with a bold green checkmark ✓, ingredient name bold, amount muted right-aligned
- Instructions shown as numbered steps (NOT full text block) — split by step markers
- Large Orange CTA button at bottom: "Pişirmeye Başla 🍳", border-radius 22px, 3px dark border, 4px offset shadow, full width

---

SCREEN 4 — AI INGREDIENT CHEF (RAG)
Data context: ingredients stored in strIngredient1–strIngredient20 fields. Matching logic: normalize to lowercase, use substring match, score = matched/total ingredients, show results with score ≥ 40%.
- Dark background #1A1A2E
- Animated robot mascot: 72×72px orange rounded-square face with emoji chef hat, subtle bounce animation
- Speech bubble from robot: "Elindeki malzemeleri seç, sana tarif bulayım!" (rounded bubble, white bg, dark border)
- Ingredient selection as interactive bubbles: unselected = dark outline on dark bg; selected = filled Orange with white text + scale-up animation
- Sample bubbles: Domates, Sarımsak, Tavuk, Limon, Soğan, Zeytinyağı, Un, Yumurta (at least 8 visible)
- Selected count badge: "3 malzeme seçildi"
- Orange CTA button: "Tarif Bul ✨", full width, same outline+shadow style
- Result cards below: show recipe name, "X/Y malzeme eşleşti", match percentage bar in green

---

SCREEN 5 — SEARCH & FILTER
Data context: 37 unique cuisine origins (strArea). Top: British (59), Spanish (48), Turkish (30), French (28). Note: area names are inconsistent (mix of adjective and country name forms — normalize for display).
- Warm cream background
- Search bar: full-width, rounded pill shape, 3px dark border, Orange focus ring
- "Popüler Aramalar" tag cloud: randomized sizes (12–16px), each tag a colored rounded pill with 2px dark border. Colors cycle: Orange, Green, Red, Teal, Purple, Amber
- Cuisine filter section: horizontal scroll chips. Show top 8 by count with recipe count in small text. Active chip: filled Orange. Remaining 29 behind "+ 29 daha" chip.
- Filter chips must be multi-selectable (OR logic)
- Category chips below: same design, 14 categories, all visible or scrollable
- Result count: "248 tarif bulundu" in bold

---

SCREEN 6 — FAVORITES (Pinboard)
- "Pinboard" / cork-board aesthetic
- Background: warm cream with subtle dot-grid pattern
- Recipe cards pinned at slight random rotations (–3° to +3°): polaroid-style white cards with food photo, recipe name, category chip
- Cards overlap slightly, different sizes (some featured larger)
- Each card has a colored pushpin graphic at top center
- Empty state: large illustrated empty board with "Henüz favori yok — tarif keşfet!" message and Orange CTA

---

SCREEN 7 — PROFILE (Dynamic Level)
- Three cooking level states, each with distinct color theme:
  · Çaylak (Beginner) → Green #00C853 theme
  · Şef (Chef) → Orange #FF6B00 theme  
  · Gurme (Gourmet) → Red #FF1744 theme
- Avatar: large circular photo with thick colored border matching level (6px, level color)
- Level badge below avatar: pill shape, level-colored bg, white Righteous text
- XP progress bar: level-colored fill, dark outline, border-radius pill, showing e.g. "1,240 / 2,000 XP"
- Stats grid (2×2): cards showing "Pişirilen", "Favori", "Rozet", "Seri" with large numbers
- Achievement badges row: circular icons, earned ones colored, unearned ones grayed out
- Settings gear icon top-right

---

GLOBAL DESIGN TOKENS:
- Border: 3px solid #1A1A2E on interactive cards/buttons
- Shadow: 5px 5px 0 #1A1A2E (offset, no blur — hard shadow)
- Active/hover state: transform translate(–2px, –2px), shadow increases to 7px 7px 0
- Press state: transform translate(2px, 2px), shadow reduces to 2px 2px 0
- Border-radius scale: pills 20px, cards 22–28px, buttons 22px
- All text on colored fills: use darkest shade of same color family (never black)
- Organic background motifs: leaf and fruit silhouettes at 6% opacity, scattered
  