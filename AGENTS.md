# Pixel Office Agent Guide

## Project Context

Pixel Office is a real-time 8-bit virtual office for small teams. The MVP supports one office room with up to four users.

## Current Phase

This repository is in the foundation phase. Keep changes small, readable, and scaffold-focused unless a later task explicitly asks for implementation.

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

## Working Guidelines

- Do not add business logic until it is requested.
- Do not add dependencies unless they are clearly needed for the requested task.
- Prefer beginner-readable names and straightforward file boundaries.
- Keep route files under `src/app`.
- Keep reusable UI in `src/components`.
- Keep feature-specific code in `src/features`.
- Keep shared infrastructure code in `src/lib`.
- Keep client state in `src/stores`.
- Keep shared TypeScript types in `src/types`.

## Architecture Notes

- App Router pages are Server Components by default.
- Put client-only interactivity behind small Client Components.
- Initialize database, socket, and auth helpers lazily when they are implemented.
- Validate request payloads with Zod when API logic is added.
- Re-check authorization in route handlers and server-side code; do not rely only on route protection.
