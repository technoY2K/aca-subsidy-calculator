import type { SubsidyFormulas } from '~/types/calculator'
import subsidyData from '~/data/subsidy-formulas.json'

/**
 * get premium cap percentage for a given FPL percentage and subsidy type
 */
function getPremiumCapPercentage(fplPercentage: number, type: 'enhanced' | 'original'): number {
  const data = subsidyData as SubsidyFormulas
  const formulas = data[type]
  
  // convert FPL percentage to string key (round to nearest bracket)
  const brackets = Object.keys(formulas)
    .map(Number)
    .filter(key => !isNaN(key))
    .sort((a, b) => a - b)
  
  // find appropriate bracket
  let capPercentage = 0
  
  if (type === 'enhanced') {
    // enhanced: 0% at 150% FPL, scaling to 8.5% at 400%+ FPL
    if (fplPercentage < 150) {
      capPercentage = 0
    } else if (fplPercentage >= 400) {
      capPercentage = formulas['400'] || 0.085
    } else {
      // linear interpolation between brackets
      for (let i = 0; i < brackets.length - 1; i++) {
        const lower = brackets[i]
        const upper = brackets[i + 1]
        
        if (fplPercentage >= lower && fplPercentage < upper) {
          const lowerCap = formulas[lower.toString()] || 0
          const upperCap = formulas[upper.toString()] || 0
          const ratio = (fplPercentage - lower) / (upper - lower)
          capPercentage = lowerCap + (upperCap - lowerCap) * ratio
          break
        }
      }
    }
  } else {
    // original: 2% at 100% FPL, scaling to 9.5% at 400% FPL, no subsidy above 400%
    if (fplPercentage < 100) {
      capPercentage = 0
    } else if (fplPercentage >= 400) {
      capPercentage = 0 // no subsidy above 400% FPL for original ACA
    } else {
      // linear interpolation between brackets
      for (let i = 0; i < brackets.length - 1; i++) {
        const lower = brackets[i]
        const upper = brackets[i + 1]
        
        if (fplPercentage >= lower && fplPercentage < upper) {
          const lowerCap = formulas[lower.toString()] || 0
          const upperCap = formulas[upper.toString()] || 0
          const ratio = (fplPercentage - lower) / (upper - lower)
          capPercentage = lowerCap + (upperCap - lowerCap) * ratio
          break
        }
      }
    }
  }
  
  return capPercentage
}

/**
 * calculate subsidy amount
 * subsidy = benchmark premium - (income × premium cap percentage)
 */
export function calculateSubsidy(
  benchmarkPremium: number,
  annualIncome: number,
  fplPercentage: number,
  type: 'enhanced' | 'original'
): number {
  const capPercentage = getPremiumCapPercentage(fplPercentage, type)
  const maxContribution = annualIncome * capPercentage
  const monthlyMaxContribution = maxContribution / 12
  
  const subsidy = benchmarkPremium - monthlyMaxContribution
  
  // subsidy cannot be negative
  return Math.max(0, subsidy)
}

