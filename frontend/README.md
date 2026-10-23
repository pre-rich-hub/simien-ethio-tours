# Simien Ethiopia Tours

Next.js frontend organised around domain features. The folder structure does not
change public URLs, styling, content, or interaction behaviour.

```text
frontend/
├── app/
│   ├── page.tsx                 # Homepage composition
│   ├── about/
│   ├── contact/
│   ├── how-we-travel/           # Index and dynamic detail route
│   ├── privacy/
│   ├── terms/
│   ├── (auth)/login/
│   ├── destinations/            # Route composition and dynamic entry point
│   ├── tours/
│   ├── experiences/
│   ├── blog/
│   ├── festivals/
│   ├── mountains/
│   └── admin/
├── features/
│   ├── home/                    # Homepage-only sections
│   ├── about/
│   ├── contact/                 # Reuses the enquiries feature's form
│   ├── how-we-travel/           # Components, data, types, and utilities
│   ├── legal/                   # Shared sections and privacy/terms content
│   ├── destinations/
│   ├── tours/
│   ├── experiences/
│   ├── blog/
│   ├── auth/
│   ├── admin/
│   ├── festivals/
│   ├── mountains/
│   ├── enquiries/
│   ├── newsletter/
│   └── support/
├── components/
│   ├── ui/                      # Shared UI primitives
│   ├── layout/                  # Navbar, footer, route progress
│   └── common/                  # Headings, hero, links, reveal
├── lib/
│   ├── api/                     # Request client and backend endpoints
│   ├── utils/                   # Class names and date formatting
│   ├── constants/               # Routes, contact details, marketing copy
│   └── config/                  # Backend URL configuration
└── public/                      # Existing images and icons, at their original URLs
```

## Ownership rules

- `app/` defines routes, layouts, metadata, and static generation. Pages compose
  feature components; dynamic routes resolve parameters and handle missing
  records.
- `features/` owns domain components, data, types, utilities, client hooks, and
  backend API calls. Create each subfolder when it has a real responsibility.
- `components/` contains UI shared across domains. A component specific to one
  feature belongs in that feature; homepage-only sections live in
  `features/home/`.
- `lib/` holds infrastructure and shared utilities.

## Domain boundaries

Destinations describe places. Tours describe itineraries and reference places.
Experiences are bookable activities linked to destinations and tours by slug.
Mountains and festivals remain distinct models: peaks have elevation/difficulty,
while festivals have calendar information. Both link to destinations and tours;
neither is converted into a destination category by this structural refactor.

Enquiries, newsletter subscriptions, authentication, admin management, and the
support assistant each own their existing forms and interactions. About,
contact, and how-we-travel own their page components in separate feature
folders. Privacy and terms share the legal feature's sections and keep their
content in its data folder. Public routes live directly under `app/`; locale
routing is deferred.

## Destinations as the feature pattern

```text
features/destinations/
├── components/
│   ├── DestinationCard.tsx
│   ├── DestinationGrid.tsx
│   ├── DestinationHero.tsx
│   ├── DestinationOverview.tsx
│   ├── DestinationJourneys.tsx
│   ├── DestinationEnquiry.tsx
│   └── Destinations.tsx          # Homepage carousel
├── hooks/useDestinations.ts     # Existing carousel state and pointer handlers
├── data/destination.data.ts
├── types/destination.types.ts
├── utils/destination.utils.ts   # Catalogue lookup and region grouping
└── index.ts                     # Public exports
```

`app/destinations/page.tsx` composes the public `DestinationHero` and
`DestinationGrid` exports. Imports outside a feature use its `index.ts` for
reusable components, for example:

```tsx
import { DestinationCard, DestinationGrid } from "@/features/destinations";
```

Feature internals use direct module imports to avoid importing their own barrel.
Route page implementations can be imported directly so route metadata stays
separate from reusable component exports. Keep server-only modules out of
barrels consumed by client components.

Existing catalogue lookups live in `utils/`; static records live in `data/`.
`api/` is reserved for backend communication. Destinations, experiences, and
blog currently use static catalogues, so no speculative HTTP client or loading
hook is added. Tours preserve their existing API overlay and static fallback.

Tour filtering state and URL synchronization live in `hooks/useTourFilters.ts`;
filtering buttons live in `components/TourFilters.tsx`. Login state and
submission handling live in `features/auth/hooks/useAuth.ts`.

## Component responsibilities

About, contact, and how-we-travel routes compose individual feature sections
alongside the shared hero and call to action. They do not delegate to full-page
feature wrappers. The how-we-travel detail route resolves its record and related
places and tours, then passes those records to story, places, journeys, and
navigation sections. Privacy and terms compose the shared legal contents, text,
and contact card; their section type lives in `features/legal/types/`.

The admin tour creation and editing screens compose shared editors from
`features/admin/components/tours/form/`: basic information, description fields,
included/excluded lists, itinerary days, image uploads, gallery selection,
categories, and blocked dates. Their request and state handling lives in
`features/admin/hooks/`, with shared editor types in
`types/tour-editor.types.ts`.

`components/layout/Navbar.tsx` composes the wordmark, desktop navigation,
language picker, and mobile navigation from `components/layout/navigation/`.
Each desktop dropdown has its own component; `useNavigation` owns menu state,
scroll tracking, dismissal, and event-listener cleanup.

## Development commands

Run from `frontend/`:

```sh
npm run dev
npm run build
npx tsc --noEmit
```

API requests are proxied to `API_BASE_URL`, defaulting to
`http://localhost:5000`. See `.env.example`. Shared component generator aliases
are configured in `components.json`.
