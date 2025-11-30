# AGENTS.md - ACA Subsidy Expiration Calculator

## Overview

The ACA Subsidy Expiration Calculator is a Nuxt.js-based web application that helps users understand how much their health insurance premiums could increase when enhanced ACA subsidies expire on December 31, 2025. The calculator provides personalized estimates, actionable steps for contacting representatives, and transparent methodology documentation.

## Tech Stack

- **Framework**: Nuxt 4 (Vue.js)
- **UI Library**: Nuxt UI v4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Pages (SSR)

## Development Commands

```bash
# development server
pnpm run dev

# build for production
pnpm run build

# preview production build
pnpm run preview

# generate static site (if needed)
pnpm run generate
```

The dev server runs on port 3000.

## Code Style & Conventions

- **TypeScript**: Strict mode enabled
- **Package Manager**: Use `pnpm` (never `npm` or `yarn`)
- **Comments**: Use lowercase for comments
- **File Naming**: kebab-case for components, PascalCase for Vue components
- **Code Organization**: Follow Nuxt 4 conventions (app directory structure)
- **Path Aliases**: Use `~/` for project root, `@/` for app directory

## Project Structure

```
aca-cliff-calculator/
├── app/                    # Nuxt app directory
│   ├── app.vue            # Root component
│   ├── pages/             # Page routes
│   │   └── index.vue      # Main calculator page
│   ├── components/         # Vue components
│   │   ├── CalculatorForm.vue
│   │   ├── CalculatorResults.vue
│   │   ├── ActionSteps.vue
│   │   └── MethodologySection.vue
│   └── assets/            # Static assets (CSS, images)
│       └── css/
│           └── main.css   # Global styles
├── data/                   # JSON data files
│   ├── fpl-2025.json      # Federal Poverty Level data
│   ├── benchmark-premiums.json  # Benchmark premium data
│   └── subsidy-formulas.json     # Subsidy calculation formulas
├── utils/                  # Utility functions
│   ├── calculations.ts    # Main calculation orchestrator
│   ├── fpl.ts             # FPL lookup utilities
│   ├── premiums.ts        # Premium calculation utilities
│   └── subsidies.ts       # Subsidy calculation utilities
├── types/                  # TypeScript type definitions
│   └── calculator.ts      # Calculator interfaces and types
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Key Files

- `nuxt.config.ts` - Nuxt configuration (Cloudflare Pages preset, port, modules)
- `app/app.vue` - Root component with `<UApp>` wrapper
- `app/pages/index.vue` - Main calculator page orchestrator
- `app/components/CalculatorForm.vue` - Form component for user inputs
- `app/components/CalculatorResults.vue` - Results display component
- `app/components/ActionSteps.vue` - Actionable steps for users
- `app/components/MethodologySection.vue` - Collapsible methodology documentation
- `app/assets/css/main.css` - Global styles (Tailwind imports)
- `utils/calculations.ts` - Main calculation logic orchestrator
- `data/*.json` - Static data files (FPL, premiums, formulas)

## Data Files

### `data/fpl-2025.json`
Federal Poverty Level data by household size. Source: ASPE (Assistant Secretary for Planning and Evaluation).

### `data/benchmark-premiums.json`
Benchmark premium data structure:
- `age_brackets`: Base premiums by age (21, 27, 30, 40, 50, 60, 64)
- `state_cost_factors`: State-specific cost adjustment factors
- Formula: `benchmark_premium = age_bracket_base * state_cost_factor`
- Uses linear interpolation for ages between brackets

### `data/subsidy-formulas.json`
Subsidy calculation formulas:
- Enhanced ACA: Percentage caps from 0% to 8.5% of income
- Original ACA: Percentage caps from 2% to 9.5% of income
- Uses linear interpolation for FPL percentages between brackets

## Calculation Logic

### Flow
1. **User Inputs**: State, household size, ages, annual income, current premium (optional)
2. **FPL Calculation**: Determine FPL percentage based on household size and income
3. **Benchmark Premium**: Calculate using age brackets, state factors, and interpolation
4. **Subsidy Calculation**: Determine subsidy using FPL percentage and appropriate formula
5. **Results**: Calculate premium increase (enhanced vs original ACA subsidies)

### Key Utilities

- `utils/fpl.ts`: FPL lookup and percentage calculation
- `utils/premiums.ts`: Benchmark premium calculation with age/state interpolation
- `utils/subsidies.ts`: Subsidy calculation using FPL percentage and formulas
- `utils/calculations.ts`: Orchestrates all calculations and returns results

## Development Setup

### Local Development

```bash
# install dependencies
pnpm install

# start dev server
pnpm run dev
```

The dev server runs on `http://localhost:3000`.

### Production Build

```bash
# build for Cloudflare Pages
pnpm run build

# preview production build locally
pnpm run preview
```

## Deployment

### Cloudflare Pages

The project is configured for Cloudflare Pages with SSR:

- **Preset**: `cloudflare_pages` (configured in `nuxt.config.ts`)
- **Build Command**: `pnpm run build`
- **Output Directory**: `.output/public`
- **Deployment**: Via Git integration (push to main branch)

### Configuration

The `nuxt.config.ts` includes:
- `nitro.preset: 'cloudflare_pages'` - Enables Cloudflare Pages SSR
- `nitro.prerender.autoSubfolderIndex: false` - Cloudflare route matching
- Explicit alias configuration for `~` and `@` paths

## Component Details

### CalculatorForm
- Collects user inputs (state, household size, ages, income)
- Dynamic age inputs based on household size
- Income formatting with comma separators
- Form validation
- Reset button (appears when results are shown)

### CalculatorResults
- Displays calculation results
- Shows current estimated subsidy (green box)
- Shows current estimated premium (yellow box)
- Displays annual and monthly increases

### ActionSteps
- Personalized messaging with actual increase amounts
- Links to find representatives (House and Senate)
- Collapsible sample message with copy-to-clipboard
- Budget preparation section
- Links to explore alternatives (Medicaid, health centers)

### MethodologySection
- Collapsible section (details/summary)
- Data sources with links (ASPE, CMS, IRS)
- Calculation methods explanation
- Limitations and disclaimers

## Common Tasks

### Adding a New Component

Create components in `app/components/`:
```vue
<!-- app/components/MyComponent.vue -->
<template>
  <div>My Component</div>
</template>

<script setup lang="ts">
// component logic
</script>
```

Use in pages: `<MyComponent />` (auto-imported).

### Updating Data Files

1. **FPL Data**: Update `data/fpl-2025.json` with new year's data from ASPE
2. **Benchmark Premiums**: Update `data/benchmark-premiums.json` with new CMS data
3. **Subsidy Formulas**: Update `data/subsidy-formulas.json` if formulas change

### Modifying Calculations

- **FPL Logic**: Edit `utils/fpl.ts`
- **Premium Logic**: Edit `utils/premiums.ts`
- **Subsidy Logic**: Edit `utils/subsidies.ts`
- **Orchestration**: Edit `utils/calculations.ts`

### Styling

- Use Tailwind CSS classes directly
- Global styles in `app/assets/css/main.css`
- Nuxt UI components for consistent design system
- Dark theme: `bg-gray-900` background, `text-white`/`text-gray-300` for text

## Troubleshooting

### Port Already in Use

Change port in `nuxt.config.ts`:
```typescript
devServer: {
  port: 3001  // different port
}
```

### TypeScript Path Resolution Errors

If you see `Cannot find module '~/...'` errors:
1. Run `pnpm install` (triggers `nuxt prepare`)
2. Ensure `nuxt.config.ts` has explicit alias configuration
3. Restart TypeScript server in your IDE

### Build Errors

Clear cache and rebuild:
```bash
rm -rf .nuxt .output node_modules dist
pnpm install
pnpm run build
```

### Cloudflare Pages Deployment Issues

- Ensure `nitro.preset: 'cloudflare_pages'` is set in `nuxt.config.ts`
- Check build output directory is `.output/public`
- Verify Git integration is configured correctly in Cloudflare dashboard

## Data Sources

- **FPL Data**: [ASPE Federal Poverty Guidelines](https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines)
- **Benchmark Premiums**: [CMS Marketplace Public Use Files](https://www.cms.gov/cciio/resources/data-resources/marketplace-puf)
- **Subsidy Formulas**: [IRS Premium Tax Credit Documentation](https://www.irs.gov/affordable-care-act/individuals-and-families/the-premium-tax-credit)

