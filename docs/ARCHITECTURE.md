# 🏗 Architecture

This document describes the technical architecture of Open Lead CRM.

## Design Goals
- **Simplicity:** Easy to understand and modify for any developer.
- **Portability:** Can run on a single small VPS or even locally using SQLite.
- **Modern Standards:** Built with the latest stable versions of React, Next.js, and Prisma.
- **Type Safety:** 100% TypeScript coverage.

## Tech Stack

### Core
- **Next.js (App Router):** Provides the hybrid rendering (Server & Client components), routing, and API capabilities.
- **TypeScript:** Ensures reliable code and easy refactoring.
- **Prisma:** Modern ORM for type-safe database access.

### Frontend
- **Tailwind CSS:** Utility-first CSS for rapid and consistent UI development.
- **Lucide Icons:** Clean and consistent iconography.
- **clsx & tailwind-merge:** Utilities for dynamic class management.

### Database
- **SQLite (Development/MVP):** Zero-config database stored as a local file. Ideal for initial development and small deployments.
- **PostgreSQL (Production-ready):** Prisma makes it easy to switch to PostgreSQL when scale is required.

## Folder Structure

```
open-lead-crm/
├── app/              # Next.js App Router (Pages & Layouts)
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   ├── leads/        # Lead-specific components
│   └── shared/       # Global components (Sidebar, etc.)
├── lib/              # Shared utilities, Prisma client
├── prisma/           # Database schema and seeds
├── public/           # Static assets
└── docs/             # Technical documentation
```

## Data Model

### Lead
The central entity. Contains contact info, sales status, estimated value, and marketing attribution data.

### Task
Commercial activities associated with a Lead. Can be completed and have due dates.

### Interaction
A historical log of touchpoints (calls, meetings, notes) between the agency and the Lead.

## Development Patterns
- **Server Components:** Used for data fetching to minimize client-side JavaScript.
- **Server Actions:** Planned for form submissions and data mutations.
- **Client Components:** Used only when browser interactivity is required (e.g., Kanban drag-and-drop).
