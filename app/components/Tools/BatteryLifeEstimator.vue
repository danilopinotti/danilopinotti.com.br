<template>
  <div>
    <p class="mb-6 text-base-content/70">Calculate an estimate of the battery life time of IoT devices.</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Left column: inputs -->
      <div class="flex flex-col gap-4">

        <!-- Battery -->
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:battery-full" class="text-green-600" />
              Battery
            </h2>

            <div>
              <label class="label mb-1 text-base-content font-medium">Battery Capacity (mAh)</label>
              <div class="join w-full">
                <input type="number" step="100" min="0"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="batteryCapacityMAh">
                <span class="btn join-item pointer-events-none">mAh</span>
              </div>
            </div>

            <div>
              <label class="label mb-1 text-base-content font-medium">Battery Self-Discharging Rate (% per year)</label>
              <div class="join w-full">
                <input type="number" step="1" min="0" max="100"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="batterySelfDischargingPercentageYear">
                <span class="btn join-item pointer-events-none whitespace-nowrap">% / year</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="badge badge-ghost text-xs">
                  ≈ <strong class="mx-1">{{ (mAhSelfDischargingByHour).toFixed(3) }}</strong> mA constantly
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Mode -->
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:lightbulb" class="text-yellow-500" />
              Consumption in Active Mode
            </h2>

            <div>
              <label class="label mb-1 text-base-content font-medium">Average Current (mA)</label>
              <div class="join w-full">
                <input type="number" step="0.01" min="0"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="activeAvgCurrentMa">
                <span class="btn join-item pointer-events-none">mA</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (activeAvgCurrentMa * 1000).toFixed(2) }}</strong> µA</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (activeAvgCurrentMa / 1000).toFixed(4) }}</strong> A</span>
              </div>
            </div>

            <div>
              <label class="label mb-1 text-base-content font-medium">Active Time (ms)</label>
              <div class="join w-full">
                <input type="number" step="1" min="0"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="activeTimeMs">
                <span class="btn join-item pointer-events-none">ms</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (activeTimeMs / 1000).toFixed(2) }}</strong> s</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (activeTimeMs / 1000 / 60).toFixed(2) }}</strong> min</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (activeTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> h</span>
              </div>
            </div>

            <div class="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box mt-4">
              <input type="checkbox">
              <div class="collapse-title text-sm font-medium">
                <Icon name="fa6-solid:rotate" class="mr-1 text-orange-500" />
                Set Occasionally Consumption
                <span class="block font-light text-xs text-base-content/60 mt-0.5">
                  Sometimes you read values in each iteration and, after a number of readings, you transmit them.
                </span>
              </div>
              <div class="collapse-content flex flex-col gap-4 pt-2">
                <div>
                  <label class="label mb-1 text-base-content font-medium">Frequency</label>
                  <div class="join w-full">
                    <span class="btn join-item pointer-events-none text-sm whitespace-nowrap">1 time each</span>
                    <input type="number" step="1" min="0"
                           class="input input-bordered join-item flex-1 text-right"
                           v-model.number="occasionallyActiveEach">
                    <span class="btn join-item pointer-events-none">activations</span>
                  </div>
                </div>

                <div>
                  <label class="label mb-1 text-base-content font-medium">Average Current (mA)</label>
                  <div class="join w-full">
                    <input type="number" step="0.01" min="0"
                           class="input input-bordered join-item flex-1 text-right"
                           v-model.number="occasionallyActiveAvgCurrentMa">
                    <span class="btn join-item pointer-events-none">mA</span>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (occasionallyActiveAvgCurrentMa * 1000).toFixed(2) }}</strong> µA</span>
                    <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (occasionallyActiveAvgCurrentMa / 1000).toFixed(4) }}</strong> A</span>
                  </div>
                </div>

                <div>
                  <label class="label mb-1 text-base-content font-medium">Active Time (ms)</label>
                  <div class="join w-full">
                    <input type="number" step="1" min="0"
                           class="input input-bordered join-item flex-1 text-right"
                           v-model.number="occasionallyActiveTimeMs">
                    <span class="btn join-item pointer-events-none">ms</span>
                  </div>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (occasionallyActiveTimeMs / 1000).toFixed(2) }}</strong> s</span>
                    <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (occasionallyActiveTimeMs / 1000 / 60).toFixed(2) }}</strong> min</span>
                    <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (occasionallyActiveTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sleep Mode -->
        <div class="card bg-base-100 border border-base-300 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:bed" class="text-blue-800" />
              Consumption in Sleep Mode
            </h2>

            <div>
              <label class="label mb-1 text-base-content font-medium">Average Current (mA)</label>
              <div class="join w-full">
                <input type="number" step="0.01" min="0"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="sleepAvgCurrentMa">
                <span class="btn join-item pointer-events-none">mA</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (sleepAvgCurrentMa * 1000).toFixed(2) }}</strong> µA</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (sleepAvgCurrentMa / 1000).toFixed(4) }}</strong> A</span>
              </div>
            </div>

            <div>
              <label class="label mb-1 text-base-content font-medium">Sleep Time (ms)</label>
              <div class="join w-full">
                <input type="number" step="1" min="0"
                       class="input input-bordered join-item flex-1 text-right"
                       v-model.number="sleepTimeMs">
                <span class="btn join-item pointer-events-none">ms</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-2">
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (sleepTimeMs / 1000).toFixed(2) }}</strong> s</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (sleepTimeMs / 1000 / 60).toFixed(2) }}</strong> min</span>
                <span class="badge badge-ghost text-xs"><strong class="mr-1">{{ (sleepTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column: estimations -->
      <div>
        <div class="card bg-base-100 border border-base-300 shadow-sm sticky top-4">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:hourglass" class="text-purple-400" />
              Estimations
            </h2>

            <div class="flex flex-col divide-y divide-base-200">

              <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-3">
                  <div class="bg-green-50 text-green-500 rounded-xl p-2.5">
                    <Icon name="fa6-solid:calendar-days" class="text-xl" />
                  </div>
                  <div>
                    <p class="text-base font-medium text-base-content">Lifetime</p>
                    <p class="text-sm text-base-content/50">{{ lifetimeDhm }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-green-500/80">{{ (Math.round(lifetimeMonths * 100) / 100).toLocaleString() }}</p>
                  <p class="text-sm text-base-content/50">months</p>
                </div>
              </div>

              <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-3">
                  <div class="bg-blue-50 text-blue-400 rounded-xl p-2.5">
                    <Icon name="fa6-solid:clock" class="text-xl" />
                  </div>
                  <div>
                    <p class="text-base font-medium text-base-content">Total Duration</p>
                    <p class="text-sm text-base-content/50">{{ Math.round(lifetimeSeconds / 3600).toLocaleString() }} hours</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-blue-400/80">{{ Math.round(lifetimeSeconds).toLocaleString() }}</p>
                  <p class="text-sm text-base-content/50">seconds</p>
                </div>
              </div>

              <div class="flex items-center justify-between py-4">
                <div class="flex items-center gap-3">
                  <div class="bg-orange-50 text-orange-400 rounded-xl p-2.5">
                    <Icon name="fa6-solid:bolt" class="text-xl" />
                  </div>
                  <div>
                    <p class="text-base font-medium text-base-content">Battery Drain</p>
                    <p class="text-sm text-base-content/50">{{ (batteryPercentageConsumptionByDay * 30).toFixed(3) }}% per month</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold text-orange-400/80">{{ batteryPercentageConsumptionByDay.toFixed(3) }}%</p>
                  <p class="text-sm text-base-content/50">per day</p>
                </div>
              </div>

            </div>

            <div class="prose prose-sm mt-2">
              <p>
                This was useful for you? Do you have a suggestion? Please, consider submit a PR on
                <a class="link" target="_blank"
                   href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/app/components/Tools/BatteryLifeEstimator.vue">
                  this project on GitHub
                  <Icon name="fa6-brands:github" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const batteryCapacityMAh = ref(2500)
const batterySelfDischargingPercentageYear = ref(0)
const activeAvgCurrentMa = ref(100)
const activeTimeMs = ref(400)

const occasionallyActiveEach = ref(0)
const occasionallyActiveAvgCurrentMa = ref(200)
const occasionallyActiveTimeMs = ref(11000)

const sleepAvgCurrentMa = ref(0.050)
const sleepTimeMs = ref(150000)

const mAhSelfDischargingByHour = computed(() => {
  return batteryCapacityMAh.value * (batterySelfDischargingPercentageYear.value / 100) / 8760
})

const occasionallyActiveFrequency = computed(() => {
  return 1 / occasionallyActiveEach.value
})

const lifetimeSeconds = computed(() => {
  let mAhWhenActive = activeAvgCurrentMa.value * (activeTimeMs.value / 3600000)
  let mAhWhenSleep = sleepAvgCurrentMa.value * (sleepTimeMs.value / 3600000)

  let cycleTimeInHours = (activeTimeMs.value + sleepTimeMs.value) / 3600000

  if (occasionallyActiveEach.value !== 0) {
    let mAhOccasionallyActive = occasionallyActiveAvgCurrentMa.value * (occasionallyActiveTimeMs.value / 3600000)
    let activeTimeMedian = activeTimeMs.value * (1 - occasionallyActiveFrequency.value)
      + occasionallyActiveTimeMs.value * occasionallyActiveFrequency.value

    cycleTimeInHours = (activeTimeMedian + sleepTimeMs.value) / 3600000
    mAhWhenActive = mAhWhenActive * (1 - occasionallyActiveFrequency.value)
      + mAhOccasionallyActive * occasionallyActiveFrequency.value
  }

  let mAhSelfDischargingByCycle = mAhSelfDischargingByHour.value * cycleTimeInHours
  let mAhByCycle = mAhWhenActive + mAhWhenSleep + mAhSelfDischargingByCycle

  let deviceCyclesBatteryCapacity = batteryCapacityMAh.value / mAhByCycle
  return deviceCyclesBatteryCapacity * cycleTimeInHours * 3600
})

const lifetimeMonths = computed(() => {
  return lifetimeSeconds.value / 2629746
})

const batteryPercentageConsumptionByDay = computed(() => {
  return 100 / lifetimeSeconds.value * 86400
})

const lifetimeDhm = computed(() => {
  let seconds = Number(lifetimeSeconds.value)
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor(seconds % (3600 * 24) / 3600)
  const m = Math.floor(seconds % 3600 / 60)

  const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : ''
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes') : ''
  return dDisplay + hDisplay + mDisplay
})
</script>
