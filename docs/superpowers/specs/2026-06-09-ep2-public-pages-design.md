# EP2 Public Pages Design

## Goal

Make Pixel Office's landing, login, and registration pages feel like the entrance to a cozy virtual place rather than a generic SaaS product.

## Approved Direction

Use an "Office at Dusk" visual direction. The landing hero is an immersive office scene built from the project's extracted furniture sprites and CSS pixel avatars. Product copy and calls to action sit over the scene so visitors understand the experience immediately.

## Visual Language

- Deep navy room framing and page background.
- Warm amber lighting, teal presence accents, and restrained coral details.
- Square pixel-inspired borders, stepped shadows, and low-radius surfaces.
- Existing office sprites and avatar components as real product imagery.
- Continuous floor textures and small speech bubbles instead of generic decorative graphics.
- Clear focus states, readable labels, strong contrast, and reduced-motion support.

## Landing Page

- A compact navigation bar with the Pixel Office identity and auth links.
- A first-viewport office scene with overlaid title, subtitle, description, and three CTAs.
- The scene includes furniture, tiny avatars, presence details, and speech bubbles without authenticated data.
- Four feature cards: Realtime Movement, Office Chat, Avatar Customization, and Team Presence.
- A three-step "How it works" section.
- A larger product mockup showing the relationship between the room, team presence, and chat.
- A concise footer with primary navigation.

The hero must leave a visible hint of the next section on common desktop and mobile viewports.

## Authentication Pages

- Desktop split layout with a branded office vignette on the left and a focused form on the right.
- Mobile layout stacks the visual pitch above the form while keeping the form easy to reach.
- Login and registration retain their current API calls, Zustand updates, validation attributes, errors, loading states, redirects, and cross-links.
- Registration uses the headline "Create your pixel workspace identity."
- Both pages include a clear link back to the landing page.

## Component Boundaries

- `public-shell.tsx`: public navigation, page background, and footer.
- `public-hero-preview.tsx`: reusable static office scene with variants for hero and auth pages.
- `public-feature-card.tsx`: compact repeated feature treatment.
- `public-auth-layout.tsx`: branded split layout shared by login and registration.
- `public-content.ts`: typed public-page copy and links used by the landing page.

## Constraints

- No auth, database, Prisma, Socket.io, room, movement, collision, or office app behavior changes.
- No external UI libraries or new dependencies.
- No authenticated stores or API requests in the public preview.
- TypeScript remains strict and no `any` is introduced.

## Verification

Run:

- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run typecheck:server`
- `npx.cmd tsx --test`
- `npm.cmd run build`
