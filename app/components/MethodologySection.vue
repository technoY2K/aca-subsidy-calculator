<template>
  <UCard class="border-2 border-gray-700">
    <details class="group">
      <summary class="cursor-pointer text-xl font-semibold text-white mb-4 list-none">
        <div class="flex items-center justify-between">
          <span>Methodology & Data Sources</span>
          <span class="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
        </div>
      </summary>
      
      <div class="space-y-4 pt-4 text-gray-300">
        <!-- data sources -->
        <div>
          <h4 class="font-semibold text-white mb-2">Data Sources</h4>
          <ul class="space-y-1 text-sm">
            <li>
              • <strong>Federal Poverty Level:</strong> 
              <UButton
                to="https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines"
                target="_blank"
                color="neutral"
                variant="ghost"
                size="xs"
                external
              >
                2025 Federal Poverty Guidelines (ASPE)
              </UButton>
            </li>
            <li>
              • <strong>Benchmark Premiums:</strong> Based on 
              <UButton
                to="https://www.cms.gov/cciio/resources/data-resources/marketplace-puf"
                target="_blank"
                color="neutral"
                variant="ghost"
                size="xs"
                external
              >
                2025 CMS Marketplace Public Use Files
              </UButton>
              with state cost adjustment factors
            </li>
            <li>
              • <strong>Subsidy Formulas:</strong> 
              <UButton
                to="https://www.irs.gov/affordable-care-act/individuals-and-families/the-premium-tax-credit"
                target="_blank"
                color="neutral"
                variant="ghost"
                size="xs"
                external
              >
                IRS Premium Tax Credit documentation
              </UButton>
            </li>
          </ul>
        </div>

        <!-- calculation methods -->
        <div>
          <h4 class="font-semibold text-white mb-2">How We Calculate</h4>
          <ul class="space-y-1 text-sm">
            <li>• Benchmark premiums use age brackets (21, 27, 30, 40, 50, 60, 64) with linear interpolation for ages between brackets</li>
            <li>• State cost factors adjust premiums based on regional healthcare costs</li>
            <li>• Subsidies calculated using income-based percentage caps (enhanced ACA: 0-8.5%, original ACA: 2-9.5%)</li>
            <li>• For households with multiple people, we use the second-oldest person's age (ACA rule)</li>
          </ul>
        </div>

        <!-- limitations -->
        <div>
          <h4 class="font-semibold text-white mb-2">Limitations</h4>
          <ul class="space-y-1 text-sm">
            <li>• Estimates based on average benchmark premiums; actual premiums vary by county and plan availability</li>
            <li>• Assumes second-lowest-cost Silver plan pricing</li>
            <li>• Does not include cost-sharing reductions (CSRs) or plan-specific costs</li>
            <li>• For informational purposes only; verify with 
              <UButton
                to="https://www.healthcare.gov/"
                target="_blank"
                color="neutral"
                variant="ghost"
                size="xs"
                external
              >
                healthcare.gov
              </UButton>
              for actual premiums
            </li>
          </ul>
        </div>
      </div>
    </details>
  </UCard>
</template>

<script setup lang="ts">
// no props needed - static content
</script>

