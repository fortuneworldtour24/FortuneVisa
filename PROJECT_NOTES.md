# Fortune Visa Services — Project Notes

## 1. Tech Stack

- **Framework & Core:** React 18.3.1, TypeScript 5.5.3, Vite 7.3.7 (`@vitejs/plugin-react` 5.1.1)
- **Routing:** React Router DOM 7.18.5
- **Styling:** Tailwind CSS 3.4.1, PostCSS 8.4.35, Autoprefixer 10.4.18
- **Icons & UI:** Lucide React 0.446.0
- **Forms & Validation:** React Hook Form 7.92.0, `@hookform/resolvers` 7.0.6, Zod 4.6.7
- **Backend / Database:** Supabase (`@supabase/supabase-js` 2.57.4)
- **Internationalization:** i18next 27.1.0, react-i18next 18.0.1
- **Content Rendering & Sanitization:** Marked 18.2.0, DOMPurify 3.4.17 (`@types/dompurify` 3.0.5)
- **Linting & Tooling:** ESLint 9.9.1, `typescript-eslint` 8.3.0, `eslint-plugin-react-hooks` 5.1.0-rc.0

---

## 2. Routes

All routes are defined in `src/App.tsx` and wrapped in `src/components/Layout.tsx`:

| Route Path | Page Component | Status / Notes |
|------------|----------------|----------------|
| `/` | `HomePage` | Finished. Hero search card, trust strip, popular destinations, how it works, testimonials, FAQ, CTAs. |
| `/destinations` | `DestinationsPage` | Finished. Destination search by country, visa type filter chips, responsive cards. |
| `/destinations/:country` | `DestinationDetailPage` | Finished. Detailed view of country visa categories, fees, processing times, validity, and enquiry link. |
| `/checker` | `CheckerPage` | Finished. Passport nationality, destination, visa category selector; calculates requirements & prefilled enquiry CTA. |
| `/services` | `ServicesPage` | Finished. 7 visa categories with descriptions, enquiry links, and document checklist teaser. |
| `/checklist` | `ChecklistPage` | Finished. Interactive document checklist with progress persistence in `localStorage` and print stylesheet. |
| `/blog` | `BlogListPage` | Finished. Fetches published posts from Supabase `posts` table, category filter, read time estimation. |
| `/blog/:slug` | `BlogPostPage` | Finished. Renders markdown content via `marked` + `dompurify`, related posts recommendations. |
| `/contact` | `ContactPage` | Finished. Office address, phone, email, hours cards, plus interactive `EnquiryForm` with Supabase submission. |
| `/privacy` | `SectionPage` (`privacy`) | Placeholder. Displays `PlaceholderPage` ("Coming Soon"). |
| `/terms` | `SectionPage` (`terms`) | Placeholder. Displays `PlaceholderPage` ("Coming Soon"). |
| `*` | *(Missing)* | No catch-all 404 route is configured in `App.tsx`. |

---

## 3. Folder Structure

