<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <UContainer>
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- header -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-white mb-4">
            ACA Subsidy Expiration Calculator
          </h1>
          <p class="text-lg text-gray-300">
            See how much your health insurance premiums could increase when enhanced ACA subsidies expire on December 31, 2025.
          </p>
        </div>

        <!-- context explainer -->
        <div class="bg-blue-900/30 border border-blue-600 rounded-lg p-6 mb-8">
          <p class="text-gray-200 text-lg leading-relaxed">
            Enhanced ACA subsidies that lower your premiums expire December 31, 2025. Use this calculator to see your potential cost increase.
          </p>
        </div>

        <!-- calculator form -->
        <CalculatorForm 
          :show-reset="!!results" 
          @calculate="handleCalculate"
          @reset="handleReset"
        />

        <!-- results -->
        <CalculatorResults
          v-if="results"
          :results="results"
        />

        <!-- action steps -->
        <ActionSteps
          v-if="results"
          :annual-increase="results.annualIncrease"
          :monthly-increase="results.monthlyIncrease"
          :state="formState"
        />

        <!-- methodology -->
        <MethodologySection />

        <!-- footer attribution -->
        <div class="pt-8">
          <USeparator />
          <div class="text-center mt-6">
            <ULink 
              to="https://www.kevia.me" 
              external
              class="text-gray-400 text-sm hover:text-gray-300 transition-colors"
            >
              Built By technoY2K
            </ULink>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { CalculatorInputs, CalculatorResults } from '~/types/calculator'
import { calculateResults } from '~/utils/calculations'

const results = ref<CalculatorResults | null>(null)
const formState = ref<string>('')

function handleCalculate(inputs: CalculatorInputs) {
  try {
    formState.value = inputs.state
    results.value = calculateResults(inputs)
    
    // scroll to results after render
    nextTick(() => {
      const resultsElement = document.querySelector('[data-results]')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } catch (error) {
    console.error('Calculation error:', error)
    // TODO: show error message to user
  }
}

function handleReset() {
  results.value = null
  formState.value = ''
}
</script>

