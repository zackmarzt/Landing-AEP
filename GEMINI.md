## Project Overview

This is a full-stack web application built with **Next.js 15** (using Turbopack) and **TypeScript**. It appears to be a landing page and administrative interface for a project named "AEP". The project is set up to use **Bun** as the JavaScript runtime and package manager.

The application features a modern technology stack:
- **Frontend**: **React** with **Tailwind CSS** for styling. It uses **shadcn/ui** for its component library, which is built on top of Radix UI primitives, and **lucide-react** for icons.
- **Backend**: The backend logic is handled by Next.js API routes.
- **Database**: It uses a **PostgreSQL** database, managed by the **Drizzle ORM** for type-safe database access. The database schema includes tables for users, projects, and application settings.
- **Authentication**: Authentication is implemented using **NextAuth.js (v5)** with a Credentials-based provider for email and password login. It also supports user roles.
- **AI Integration**: The project integrates with the Google AI platform via **Genkit**, specifically configured to use the `gemini-1.5-flash` model.
- **Deployment**: The configuration in `apphosting.yaml` indicates that the project is set up for deployment on **Firebase App Hosting**.

## Building and Running

This project uses `bun` for all script execution.

### Main Application
- **Install Dependencies**: `bun install`
- **Run Development Server**: To start the Next.js dev server (usually on http://localhost:9002):
  ```bash
  bun dev
  ```
- **Build for Production**: `bun build`
- **Run Production Server**: `bun start`

### Database
The project uses `drizzle-kit` for database migrations.
- **Generate Migrations**:
  ```bash
  bun db:generate
  ```
- **Apply Migrations**:
  ```bash
  bun db:push
  ```
- **Seed the Database**:
  ```bash
  bun db:seed
  ```

### Code Quality
- **Lint Files**: `bun lint`
- **Type-Check**: `bun typecheck`

## Development Conventions

- **Component Architecture**: The project uses `shadcn/ui` components, which promotes a convention of composing UI from primitive components. Component code is located in `src/components`.
- **Styling**: Styling is done with Tailwind CSS, with custom theme configurations (colors, fonts, etc.) defined in `tailwind.config.ts`. Global styles are in `src/app/globals.css`.
- **Database Schema**: The database schema is defined programmatically in `src/db/schema.ts` using Drizzle ORM.
- **Authentication**: Authentication logic is centralized in `src/auth.ts` and middleware. The admin login page is at `/admin/login`.
- **File Structure**: The code is organized within the `src` directory, following Next.js App Router conventions (e.g., `src/app` for routes, `src/components` for UI, `src/lib` for utilities).