```
FortuneVisa/
├── .bolt/                             # Bolt.new platform metadata
├── .git/                              # Git version control
├── supabase/
│   ├── seed_posts.sql                 # Seed SQL with 3 Australian visa tip articles
│   └── migrations/
│       ├── 20261110085845_create_enquiries_table.sql
│       ├── 20261112041634_20261112000000_add_travel_date_and_consent_to_enquiries.sql.sql
│       └── 20261112043036_20261112050000_create_posts_table.sql.sql
├── src/
│   ├── components/
│   │   ├── contact/
│   │   │   └── EnquiryForm.tsx        # React Hook Form + Zod + Supabase insert + honeypot
│   │   ├── destinations/
│   │   │   ├── DestinationCard.tsx    # Country card with flags, visa types, fees
│   │   │   └── VisaTypeFilter.tsx     # Filter buttons for visa types
│   │   ├── forms/
│   │   │   └── SelectField.tsx        # Reusable accessible select dropdown
│   │   ├── home/
│   │   │   ├── FaqSection.tsx         # FAQ accordion
│   │   │   ├── FinalCta.tsx           # Call-to-action banner
│   │   │   ├── HeroSection.tsx        # Main homepage hero
│   │   │   ├── HowItWorks.tsx         # 4-step process guide
│   │   │   ├── PopularDestinations.tsx# Featured destination cards
│   │   │   ├── SectionHeading.tsx     # Standard section header styling
│   │   │   ├── Testimonials.tsx       # Client reviews
│   │   │   ├── TrustStrip.tsx         # Trust metrics & credentials
│   │   │   ├── VisaSearchCard.tsx     # Interactive quick-search form on hero
│   │   │   └── WhyFortune.tsx         # Value propositions
│   │   ├── visa/
│   │   │   ├── RequirementBadge.tsx   # "Visa Required" / "Visa Free" badge
│   │   │   └── VisaDetails.tsx        # Breakdown of fee, validity, processing time
│   │   ├── ConsultationCta.tsx        # Reusable consultation booking prompt
│   │   ├── EmptyState.tsx             # Fallback UI for zero search results
│   │   ├── Footer.tsx                 # Navigation, contact info, legal links
│   │   ├── Header.tsx                 # Navigation bar, mobile drawer trigger, language switch
│   │   ├── LanguageSwitcher.tsx       # Language dropdown (currently English only)
│   │   ├── Layout.tsx                 # App layout shell with Header, Outlet, Footer, WhatsApp
│   │   ├── Logo.tsx                   # Fortune Visa branding
│   │   ├── MobileDrawer.tsx           # Mobile slide-out navigation menu
│   │   ├── PageHero.tsx               # Reusable banner header for subpages
│   │   ├── PlaceholderPage.tsx        # "Coming Soon" screen for incomplete pages
│   │   ├── Reveal.tsx                 # Intersection-observer based scroll animation
│   │   └── WhatsAppButton.tsx         # Floating WhatsApp button
│   ├── config/
│   │   ├── navigation.ts              # Main navigation & legal route configuration
│   │   ├── siteConfig.ts              # Business details (name, phone, address, WhatsApp)
│   │   └── visaOptions.ts             # Supported passport countries list
│   ├── data/
│   │   ├── checklists.json            # Indicative document requirements per destination & visa
│   │   └── visas.json                 # Indicative visa requirements, fees, times
│   ├── hooks/
│   │   ├── usePassportOptions.ts      # Passport options formatted with emoji flags
│   │   └── useSeo.ts                  # Document title and meta description updater
│   ├── i18n/
│   │   ├── locales/
│   │   │   └── en.json                # English translation strings
│   │   └── index.ts                   # i18next configuration
│   ├── lib/
│   │   ├── checklistData.ts           # Accessors and types for checklists.json
│   │   ├── markdown.ts                # Markdown parser (marked + dompurify + reading time)
│   │   ├── posts.ts                   # Supabase queries for blog posts
│   │   ├── supabase.ts                # Supabase client instantiation
│   │   └── visaData.ts                # Accessors and helpers for visas.json
│   ├── pages/
│   │   ├── BlogListPage.tsx           # Blog archive & category filter
│   │   ├── BlogPostPage.tsx           # Blog single post reader
│   │   ├── CheckerPage.tsx            # Interactive visa eligibility checker
│   │   ├── ChecklistPage.tsx          # Interactive document checklist
│   │   ├── ContactPage.tsx            # Contact details and enquiry form
│   │   ├── DestinationDetailPage.tsx  # Detailed visa info for a country
│   │   ├── DestinationsPage.tsx       # Searchable destinations directory
│   │   ├── HomePage.tsx               # Homepage
│   │   ├── SectionPage.tsx            # Wrapper for placeholder legal routes
│   │   └── ServicesPage.tsx           # Visa services directory
│   ├── App.tsx                        # Router configuration
│   ├── index.css                      # Tailwind base, utilities, print styles
│   ├── main.tsx                       # Entry point
│   └── vite-env.d.ts                  # Vite client type definitions
├── .env                               # Active environment variables
├── .gitignore                         # Git ignored paths
├── eslint.config.js                   # ESLint flat config
├── index.html                         # HTML template
├── package.json                       # Dependencies & scripts
├── package-lock.json                  # Lockfile
├── postcss.config.js                  # PostCSS plugins (Tailwind, Autoprefixer)
├── tailwind.config.js                 # Theme styling, brand colors, typography
├── tsconfig.json                      # Solution TS config
├── tsconfig.app.json                  # Application TS config
├── tsconfig.node.json                 # Node/Vite config TS config
└── vite.config.ts                     # Vite build configuration
```

---

## 4. What's Finished

