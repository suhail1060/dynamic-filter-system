# Dynamic Filter Component System

A reusable, type-safe dynamic filter component system built with React 18, TypeScript, and Material UI. Supports real-time client-side filtering across multiple data types with a clean, professional dark-themed interface.

## Live Demo
https://dynamic-filter-system-black.vercel.app

## Features

- **7 filter types** — Text, Number, Date Range, Amount Range, Single Select, Multi Select, Boolean
- **Multiple operators per type** — Contains, Equals, Starts With, Greater Than, Between, In, Not In, and more
- **AND / OR logic** — AND between different fields, OR within the same field
- **Nested object filtering** — dot notation support (e.g. `address.city`)
- **Array filtering** — IN / NOT IN for multi-select fields like skills
- **Real-time updates** — table updates instantly as filters change with 300ms debounce
- **Filter persistence** — active filters are saved to localStorage and survive page refresh
- **Export to CSV / JSON** — download currently filtered records in either format
- **Sortable table** — click any column header to sort ascending/descending
- **Mock API** — data served via Express mock server from local JSON
- **53 sample records** — varied data across 6 departments for meaningful filtering demos
- **Accessible** — aria labels on all interactive elements

## Tech Stack

- React 18 + TypeScript
- Vite
- Material UI (MUI v5)
- Lucide React (icons)
- Express (mock API server)
- Axios

## Project Structure
```
src/
├── components/
│   ├── FilterPanel/
│   │   ├── FilterPanel.tsx        # Filter container with add/clear controls
│   │   ├── FilterRow.tsx          # Single filter condition row
│   │   └── inputs/
│   │       ├── TextInput.tsx
│   │       ├── NumberInput.tsx
│   │       ├── DateRangeInput.tsx
│   │       ├── AmountRangeInput.tsx
│   │       ├── SingleSelectInput.tsx
│   │       ├── MultiSelectInput.tsx
│   │       └── BooleanInput.tsx
│   └── DataTable/
│       └── DataTable.tsx          # Sortable table with badges and chips
├── config/
│   └── fields.ts                  # Field definitions and operator mappings
├── data/
│   └── employees.json             # 53 sample employee records
├── hooks/
│   ├── usePersistedFilters.ts     # Filter persistence via localStorage
│   └── useDebounce.ts             # Debounce hook for filter updates
├── services/
│   └── employeeApi.ts             # Axios API calls with local fallback
├── types/
│   └── index.ts                   # TypeScript interfaces
├── utils/
│   ├── filterEngine.ts            # Client-side filtering algorithms
│   └── exportData.ts              # CSV and JSON export utilities
├── theme.ts                       # MUI dark theme
└── App.tsx
mockServer.cjs                     # Express mock API server (port 3001)
```

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
```bash
git clone https://github.com/YOUR_USERNAME/dynamic-filter-system.git
cd dynamic-filter-system
npm install
```

### Running the App

You need two terminals:

**Terminal 1 — Start the mock API:**
```bash
npm run mock
```
Runs at `http://localhost:3001`

**Terminal 2 — Start the dev server:**
```bash
npm run dev
```
Runs at `http://localhost:5173`

Or run both with one command:
```bash
npm run dev:all
```

> **Note:** If the mock server is not running, the app automatically falls back to the local JSON data so it still works in production.

## Filter Types & Operators

| Field Type | Operators |
|------------|-----------|
| Text | Contains, Equals, Starts With, Ends With, Does Not Contain |
| Number | Equals, Greater Than, Less Than, Greater Than or Equal, Less Than or Equal |
| Date | Between (date range) |
| Amount | Between (min/max range) |
| Single Select | Is, Is Not |
| Multi Select | In, Not In |
| Boolean | Is (True/False) |

## Filter Logic

- **Different fields** → AND logic (record must match all conditions)
- **Same field, multiple filters** → OR logic (record matches any condition for that field)

## Available Filter Fields

| Field | Type |
|-------|------|
| Name | Text |
| Email | Text |
| Department | Single Select |
| Role | Text |
| Salary | Amount |
| Join Date | Date |
| Active Status | Boolean |
| Skills | Multi Select |
| City | Text |
| State | Single Select |
| Projects Count | Number |
| Performance Rating | Number |
| Last Review Date | Date |

## Bonus Features

| Feature | Details |
|---------|---------|
| Filter persistence | Filters saved to localStorage, restored on page reload |
| Export to CSV | Downloads currently filtered records as `.csv` |
| Export to JSON | Downloads currently filtered records as `.json` |
| Debounced updates | 300ms debounce on filter changes to prevent excessive re-renders |
| Accessibility | `aria-label` on all inputs, selects, buttons and table |

## Design Decisions

- **Dot notation for nested fields** — `address.city` is traversed via `getNestedValue()` utility
- **Type-driven rendering** — `FilterRow` renders the correct input component based on `FieldDefinition.type`
- **Centralized config** — adding a new field only requires one entry in `fields.ts`
- **AND/OR grouping** — filters are grouped by `fieldKey` before evaluation, enabling OR within same field
- **Mock API with fallback** — Express server serves `employees.json` locally; falls back to static import in production

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run mock` | Start Express mock API server |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |