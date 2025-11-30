# ACA Subsidy Expiration Calculator

A single-page calculator that shows people how much their health insurance premiums will increase when enhanced ACA subsidies expire on December 31, 2025.

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Nuxt UI v4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Cloudflare Pages (SSR via Git Integration)

## Setup

```bash
# install dependencies
pnpm install

# development server
pnpm run dev

# build for production
pnpm run build

# preview production build
pnpm run preview

# generate static site (if needed)
pnpm run generate
```

## Data Files

The calculator requires three data files in the `data/` directory:

1. **`fpl-2025.json`** - Federal Poverty Level data by household size
2. **`benchmark-premiums.json`** - Benchmark premiums by state and age
3. **`subsidy-formulas.json`** - Subsidy calculation formulas (enhanced vs original ACA)

See the placeholder files in `data/` for the expected format. Replace with actual data before deploying.

## Deployment

This project is configured for Cloudflare Pages with Git Integration:

1. Push your code to GitHub/GitLab
2. Connect your repository to Cloudflare Pages
3. Set build command: `pnxt run build`
4. Set build output directory: `.output/public`
5. Cloudflare Pages will automatically deploy on every push

No Wrangler CLI or manual configuration needed - Cloudflare Pages handles everything automatically.

## Project Structure

```
aca-cliff-calculator/
├── app/
│   ├── pages/
│   │   └── index.vue          # main calculator page
│   ├── components/
│   │   ├── CalculatorForm.vue
│   │   ├── CalculatorResults.vue
│   │   └── ActionSteps.vue
│   └── assets/
│       └── css/
│           └── main.css
├── data/                       # JSON data files
├── utils/                      # calculation utilities
├── types/                      # TypeScript definitions
└── nuxt.config.ts             # Nuxt configuration
```

## Development Notes

- Calculations are performed client-side for fast, responsive results
- Action steps provide next steps for users