1. **Brand & Responsive UI:** Clean design tailored for an Australian visa consultancy (Parramatta, NSW) with desktop and mobile navigation, drawer, and persistent WhatsApp floating button.
2. **Interactive Visa Search & Checker:**
   - Quick search widget on the homepage.
   - Dedicated Visa Checker (`/checker`) providing indicative visa status, fees, and processing times by nationality and destination.
   - Cross-links directly to prefilled enquiry forms.
3. **Interactive Document Checklist (`/checklist`):**
   - Interactive destination and visa category selectors with URL query parameter support (`?destination=...&visaType=...`).
   - Dynamic checklist requirement loading from `src/data/checklists.json`.
   - Real-time progress bar tracking completed items with percentage and accessible aria metrics.
   - Persistence of checked items across sessions in `window.localStorage` under `fortune-checklist-progress`.
   - "Print / Save as PDF" button with dedicated `@media print` styles (hiding navbars, hero banners, floating buttons, and non-printable elements).
   - "Get help with these documents" CTA button directing to prefilled enquiry form.
   - Active in desktop navigation and mobile navigation drawer.
4. **Services Showcase (`/services`):**
   - 7 visa categories (Tourist, Student, Work/Skilled, Partner/Family, Business, Migration pathways, Document support) presented as responsive cards with icons and descriptions.
   - Direct "Enquire" button per category linking to the enquiry form with relevant prefilled parameters.
   - Teaser banner linking to the interactive Document Checklist.
5. **Blog System (`/blog`, `/blog/:slug`):**
   - Integrated with Supabase `posts` table.
   - Filter by category, reading time calculation, sanitized markdown rendering with DOMPurify.
   - Related articles recommendation engine.
6. **Enquiry Form (`/contact`):**
   - Built with React Hook Form and Zod validation, with robust browser autofill and DOM sync handling.
   - Guaranteed empty string default values for all fields (or URL-prefilled parameters).
   - Tolerant optional fields accepting empty strings, null, or undefined without triggering type errors.
   - Captures name, email, phone, passport nationality, destination, visa category, travel date, message, and consent.
   - Honeypot anti-spam field (`company`).
   - Inserts directly into Supabase `enquiries` table with row-level security.
7. **SEO Management:** Dynamic `<title>` and `<meta name="description">` updates via `useSeo` hook active across every route (home, destinations, destination detail, checker, services, checklist, blog list, blog post, contact, legal sections).
8. **Internationalization scaffolding:** `react-i18next` integrated with centralized English strings in `src/i18n/locales/en.json`.

---

## 5. What's Missing

1. **Legal Pages Content:**
   - `/privacy` and `/terms` currently render the `PlaceholderPage` ("Coming Soon"). Legal compliance requires full Australian privacy policy and terms of service.
2. **Additional Locales:**
   - `LanguageSwitcher` only exposes `en`. No additional language packs (e.g. Hindi, Punjabi, Mandarin, Arabic, Nepali) have been implemented.
3. **Missing `public/` Directory & Favicon:**
   - `index.html` references `/vite.svg` as icon, but there is no `public/` directory or `vite.svg` file in the project.
4. **Default Bolt.new Metadata:**
   - `index.html` contains `og:image` and `twitter:image` pointing to `https://bolt.new/static/og_default.png`.
5. **Sample Visa and Checklist Data:**
   - `src/data/visas.json` and `src/data/checklists.json` contain placeholder/sample data with disclaimers; they need real Australian migration visa subclasses (e.g. Subclass 500, 482, 189, 190, 600, 820/801) and verified fees.
6. **Real WhatsApp Contact Number:**
   - `siteConfig.whatsappNumber` is currently set to placeholder `'61400000000'`.
7. **404 Catch-All Route:**
   - No wildcard route (`*`) in `App.tsx`; navigating to an unknown path renders an empty outlet inside the layout.
8. **Automated Notification / Email Alerts on Enquiry:**
   - Enquiries are inserted into Supabase `enquiries` table, but there is no email notification trigger (e.g. Supabase Edge Function with Resend/SendGrid) to notify staff of new leads.
9. **Code Splitting (Lazy Loading):**
   - Pages are imported statically, resulting in a single bundle exceeding Vite's recommended 500 kB chunk threshold.
10. **Environment Variable Template:**
    - No `.env.example` file is provided for new developers.

---

## 6. Required Environment Variables

The project connects to Supabase client-side using Vite environment variables:

