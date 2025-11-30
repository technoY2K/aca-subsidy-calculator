# ACA Subsidy Calculator - Technical Specification

## Project Goal
Build a single-page calculator that shows people how much their health insurance premiums will increase when enhanced ACA subsidies expire on December 31, 2025.

## Core Functionality

### User Inputs (Form)
1. **State** (dropdown)
   - All 50 states + DC
2. **Age(s)** (number input, allow multiple people)
   - Support 1-4 people on the plan
   - Ages 0-64 (65+ are on Medicare)
3. **Annual Household Income** (number input)
   - Dollar amount
4. **Current Monthly Premium** (optional number input)
   - For comparison/validation purposes

### Calculations Required
1. **Federal Poverty Level (FPL) Percentage**
   - Income ÷ FPL for household size = FPL%
   - 2025 FPL data: https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines

2. **Subsidy Calculation**
   - Get benchmark premium for state/age from CMS data
   - Calculate current subsidy (enhanced ACA):
     - Use income-based percentage caps (0% at 150% FPL, scaling to 8.5% at 400%+ FPL)
   - Calculate expired subsidy (original ACA):
     - Use original percentage caps (2% at 100% FPL, scaling to 9.5% at 400% FPL)
     - No subsidy above 400% FPL
   - Subsidy amount = Benchmark Premium - (Income × percentage cap)

3. **Output Calculations**
   - Current monthly premium after subsidy
   - Monthly premium if subsidies expire
   - Monthly cost increase
   - Annual cost increase

### Outputs (Results Display)
Show clearly formatted results:
- "Your current estimated monthly subsidy: $XXX"
- "Your current estimated monthly premium: $XXX"
- "If subsidies expire, your monthly premium: $XXX"
- "Your monthly increase: $XXX"
- "Your annual increase: $XXX"

Include a simple explanation:
"Enhanced ACA subsidies expire December 31, 2025. Without Congressional action, your premiums could increase significantly in 2026."

### Action Steps Section
Display after results:
- **Contact Your Representatives**
  - Link to https://www.congress.gov/members/find-your-member
  - Sample message template (plain text, copy-paste ready)
- **Explore Alternatives**
  - Link to Medicaid eligibility checker
  - Link to healthcare.gov
  - Mention community health centers
- **Stay Informed**
  - Links to relevant advocacy organizations (KFF, Families USA, etc.)

## Data Sources Needed

### 2026 Benchmark Premiums
- CMS Public Use Files (PUF) for 2025, project forward for 2026
- Format: State → Age → Monthly Premium
- Can start with 2025 data + 5% inflation estimate if 2026 not available
- Store as JSON file in project

### Federal Poverty Level
- 2025 FPL numbers by household size
- Store as JSON/constant in project
- Source: https://aspe.hhs.gov/poverty-guidelines

### Subsidy Formulas
- Enhanced ACA (current): Percentage caps by FPL level
- Original ACA (post-expiration): Percentage caps by FPL level
- Hard-code these formulas based on IRS documentation

## UI/UX Requirements
- Single page, no routing needed
- Clean, minimal design (not fancy)
- Mobile responsive (basic responsiveness is fine)
- Form at top, results display below
- Clear visual hierarchy: problem → your numbers → actions
- Use large, bold text for the scary cost increase number
- NO animations, NO complex interactions
- Color scheme: Simple, trust-building (blues/grays, avoid red except for cost increase)

## MVP Exclusions (Don't Build These)
- No email signup
- No user accounts
- No backend/database
- No social sharing
- No analytics (yet)
- No A/B testing
- No complex error handling beyond form validation
- No state persistence (if they refresh, they re-enter data)

## Validation Rules
- Income must be > 0
- Ages must be 0-64
- State must be selected
- At least one person's age required

## Error States
- "Please enter a valid income"
- "Please enter valid age(s)"
- "Please select your state"
- If income too high for any subsidy: Show this clearly, but still calculate

## Success Criteria
- Calculator loads in < 2 seconds
- Calculations are accurate (test against healthcare.gov calculator)
- Works on mobile and desktop
- No console errors
- Deployable to Vercel with one command

## Timeline
- Build core calculator: 4-6 hours
- Styling and polish: 2-3 hours
- Testing and fixes: 1-2 hours
- Total: Ship in 24-48 hours

## Notes for Agent
- Focus on getting it working, then make it pretty
- Use simple, readable code over clever optimizations
- Comment the subsidy calculation formulas clearly
- If stuck on data, use placeholder/estimated values and mark clearly
- Prioritize: Accurate math > Pretty UI > Additional features