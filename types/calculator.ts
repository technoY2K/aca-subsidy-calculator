// type definitions for calculator data structures

export interface FPLData {
  householdSize: {
    [key: string]: number // household size -> FPL amount
  }
}

export interface BenchmarkPremiums {
  age_brackets: {
    [age: string]: number // age bracket -> base monthly premium
  }
  state_cost_factors: {
    [state: string]: number // state -> cost adjustment factor
  }
}

export interface SubsidyFormulas {
  enhanced: {
    [fplPercent: string]: number // FPL percentage -> premium cap percentage
  }
  original: {
    [fplPercent: string]: number // FPL percentage -> premium cap percentage
  }
}

export interface CalculatorInputs {
  state: string
  ages: number[] // 1-4 people, ages 0-64
  annualIncome: number
  currentMonthlyPremium?: number // optional for comparison
}

export interface CalculatorResults {
  householdSize: number
  fplPercentage: number
  benchmarkPremium: number
  currentSubsidy: number
  currentMonthlyPremium: number
  expiredSubsidy: number
  expiredMonthlyPremium: number
  monthlyIncrease: number
  annualIncrease: number
}

