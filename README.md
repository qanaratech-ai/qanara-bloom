# Qanara Bloom

Qanara Tech — AgTech Platform Frontend Build Prompt
Build a production-ready, bilingual (English/Arabic with RTL support) frontend for Qanara Tech, an AI-powered pest detection and integrated pest management (IPM) platform for greenhouse farmers globally, with specialized focus on the MENA region (Israel, Palestine, Saudi Arabia, UAE, Egypt). The frontend will later be connected to external APIs — build it so all data-fetching is easy to swap from mock data to real API calls.

Tech Stack
Vite + React 18 + TypeScript
Tailwind CSS v3 + shadcn/ui components
React Router v6 (BrowserRouter)
@tanstack/react-query for data fetching
Recharts for data visualization
lucide-react for icons
Fonts: Inter (Google Fonts)
Design System (index.css + tailwind.config.ts)
Use semantic HSL design tokens — never hardcoded colors in components.

Brand palette (inspired by a teal + olive-green leaf logo):

Primary: Deep Teal hsl(190 60% 26%) (light) / hsl(190 60% 36%) (dark)
Secondary: Olive Green hsl(110 22% 33%) (light) / hsl(110 22% 43%) (dark)
Accent: Amber hsl(38 92% 50%)
Success: Emerald hsl(160 84% 39%)
Destructive: Red hsl(0 84% 60%)
Background: hsl(210 20% 98%) (light), hsl(220 30% 8%) (dark)
Sidebar background: hsl(190 60% 22%) with white foreground
Gradients (as CSS variables):

--gradient-hero: linear-gradient(135deg, hsl(190,60%,26%) 0%, hsl(110,22%,33%) 100%)
--gradient-primary, --gradient-success — similar pattern
Custom utilities: .text-gradient, .bg-gradient-hero, .animate-float, .animate-fade-in, .animate-slide-up, .animate-pulse-slow

Custom shadows: shadow-card, shadow-card-hover, shadow-glow, shadow-glow-lg

Border radius: --radius: 0.75rem

Custom button variants: default, outline, ghost, secondary, success, destructive, hero (gradient), hero-outline (glass), link

Custom badge variants: default, secondary, destructive, success, warning, outline

Custom keyframes needed:

scanLine — 0% top:0 → 100% top:100% (scanning line for camera feed)
slideUp, fadeIn, slideInLeft, float
Pages & Routes
/                        - Landing page (Index)
/login                   - Login page
/signup                  - Signup page
/demo                    - Interactive product demo
/dashboard               - Main farmer dashboard (layout wrapper)
  /dashboard/detections
  /dashboard/recommendations
  /dashboard/sustainability
*                        - NotFound (404)
Bilingual Support (English / Arabic)
Create src/contexts/LanguageContext.tsx with:

LanguageProvider wrapping the app inside App.tsx
useLanguage() hook returning { language, setLanguage, t, dir }
Persist language choice in localStorage (read inside useEffect, NOT in useState initializer — avoids hydration errors)
On language change: set document.documentElement.dir = 'rtl' | 'ltr' and lang attribute
All landing page copy must go through t('key') translation function
A LanguageSwitcher component in the navbar toggles between EN / العربية with a Languages icon
Arrow icons (like ArrowRight) should get rotate-180 in RTL mode
Landing Page (/) Sections
Navbar (fixed, backdrop-blur): Logo image + nav links (Home, Features, Pricing, About) + LanguageSwitcher + Sign In + Get Started button. Full mobile menu with hamburger.
Hero (min-h-90vh with greenhouse background image + gradient overlay): Badge, big headline with gradient highlight span, subheadline, "Start Free Trial" + "Watch Demo" CTAs
Stats row (4 cards): "30-40% Chemical Reduction", "7-14 Days Earlier Detection", "10x More Affordable", "100% Blockchain Verified"
Features grid (6 cards): Early Pest Detection, IPM Recommendations, Biocontrol Marketplace, Blockchain Tracking, Analytics & Reports, Global Coverage (worldwide with MENA specialization — do NOT phrase as MENA-only)
Pricing comparison (2 cards side-by-side): Competitors $15,000 vs Qanara $2,500 with feature checklists
CTA banner (gradient-hero bg with SVG pattern overlay)
Footer with logo
Demo Page (/demo) — 5 Tabs
Tabbed interface with Tabs component from shadcn:

Dashboard tab — Mock farm metrics cards, recent detections list
Detection tab — Simulated live camera feed:
HTML5 <video autoplay loop muted playsinline> element with a real greenhouse whitefly video in /public/videos/whitefly-detection.mp4
Overlay elements (all pointer-events-none):
Top-left: red pulsing Siren icon + "⚠ PEST DETECTED" badge + confidence badge "Whitefly • Conf: 94.7%"
Top-right: mono-font stats stack: FPS: 30, Detections: 3, Zone: A-02
Animated horizontal scanLine sweeping vertically
Bottom-left: REC badge with pulsing red dot + live new Date().toLocaleTimeString()
Bottom-right: green "AI Model: Active" badge
Detection Timeline card (right column) with 5 timestamped events
4 stat cards below: AI Confidence 85%, Detection Time 0.3s, Pests Today 12, Accuracy 98%
IPM Recommendations tab — Whitefly recommendation card with 2 treatment options ONLY (no chemical option):
Option 1: Release Encarsia formosa — Biocontrol, $45, 5-7 days, 92% efficacy, videoId: "hphQq8TIIA4"
Option 2: Install yellow sticky traps — Cultural, $15, Immediate, 60% efficacy, videoId: "hd1mz0cbVbo"
Each option has "Apply" button that opens PestInfoModal
Marketplace tab — Product cards for beneficial insects (Encarsia formosa, Phytoseiulus persimilis, Trichoderma harzianum) with prices, ratings, stock status
Sustainability tab — Score circle (72/100), certifications, chemical reduction and biocontrol usage progress bars, blockchain verified stats
PestInfoModal component (src/components/demo/PestInfoModal.tsx) — Dialog opened when clicking "Apply" on any IPM option:

