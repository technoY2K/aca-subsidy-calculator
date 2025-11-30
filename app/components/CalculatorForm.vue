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
      <UFormField label="State" name="state" required>
        <USelect
          v-model="formData.state"
          :items="states"
          placeholder="Select your state"
        />
      </UFormField>

      <!-- number of people selection -->
      <UFormField label="How many people are on the plan?" name="householdSize" required>
        <USelect
          v-model="numberOfPeople"
          :items="peopleCountOptions"
          placeholder="Select number of people"
        />
      </UFormField>

      <!-- ages input based on number of people -->
      <UFormField v-if="numberOfPeople && numberOfPeople > 0" label="Age(s)" name="ages" required>
        <div class="space-y-3 mt-3">
          <div
            v-for="(age, index) in dynamicAges"
            :key="index"
            class="space-y-1"
          >
            <label class="text-sm font-medium text-gray-300 block">
              Person {{ index + 1 }}
            </label>
            <UInput
              v-model.number="dynamicAges[index]"
              type="number"
              :placeholder="`Age: e.g., ${index === 0 ? '35' : index === 1 ? '32' : '8'}`"
              min="0"
              max="64"
            />
          </div>
        </div>
      </UFormField>

      <!-- annual income -->
      <UFormField :label="`Annual Household Income (for ${householdSize} ${householdSize === 1 ? 'person' : 'people'})`" name="income" required>
        <UInput
          :model-value="formattedIncome"
          type="text"
          placeholder="$65,000"
          prefix="$"
          @input="handleIncomeInput"
        />
      </UFormField>

      <!-- optional current premium -->
      <UFormField label="Current Monthly Premium (Optional)" name="currentPremium">
        <UInput
          v-model.number="formData.currentMonthlyPremium"
          type="number"
          placeholder="$0"
          min="0"
          prefix="$"
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
const dynamicAges = ref<number[]>([])

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

// compute household size based on filled ages
const householdSize = computed(() => {
  return dynamicAges.value.filter(age => (age ?? 0) > 0).length
})

// get actual ages array (filter out zeros)
const actualAges = computed(() => {
  return dynamicAges.value.filter((age): age is number => (age ?? 0) > 0)
})

const isFormValid = computed(() => {
  if (!numberOfPeople.value || numberOfPeople.value < 1 || formData.state === '' || formData.annualIncome <= 0) {
    return false
  }
  
  // validate that we have the right number of ages and they're all valid
  if (dynamicAges.value.length !== numberOfPeople.value) {
    return false
  }
  
  // all ages must be between 1 and 64
  return dynamicAges.value.every(age => {
    const ageValue = age ?? 0
    return ageValue > 0 && ageValue <= 64
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

// watch number of people and update dynamic ages array
watch(numberOfPeople, (newCount) => {
  if (newCount && typeof newCount === 'number' && newCount > 0) {
    // resize array to match number of people
    dynamicAges.value = Array(newCount).fill(0)
  } else {
    dynamicAges.value = []
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
  dynamicAges.value = []
  
  // emit reset event to parent
  emit('reset')
}
</script>

