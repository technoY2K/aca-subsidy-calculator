<template>
  <UCard class="border-2 border-gray-700">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white">Calculate Your Premium Increase</h2>
        <UButton
          v-if="props.showReset"
          color="error"
          variant="outline"
          size="sm"
          @click="handleReset"
        >
          Reset
        </UButton>
      </div>
    </template>

    <div class="space-y-6">
      <!-- state selection -->
      <UFormField name="state" required>
        <template #label>
          <span class="text-base font-semibold text-white">State</span>
        </template>
        <USelect
          v-model="formData.state"
          :items="states"
          placeholder="Select your state"
        />
      </UFormField>

      <!-- number of people selection -->
      <UFormField name="householdSize" required>
        <template #label>
          <span class="text-base font-semibold text-white">How many people are on the plan?</span>
        </template>
        <USelect
          v-model="numberOfPeople"
          :items="peopleCountOptions"
          placeholder="Select number of people"
        />
      </UFormField>

      <!-- age ranges based on number of people -->
      <UFormField v-if="numberOfPeople && numberOfPeople > 0" name="ages" required>
        <template #label>
          <span class="text-base font-semibold text-white">Age(s)*</span>
        </template>
        <div class="space-y-8 mt-4">
          <div
            v-for="(ageRange, index) in dynamicAgeRanges"
            :key="index"
            class="space-y-2"
          >
            <label class="text-sm font-medium text-gray-300 block">
              Member {{ index + 1 }}
            </label>
            <div class="grid grid-cols-2 gap-2">
              <URadioGroup
                v-model="dynamicAgeRanges[index]"
                :items="ageRangeOptionsColumn1"
                orientation="vertical"
                variant="table"
              />
              <URadioGroup
                v-model="dynamicAgeRanges[index]"
                :items="ageRangeOptionsColumn2"
                orientation="vertical"
                variant="table"
              />
            </div>
          </div>
        </div>
      </UFormField>

      <!-- annual income -->
      <UFormField name="income" required>
        <template #label>
          <span class="text-base font-semibold text-white">Annual Household Income (for {{ householdSize }} {{ householdSize === 1 ? 'person' : 'people' }})</span>
        </template>
        <UInput
          :model-value="formattedIncome"
          type="text"
          inputmode="numeric"
          placeholder="$65,000"
          prefix="$"
          :ui="{ base: 'text-base' }"
          @input="handleIncomeInput"
        />
      </UFormField>

      <!-- optional current premium -->
      <UFormField name="currentPremium">
        <template #label>
          <span class="text-base font-semibold text-white">Current Monthly Premium (Optional)</span>
        </template>
        <UInput
          v-model.number="formData.currentMonthlyPremium"
          type="number"
          placeholder="$0"
          min="0"
          prefix="$"
          :ui="{ base: 'text-base' }"
        />
        <template #hint>
          For comparison/validation purposes
        </template>
      </UFormField>

      <!-- calculate button -->
      <UButton
        color="warning"
        size="lg"
        block
        :disabled="!isFormValid"
        @click="handleCalculate"
      >
        Show My Premium Increase
      </UButton>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type { CalculatorInputs } from '~/types/calculator'

const props = defineProps<{
  showReset?: boolean
}>()

const emit = defineEmits<{
  calculate: [inputs: CalculatorInputs]
  reset: []
}>()

const formData = reactive<CalculatorInputs>({
  state: '',
  ages: [0, 0, 0, 0], // always 4 slots, but only use what's needed
  annualIncome: 0,
  currentMonthlyPremium: undefined
})

const formattedIncome = ref('')
const numberOfPeople = ref<number | undefined>(undefined)
const dynamicAgeRanges = ref<string[]>([])

// age range options with midpoint values for calculations
const ageRangeOptions = [
  { label: 'Under 21', value: 'under-21' },
  { label: '21-29', value: '21-29' },
  { label: '30-39', value: '30-39' },
  { label: '40-49', value: '40-49' },
  { label: '50-59', value: '50-59' },
  { label: '60-64', value: '60-64' },
]

// split into two columns for 2-column layout
const ageRangeOptionsColumn1 = ageRangeOptions.slice(0, 3)
const ageRangeOptionsColumn2 = ageRangeOptions.slice(3)

// map age ranges to midpoint ages
const ageRangeToMidpoint: Record<string, number> = {
  'under-21': 20, // midpoint of 0-20 range
  '21-29': 25,    // midpoint of 21-29
  '30-39': 35,    // midpoint of 30-39
  '40-49': 45,    // midpoint of 40-49
  '50-59': 55,    // midpoint of 50-59
  '60-64': 62,    // midpoint of 60-64
}

const peopleCountOptions = [
  { label: '1 person', value: 1 },
  { label: '2 people', value: 2 },
  { label: '3 people', value: 3 },
  { label: '4 people', value: 4 },
  { label: '5 people', value: 5 },
  { label: '6 people', value: 6 },
  { label: '7 people', value: 7 },
]

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
].map(state => ({ label: state, value: state }))

// compute household size based on selected age ranges
const householdSize = computed(() => {
  return dynamicAgeRanges.value.filter(range => range && range !== '').length
})

// convert age ranges to midpoint ages for calculations
const actualAges = computed(() => {
  return dynamicAgeRanges.value
    .filter((range): range is string => Boolean(range && range !== ''))
    .map(range => ageRangeToMidpoint[range] || 0)
    .filter(age => age > 0)
})

const isFormValid = computed(() => {
  if (!numberOfPeople.value || numberOfPeople.value < 1 || formData.state === '' || formData.annualIncome <= 0) {
    return false
  }
  
  // validate that we have the right number of age ranges and they're all selected
  if (dynamicAgeRanges.value.length !== numberOfPeople.value) {
    return false
  }
  
  // all age ranges must be selected and valid
  return dynamicAgeRanges.value.every(range => {
    return range && range !== '' && ageRangeToMidpoint[range] !== undefined
  })
})

// format income with commas as user types
function handleIncomeInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '') // remove all non-digits
  
  if (value === '') {
    formattedIncome.value = ''
    formData.annualIncome = 0
    return
  }
  
  const numValue = parseInt(value, 10)
  formData.annualIncome = numValue
  
  // format with commas
  formattedIncome.value = numValue.toLocaleString('en-US')
}

// watch number of people and update dynamic age ranges array
watch(numberOfPeople, (newCount) => {
  if (newCount && typeof newCount === 'number' && newCount > 0) {
    // resize array to match number of people
    dynamicAgeRanges.value = Array(newCount).fill('')
  } else {
    dynamicAgeRanges.value = []
  }
}, { immediate: true })

function handleCalculate() {
  if (isFormValid.value) {
    // send only the actual ages (filter out zeros)
    emit('calculate', {
      ...formData,
      ages: actualAges.value
    })
  }
}

function handleReset() {
  // reset form data
  formData.state = ''
  formData.ages = [0, 0, 0, 0]
  formData.annualIncome = 0
  formData.currentMonthlyPremium = undefined
  formattedIncome.value = ''
  numberOfPeople.value = undefined
  dynamicAgeRanges.value = []
  
  // emit reset event to parent
  emit('reset')
}
</script>

