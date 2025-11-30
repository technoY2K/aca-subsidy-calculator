<template>
  <UCard class="border-2 border-gray-700">
    <template #header>
      <h2 class="text-2xl font-bold text-white">Take Action</h2>
    </template>

    <div class="space-y-6">
      <!-- contact representatives -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">
          Contact Your Representatives
        </h3>
        <p class="text-gray-300 mb-3">
          Let your elected officials know how this affects you.
        </p>
        <UButton
          to="https://www.congress.gov/members/find-your-member"
          target="_blank"
          color="primary"
          variant="outline"
          external
        >
          Find Your Members of Congress
        </UButton>
        <div class="mt-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
          <p class="text-sm font-medium text-gray-200 mb-2">Sample Message:</p>
          <p class="text-sm text-gray-300 italic">
            "Enhanced ACA subsidies are set to expire on December 31, 2025. If these subsidies expire, my health insurance premiums will increase by $[YOUR ANNUAL INCREASE] per year. I urge you to support legislation that extends these critical subsidies to keep healthcare affordable for millions of Americans."
          </p>
        </div>
      </div>

      <!-- explore alternatives -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">
          Explore Alternatives
        </h3>
        <div class="space-y-2">
          <UButton
            to="https://www.healthcare.gov/"
            target="_blank"
            color="neutral"
            variant="outline"
            external
            block
          >
            Visit Healthcare.gov
          </UButton>
          <p class="text-sm text-gray-300">
            Check Medicaid eligibility and explore other coverage options.
          </p>
          <p class="text-sm text-gray-300">
            Community health centers may offer affordable care options in your area.
          </p>
        </div>
      </div>

      <!-- stay informed -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-3">
          Stay Informed
        </h3>
        <div class="space-y-2">
          <UButton
            to="https://www.kff.org/"
            target="_blank"
            color="neutral"
            variant="ghost"
            external
          >
            Kaiser Family Foundation (KFF)
          </UButton>
          <UButton
            to="https://familiesusa.org/"
            target="_blank"
            color="neutral"
            variant="ghost"
            external
          >
            Families USA
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>

