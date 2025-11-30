import type { BenchmarkPremiums } from '~/types/calculator'
import premiumData from '~/data/benchmark-premiums.json'

/**
 * get benchmark premium for a given state and age
 * uses age brackets (finds closest age bracket)
 */
export function getBenchmarkPremium(state: string, age: number): number {
  const data = premiumData as BenchmarkPremiums
  const stateData = data[state]
  
  if (!stateData) {
    console.warn(`No premium data found for state: ${state}`)
    return 0
  }
  
  // find closest age bracket
  const ages = Object.keys(stateData).map(Number).sort((a, b) => a - b)
  
  // if age is below minimum, use minimum
  if (age < ages[0]) {
    return stateData[ages[0].toString()] || 0
  }
  
  // if age is above maximum, use maximum
  if (age > ages[ages.length - 1]) {
    return stateData[ages[ages.length - 1].toString()] || 0
  }
  
  // find closest bracket
  let closestAge = ages[0]
  for (const bracketAge of ages) {
    if (bracketAge <= age) {
      closestAge = bracketAge
    } else {
      break
    }
  }
  
  return stateData[closestAge.toString()] || 0
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
    return getBenchmarkPremium(state, sortedAges[0])
  }
  
  // for multiple people, use second-oldest person's age
  const secondOldestAge = sortedAges[1]
  return getBenchmarkPremium(state, secondOldestAge)
}

