import type { CalculatorInputs, CalculatorResults } from '~/types/calculator'
import { calculateFPLPercentage } from './fpl'
import { getHouseholdBenchmarkPremium } from './premiums'
import { calculateSubsidy } from './subsidies'

/**
 * main calculation orchestrator
 * takes user inputs and returns all calculated results
 */
export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const householdSize = inputs.ages.length
  const fplPercentage = calculateFPLPercentage(inputs.annualIncome, householdSize)
  const benchmarkPremium = getHouseholdBenchmarkPremium(inputs.state, inputs.ages)
  
  // calculate current (enhanced) subsidy
  const currentSubsidy = calculateSubsidy(
    benchmarkPremium,
    inputs.annualIncome,
    fplPercentage,
    'enhanced'
  )
  
  // calculate expired (original) subsidy
  const expiredSubsidy = calculateSubsidy(
    benchmarkPremium,
    inputs.annualIncome,
    fplPercentage,
    'original'
  )
  
  // calculate premiums after subsidies
  const currentMonthlyPremium = Math.max(0, benchmarkPremium - currentSubsidy)
  const expiredMonthlyPremium = Math.max(0, benchmarkPremium - expiredSubsidy)
  
  // calculate increases
  const monthlyIncrease = expiredMonthlyPremium - currentMonthlyPremium
  const annualIncrease = monthlyIncrease * 12
  
  return {
    householdSize,
    fplPercentage,
    benchmarkPremium,
    currentSubsidy,
    currentMonthlyPremium,
    expiredSubsidy,
    expiredMonthlyPremium,
    monthlyIncrease,
    annualIncrease
  }
}