Pest data record with scientificName, description, symptoms[], affectedPlants[], damageType, spreadRate, yieldImpact for Whitefly (Bemisia tabaci), Thrips, Botrytis
Sections: pest overview, symptoms list, affected crops badges, treatment summary
Application Guide section: if treatment.videoId exists, embed YouTube iframe https://www.youtube.com/embed/{videoId}?rel=0
Dashboard Layout
Fixed left sidebar (256px wide, teal bg-sidebar, white text) with:
Logo image at top (use brightness-0 invert to make dark logo appear white on teal)
Nav items: Dashboard, Detections, IPM Recommendations, Biocontrol, Sustainability, Analytics, Settings
Sign Out link at bottom
Top header (h-16): Farm selector button ("Al-Khalil Greenhouse" with green dot), notification bell with count badge, user avatar
Mobile: sidebar becomes a Sheet drawer triggered by hamburger
Dashboard Page (/dashboard) — Rich Charts
Use Recharts wrapped with shadcn's ChartContainer. Include:

4 metric cards — Detections Today, Threat Level, Active Cameras, Sustainability Score
Weekly Detection Trends — AreaChart with gradient fills (detections vs resolved)
Pest Distribution — PieChart (donut, innerRadius 60, outerRadius 90) with 5 pest slices using hsl(var(--chart-1..5))
Environmental Conditions — LineChart with dual Y-axis (temperature/humidity left, light lux right), 3 stat tiles above (temp, humidity, light)
Monthly Performance — BarChart (detections + treatments grouped bars)
Greenhouse Health — Custom progress bars for 4 greenhouses
Recent Detections list + Active Recommendations sidebar
Quick Actions grid — 4 outline buttons
Detections Page (/dashboard/detections)
Filter bar: search + selects for pest/camera/threat level
Detection table with columns: Date/Time, Camera, Pest Species, Confidence (with progress bar), Threat (badge), Status, Actions
4 summary cards at top showing High/Medium/Low threat counts + Active Cameras
Recommendations Page (/dashboard/recommendations)
Full IPM recommendations page with cards showing pest, action, cost/timeline/success rate, alternatives, apply/dismiss buttons.

Sustainability Page (/dashboard/sustainability)
6 tabs: Overview, Achievements, Chemical Log, Carbon Footprint, UN SDG Impact, Export

Big sustainability score card with 4-metric breakdown (chemical/carbon/biocontrol/water)
Impact metrics: pesticide avoided, beneficial insects released, CO₂ saved, cost savings
6-month progress trend with score/chemicals/biocontrol bars
Achievements cards (completed + in-progress with progress bar)
Chemical log entries with organic badges
Carbon breakdown with progress bars + carbon offset initiatives (tree planting, solar, recycling)
UN SDG contribution cards (goals 2, 12, 13, 15)
Export tab: Monthly report PDF, blockchain certificate, shareable link
Login / Signup
Split-screen: form on one side, gradient-hero panel with logo animation + step list on the other. Signup collects: name, email, phone, country (dropdown: Palestine, Israel, Saudi Arabia, UAE, Egypt), password. Both currently link to /dashboard (wire to real auth API later).

API Integration Points (for your backend hookup)
Wrap all data fetching in @tanstack/react-query hooks so mock data can be swapped for real API calls in one place. Create src/lib/api.ts with typed fetch wrappers. Key endpoints your backend should expose:

POST /auth/login, POST /auth/signup, POST /auth/logout, GET /auth/me
GET /farms, GET /farms/:id/metrics (dashboard cards)
GET /detections (with filters: pest, camera, threat, dateRange, search), POST /detections/:id/dismiss
GET /cameras, GET /cameras/:id/stream
GET /recommendations, POST /recommendations/:id/apply
GET /marketplace/products, POST /marketplace/orders
GET /sustainability/score, GET /sustainability/chemicals, POST /sustainability/chemicals, GET /sustainability/carbon, GET /sustainability/certificate
GET /analytics/detections/weekly, GET /analytics/pests/distribution, GET /analytics/environmental, GET /analytics/monthly
WebSocket or SSE endpoint for real-time detections + alerts
Add a .env with VITE_API_BASE_URL and read via import.meta.env.VITE_API_BASE_URL.

SEO / Meta
Set in index.html:

<title>Qanara Tech | AI-Powered Pest Detection for Greenhouse Farming</title>
Description, keywords, OG tags, Twitter card
Import Inter font from Google Fonts
Assets Needed
Logo image (teal "Q" + olive leaf mark) at src/assets/qanara-logo.png — use across Navbar, Dashboard sidebar, Footer
Hero greenhouse image at src/assets/hero-greenhouse.jpg
Real greenhouse whitefly demo video at /public/videos/whitefly-detection.mp4
Non-Negotiable Rules
Use only semantic Tailwind tokens (bg-primary, text-foreground, etc.) — no bg-[#...] or text-white
Every page mobile-responsive
RTL layout must actually flip (arrows, absolute positions, gradients direction)
Language state persisted, initialized safely inside useEffect
Keep components small and focused; extract shared bits into src/components/
Build all pages, wire up routing, seed with realistic Arabic + English mock data, and use react-query with mock fetchers so I can drop in my real API URLs by editing one config file.
consider the attached screens for the backend APIs

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/38dfee09-f68d-4ad6-9492-d9e802eec6e0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
