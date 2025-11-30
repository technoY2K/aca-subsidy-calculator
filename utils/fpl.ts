import type { FPLData } from '~/types/calculator'
import fplData from '~/data/fpl-2025.json'

/**
 * get FPL amount for a given household size
 */
export function getFPL(householdSize: number): number {
  const data = fplData as FPLData
  
  if (householdSize <= 8) {
    return data.householdSize[householdSize.toString()] || 0
  }
  
  // for households larger than 8, add $5,330 per additional person
  const baseFPL = data.householdSize['8'] || 52340
  const additionalPeople = householdSize - 8
  return baseFPL + (additionalPeople * 5330)
}

/**
 * calculate FPL percentage from income and household size
 */
export function calculateFPLPercentage(annualIncome: number, householdSize: number): number {
  const fpl = getFPL(householdSize)
  if (fpl === 0) return 0
  return (annualIncome / fpl) * 100
}

