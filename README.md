# Pixel Office

## Project Overview

Pixel Office is a real-time 8-bit virtual office web application for small teams. The MVP focuses on a single office room with a maximum of four users.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Zod
- Prisma ORM
- PostgreSQL / Neon
- Socket.io
- JWT with HTTP-only cookies

## MVP Features

- User registration and login
- HTTP-only cookie session handling
- One shared office room
- Up to four users in the room
- Pixel-style avatar presence
- Basic room chat
- Real-time user movement and presence updates

## Folder Structure

```txt
src/
  app/
    api/
    auth/
      login/
      register/
    office/
    page.tsx
  components/
    ui/
    layout/
  features/
    auth/
    avatar/
    office/
    chat/
    room/
  hooks/
  lib/
    auth/
    db/
    socket/
    validations/
  stores/
  types/
```

## Development Roadmap

1. Project foundation and folder architecture
2. Authentication routes and validation
3. Prisma schema and database connection
4. Office room UI shell
5. Avatar state and movement model
6. Socket.io real-time presence
7. Chat feature
8. MVP polish and deployment setup

## Office Sprites

The office sprite sheet lives at `public/assets/office/spritesheet.png`.

Sprite crop coordinates are configured in `scripts/extract-office-sprites.ts`
inside the `SPRITES` array. Update `x`, `y`, `width`, and `height` there
when replacing the sheet or tuning individual crops.

Run extraction with:

```bash
npm.cmd run extract:office-sprites
```

This writes cropped PNG files to `public/assets/office/items/` and regenerates
`src/features/office/assets/office-assets.ts`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
npm.cmd run extract:office-sprites
```