| Variable Name | Required | Description | Current Value in `.env` |
|---------------|----------|-------------|-------------------------|
| `VITE_SUPABASE_URL` | Yes | The Supabase project URL | `https://gfqrcnyllbajeidtgkzt.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Yes | The Supabase anonymous/public API key | Configured (`sb_publishable_...`) |

*Note: If these variables are undefined, `src/lib/supabase.ts` gracefully degrades `supabase` to `null`, but the enquiry form will fail with an error state and blog posts will return empty.*

---

## 7. Status of Build, Typecheck, Lint & Outstanding Issues

### A. `npm run build` Output (PASSING)
The build command (`vite build`) completes with exit code **0**, producing production bundles in `dist/`:
- `dist/index.html` (1.13 kB)
- `dist/assets/index-MmARWH1e.css` (34.13 kB)
- `dist/assets/index-DmzgJpp_.js` (687.87 kB)

Non-fatal build warnings:
1. **Bundle Chunk Size Warning:**
   ```
   dist/assets/index-DmzgJpp_.js   687.87 kB │ gzip: 208.29 kB
   (!) Some chunks are larger than 500 kB after minification.
   ```
   - *Cause:* All routes, icons, `marked`, `dompurify`, and JSON datasets are bundled into one main chunk. Future optimization can add route-based dynamic imports (`React.lazy`).
2. **Rollup Comment Warnings from Zod:**
   ```
   node_modules/zod/v4/core/regexes.js: contains an annotation that Rollup cannot interpret due to the position of the comment.
   node_modules/zod/v4/core/util.js: contains an annotation that Rollup cannot interpret due to the position of the comment.
   ```

### B. TypeScript Typecheck (`npm run typecheck`) (PASSING)
- `tsc --noEmit -p tsconfig.app.json` exits with **code 0** (0 type errors).

### C. ESLint (`npm run lint`) (PASSING - RESOLVED)
Previously failed with 5 unused-variable/import errors (`@typescript-eslint/no-unused-vars`). All have been resolved without feature changes:
- `src/components/destinations/VisaTypeFilter.tsx`: Removed unused `ArrowRight` and `Link` imports.
- `src/pages/BlogPostPage.tsx`: Removed unused `PageHero` and `siteConfig` imports.
- `src/pages/ChecklistPage.tsx`: Removed unused `current` argument from `setSelection` handler.

`npm run lint` now exits with **code 0** (0 problems).

### D. Enquiry Form Autofill & Validation Fix (RESOLVED)
- **Issue:** Chrome autofill filled the full name input without dispatching standard change events, resulting in Zod receiving `undefined` and throwing `"Invalid input: expected string, received undefined"`.
- **Fix:**
  - Initialized `defaultValues` for every form field to empty strings (or URL-prefilled parameters) and `consent: false`.
  - Updated Zod schema with explicit error messages on `z.string({ message: ... })` so unexpected `undefined` displays localized messages.
  - Made optional fields (`phone`, `passport`, `destination`, `visaType`, `travelDate`, `message`, `company`) accept empty strings, `null`, and `undefined` via `.nullish().or(z.literal(''))`.
  - Added DOM sync on form submit (`handleFormSubmit`) to extract direct DOM element values (capturing Chrome autofill even if no synthetic input event fired) into React Hook Form before running validation and submit.
  - Added `name` attribute to `SelectField` and consent checkbox.
  - Added synchronization handlers on `onChange` and `onBlur` for text inputs.
- **Verification:** Verified successful submission for:
  1. Browser autofilled inputs.
  2. Manual keyboard inputs.
  3. URL-prefilled values (`?passport=...&destination=...&visaType=...&travelDate=...`).
  4. Empty optional fields (safely converted to `null` on Supabase insert).

### E. Other Non-Code Issues
1. **Migration Filename Redundancy:**
   - In `supabase/migrations/`:
     - `20261112041634_20261112000000_add_travel_date_and_consent_to_enquiries.sql.sql`
     - `20261112043036_20261112050000_create_posts_table.sql.sql`
   - Both files carry accidental `.sql.sql` duplicate extensions from generation.
2. **Missing `public/` directory & `/vite.svg` icon:**
   - Referenced in `index.html` but asset does not exist on disk.
3. **Placeholder legal pages:**
   - `/privacy` and `/terms` display "Coming Soon" placeholders.

