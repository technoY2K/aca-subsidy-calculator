<template>
  <UCard data-results class="bg-gray-900 border-2 border-gray-700">
    <template #header>
      <h2 class="text-2xl font-bold text-white">Your Results</h2>
    </template>

    <div class="space-y-6">
      <!-- current subsidy and premium -->
      <div class="space-y-2">
        <p class="text-gray-300">
          Your current estimated monthly subsidy:
        </p>
        <p class="text-2xl font-semibold text-white">
          ${{ formatCurrency(results.currentSubsidy) }}
        </p>
        <div class="bg-green-900/30 border border-green-600 rounded-lg p-3 mt-2">
          <p class="text-sm text-gray-200">
            This is what the federal government covers toward your premium each month.
          </p>
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-gray-300">
          Your current estimated monthly premium:
        </p>
        <p class="text-2xl font-semibold text-white">
          ${{ formatCurrency(results.currentMonthlyPremium) }}
        </p>
        <div class="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 mt-2">
          <p class="text-sm text-gray-200">
            This is what you actually pay monthly after the subsidy.
          </p>
        </div>
      </div>

      <!-- expired premium -->
      <div class="space-y-2">
        <p class="text-gray-300">
          If subsidies expire, your monthly premium:
        </p>
        <p class="text-2xl font-semibold text-white">
          ${{ formatCurrency(results.expiredMonthlyPremium) }}
        </p>
      </div>

      <!-- cost increase - highlighted -->
      <div class="bg-red-900/30 border-2 border-red-600 rounded-lg p-6 space-y-2">
        <p class="text-gray-200 font-medium">
          Your monthly increase:
        </p>
        <p class="text-4xl font-bold text-red-400">
          ${{ formatCurrency(results.monthlyIncrease) }}
        </p>
        <p class="text-gray-200 font-medium">
          Your annual increase:
        </p>
        <p class="text-4xl font-bold text-red-400">
          ${{ formatCurrency(results.annualIncrease) }}
        </p>
      </div>

      <!-- explanation -->
      <div class="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <p class="text-sm text-gray-200">
          Enhanced ACA subsidies expire December 31, 2025. Without Congressional action, your premiums could increase significantly in 2026.
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { CalculatorResults } from '~/types/calculator'

defineProps<{
  results: CalculatorResults
}>()

function formatCurrency(amount: number): string {
  return amount.toFixed(2)
}
</script>

