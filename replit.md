# Interactive Number Grid Application

## Overview

This is a React-based interactive number grid application that allows users to highlight numbers in a 10x10 grid (displaying numbers 1-100). The application features manual number input, random number highlighting, and grid cell toggling functionality. Built with modern web technologies including React, TypeScript, and Tailwind CSS.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState, useRef, useEffect)
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **API Pattern**: RESTful API endpoints with /api prefix

## Key Components

### Client-Side Components
1. **GridPage** (`client/src/pages/grid.tsx`): Main interactive grid component
   - Manages grid state and user interactions
   - Handles number highlighting and validation
   - Implements click-to-toggle functionality

2. **UI Components** (`client/src/components/ui/`): 
   - Comprehensive shadcn/ui component library
   - Includes buttons, inputs, labels, cards, and form elements
   - Consistent design system with Tailwind CSS

3. **Hooks**:
   - `useIsMobile`: Responsive design detection
   - `useToast`: Toast notification system

### Server-Side Components
1. **Express Server** (`server/index.ts`): Main application server
   - Middleware for JSON parsing and logging
   - Error handling and request/response logging
   - Development/production environment handling

2. **Storage Layer** (`server/storage.ts`):
   - Abstract storage interface for CRUD operations
   - In-memory storage implementation for development
   - User management functionality

3. **Database Schema** (`shared/schema.ts`):
   - User table with username/password fields
   - Zod validation schemas
   - Type-safe database operations

## Data Flow

1. **Grid Interaction**: User clicks grid cells or enters numbers manually
2. **State Management**: React state tracks highlighted numbers in a Set
3. **Validation**: Client-side validation for number input (1-100 range)
4. **Error Handling**: Temporary error messages with auto-dismissal
5. **Persistence**: Grid state persists during session but resets on page reload

## External Dependencies

### Frontend Dependencies
- **@radix-ui/react-***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **connect-pg-simple**: PostgreSQL session store
- **tsx**: TypeScript execution for development

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Mode
- Vite development server with hot module replacement
- Express server running on separate process
- PostgreSQL database connection via environment variables
- Real-time error overlay for debugging

### Production Build
- Vite builds optimized client bundle to `dist/public`
- ESBuild compiles server code to `dist/index.js`
- Static file serving from Express server
- Environment-based configuration

### Database Setup
- Drizzle migrations in `./migrations` directory
- Schema definition in `shared/schema.ts`
- Database URL required via `DATABASE_URL` environment variable
- Push-based schema deployment with `db:push` command

## Changelog

```
Changelog:
- July 04, 2025. Initial setup with vertical layout
- July 04, 2025. Updated to horizontal layout with controls on left, grid on right, no-scroll viewport optimization
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```