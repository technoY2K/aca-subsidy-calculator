<template>
  <UCard class="border-2 border-gray-700">
    <template #header>
      <h2 class="text-2xl font-bold text-white">What You Can Do</h2>
    </template>

    <div class="space-y-6">
      <!-- contact representatives -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-xl font-semibold text-white mb-3">
          1. Contact Your Representatives
        </h3>
        <p class="text-gray-300 mb-4">
          Tell them to extend enhanced ACA subsidies before December 31, 2025.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <UButton
            to="https://www.house.gov/representatives/find-your-representative"
            target="_blank"
            color="primary"
            variant="solid"
            external
            block
          >
            Find Your Representative
          </UButton>
          <UButton
            to="https://www.senate.gov/senators/senators-contact.htm"
            target="_blank"
            color="primary"
            variant="solid"
            external
            block
          >
            Find Your Senators
          </UButton>
        </div>
        
        <details class="mt-4">
          <summary class="cursor-pointer text-emerald-400 hover:text-emerald-300 font-medium mb-2">
            Show sample message
          </summary>
          <div class="mt-3 p-4 bg-gray-900 rounded border border-gray-700">
            <p class="text-gray-300 mb-3">
              "{{ sampleMessage }}"
            </p>
            <UButton
              color="success"
              variant="ghost"
              size="sm"
              @click="copyMessage"
            >
              Copy to clipboard
            </UButton>
          </div>
        </details>
      </div>

      <!-- explore alternatives -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-xl font-semibold text-white mb-3">
          2. Explore Alternatives Now
        </h3>
        <ul class="space-y-2 text-gray-300">
          <li>
            • <UButton
              to="https://www.medicaid.gov/state-overviews/index.html"
              target="_blank"
              color="neutral"
              variant="ghost"
              size="sm"
              external
            >
              Check Medicaid eligibility
            </UButton>
          </li>
          <li>• Explore employer coverage options</li>
          <li>
            • <UButton
              to="https://findahealthcenter.hrsa.gov/"
              target="_blank"
              color="neutral"
              variant="ghost"
              size="sm"
              external
            >
              Find community health centers
            </UButton>
          </li>
        </ul>
      </div>

      <!-- prepare budget -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-xl font-semibold text-white mb-3">
          3. Prepare Your Budget
        </h3>
        <p class="text-gray-300">
          If subsidies expire, plan for ${{ formatCurrency(monthlyIncrease) }}/month increase starting January 2026.
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  annualIncrease: number
  monthlyIncrease: number
  state: string
}>()

const sampleMessage = computed(() => {
  return `I urge you to extend the enhanced ACA subsidies beyond 2025. Without action, my health insurance premiums will increase by $${props.annualIncrease.toLocaleString()} per year, making coverage unaffordable for my family.`
})

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

async function copyMessage() {
  try {
    await navigator.clipboard.writeText(sampleMessage.value)
    // TODO: show toast notification
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}
</script>
