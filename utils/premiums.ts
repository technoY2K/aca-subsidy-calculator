import type { BenchmarkPremiums } from '~/types/calculator'
import premiumData from '~/data/benchmark-premiums.json'

/**
 * get benchmark premium for a given state and age
 * uses base age brackets with state cost factors and linear interpolation
 */
export function getBenchmarkPremium(state: string, age: number): number {
  const data = premiumData as BenchmarkPremiums
  
  // get base premiums by age bracket
  const basePremiums = data.age_brackets
  const stateFactor = data.state_cost_factors[state] || 1.0
  
  // get age brackets sorted
  const ages = Object.keys(basePremiums).map(Number).sort((a, b) => a - b)
  
  if (ages.length === 0) {
    return 0
  }
  
  const minAge = ages[0]!
  const maxAge = ages[ages.length - 1]!
  
  // if age is below minimum, use minimum bracket
  if (age <= minAge) {
    const basePremium = basePremiums[minAge.toString()] || 0
    return Math.round(basePremium * stateFactor)
  }
  
  // if age is above maximum, use maximum bracket
  if (age >= maxAge) {
    const basePremium = basePremiums[maxAge.toString()] || 0
    return Math.round(basePremium * stateFactor)
  }
  
  // find the two brackets to interpolate between
  let lowerAge = minAge
  let upperAge = maxAge
  
  for (let i = 0; i < ages.length - 1; i++) {
    const currentAge = ages[i]!
    const nextAge = ages[i + 1]!
    
    if (age >= currentAge && age <= nextAge) {
      lowerAge = currentAge
      upperAge = nextAge
      break
    }
  }
  
  // linear interpolation
  const lowerPremium = basePremiums[lowerAge.toString()] || 0
  const upperPremium = basePremiums[upperAge.toString()] || 0
  const ratio = (age - lowerAge) / (upperAge - lowerAge)
  const basePremium = lowerPremium + (upperPremium - lowerPremium) * ratio
  
  // apply state cost factor and round
  return Math.round(basePremium * stateFactor)
}

/**
 * calculate benchmark premium for multiple people
 * uses the second-oldest person's age (ACA rule)
 */
export function getHouseholdBenchmarkPremium(state: string, ages: number[]): number {
  if (ages.length === 0) return 0
  
  // sort ages descending
  const sortedAges = [...ages].sort((a, b) => b - a)
  
  // for single person, use their age
  if (sortedAges.length === 1) {
    const age = sortedAges[0]
    if (age === undefined) return 0
    return getBenchmarkPremium(state, age)
  }
  
  // for multiple people, use second-oldest person's age
  const secondOldestAge = sortedAges[1]
  if (secondOldestAge === undefined) return 0
  return getBenchmarkPremium(state, secondOldestAge)
}

