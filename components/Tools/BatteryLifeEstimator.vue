<template>
  <div>
    Calculate an estimate of the battery life time of IoT devices.

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mt-4">
        <div>
          <h2 class="text-lg font-bold">
            <Icon name="fa6-solid:battery-full" class="mr-1 text-green-600" />
            Battery
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Battery Capacity (mAh)</span>
            </label>
            <div class="join">
              <input type="number" step="100" min="0" class="input input-bordered join-item text-right"
                     v-model.number="batteryCapacityMAh">
              <span class="btn btn-disabled join-item">mAh</span>
            </div>
          </div>
          <div class="form-group mt-4">
            <label class="label">
              <span class="label-text">Battery Self-Discharging Rate (% per year)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <div class="join w-min">
                <input type="number" step="1" min="0" max="100" class="input input-bordered join-item text-right"
                       v-model.number="batterySelfDischargingPercentageYear">
                <span class="btn btn-disabled join-item whitespace-nowrap">% per year</span>
              </div>

              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center items-center bg-white">
                  like <strong>{{ (mAhSelfDischargingByHour).toFixed(3) }}</strong> mA constantly
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h2 class="text-lg font-bold">
            <Icon name="fa6-solid:lightbulb" class="mr-1 text-yellow-500" />
            Consumption in Active Mode
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Average Current (mA)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <div class="join w-min">
                <input type="number" step="0.01" min="0" class="input input-bordered join-item text-right"
                       v-model.number="activeAvgCurrentMa">
                <span class="btn btn-disabled join-item">mA</span>
              </div>
              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center items-center">
                  <strong>{{ (activeAvgCurrentMa * 1000).toFixed(2) }}</strong> µA
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (activeAvgCurrentMa / 1000).toFixed(2) }}</strong> A
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mt-4">
            <label class="label">
              <span class="label-text">Active Time (ms)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <div class="join w-min">
                <input type="number" step="1" min="0" class="input input-bordered join-item text-right"
                       v-model.number="activeTimeMs">
                <span class="btn btn-disabled join-item">ms</span>
              </div>
              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 md:grid-cols-3 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (activeTimeMs / 1000).toFixed(2) }}</strong> Seconds
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (activeTimeMs / 1000 / 60).toFixed(2) }}</strong> Minutes
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center align-middle">
                  <strong>{{ (activeTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> Hours
                </div>
              </div>
            </div>
          </div>

          <div tabindex="0" class="mt-6 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
            <input type="checkbox">
            <div class="collapse-title font-medium">
              Set Occasionally Consumption <br>
              <span class="font-light text-xs">
                Sometimes you read values in each iteration and, after a number of readings, you transmit them.
              </span>
            </div>
            <div class="collapse-content">
              <div class="form-group">
                <label class="label">
                  <span class="label-text">Frequency</span>
                </label>
                <div class="join">
                  <span class="btn btn-disabled join-item">1 time each</span>
                  <input type="number" step="1" min="0" class="input input-bordered join-item text-right"
                         v-model.number="occasionallyActiveEach">
                  <span class="btn btn-disabled join-item">activations</span>
                </div>
              </div>

              <div class="form-group mt-4">
                <label class="label">
                  <span class="label-text">Average Current (mA)</span>
                </label>
                <div class="flex items-left md:items-center flex-col md:flex-row">
                  <div class="join w-min">
                    <input type="number" step="0.01" min="0" class="input input-bordered join-item text-right"
                           v-model.number="occasionallyActiveAvgCurrentMa">
                    <span class="btn btn-disabled join-item">mA</span>
                  </div>
                  <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 text-sm">
                    <div class="mr-2 rounded-md shadow-md p-3 text-center items-center bg-white">
                      <strong>{{ (occasionallyActiveAvgCurrentMa * 1000).toFixed(2) }}</strong> µA
                    </div>
                    <div class="mr-2 rounded-md shadow-md p-3 text-center bg-white">
                      <strong>{{ (occasionallyActiveAvgCurrentMa / 1000).toFixed(2) }}</strong> A
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group mt-4">
                <label class="label">
                  <span class="label-text">Active Time (ms)</span>
                </label>
                <div class="flex items-left md:items-center flex-col md:flex-row">
                  <div class="join w-min">
                    <input type="number" step="1" min="0" class="input input-bordered join-item text-right"
                           v-model.number="occasionallyActiveTimeMs">
                    <span class="btn btn-disabled join-item">ms</span>
                  </div>
                  <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 md:grid-cols-3 text-sm">
                    <div class="mr-2 rounded-md shadow-md p-3 text-center bg-white">
                      <strong>{{ (occasionallyActiveTimeMs / 1000).toFixed(2) }}</strong> Seconds
                    </div>
                    <div class="mr-2 rounded-md shadow-md p-3 text-center bg-white">
                      <strong>{{ (occasionallyActiveTimeMs / 1000 / 60).toFixed(2) }}</strong> Minutes
                    </div>
                    <div class="mr-2 rounded-md shadow-md p-3 text-center align-middle bg-white">
                      <strong>{{ (occasionallyActiveTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> Hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h2 class="text-lg font-bold">
            <Icon name="fa6-solid:bed" class="mr-1 text-blue-800" />
            Consumption in Sleep Mode
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Average Current (mA)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <div class="join w-min">
                <input type="number" step="0.01" min="0" class="input input-bordered join-item text-right"
                       v-model.number="sleepAvgCurrentMa">
                <span class="btn btn-disabled join-item">mA</span>
              </div>
              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 md:grid-cols-3 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (sleepAvgCurrentMa * 1000).toFixed(2) }}</strong> µA
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center"><strong>
                  {{ (sleepAvgCurrentMa / 1000).toFixed(2) }}</strong> A
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mt-4">
            <label class="label">
              <span class="label-text">Sleep Time (ms)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <div class="join w-min">
                <input type="number" step="1" min="0" class="input input-bordered join-item text-right"
                       v-model.number="sleepTimeMs">
                <span class="btn btn-disabled join-item">ms</span>
              </div>
              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 md:grid-cols-3 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (sleepTimeMs / 1000).toFixed(2) }}</strong> Seconds
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (sleepTimeMs / 1000 / 60).toFixed(2) }}</strong> Minutes
                </div>
                <div class="mr-2 rounded-md shadow-md p-3 text-center">
                  <strong>{{ (sleepTimeMs / 1000 / 60 / 60).toFixed(2) }}</strong> Hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-lg font-bold">
          <Icon name="fa6-solid:hourglass" class="mr-1 text-purple-700" />
          Estimations
        </h2>

        <hr class="mb-3">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Months</div>
              <div class="stat-value">{{ (Math.round(lifetimeMonths * 100) / 100).toLocaleString() }}</div>
              <div class="stat-desc font-bold">{{ lifetimeDhm }}</div>
            </div>
          </div>

          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Seconds</div>
              <div class="stat-value">{{ Math.round(lifetimeSeconds).toLocaleString() }}</div>
              <div class="stat-desc font-bold">{{ Math.round(lifetimeSeconds / 60).toLocaleString() }} Hours</div>
            </div>
          </div>

          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Battery Consumption By Day</div>
              <div class="stat-value">
                {{ batteryPercentageConsumptionByDay.toFixed(3) }}%
              </div>
              <div class="stat-desc font-bold">
                {{ (batteryPercentageConsumptionByDay * 30).toFixed(3) }}% by Month
              </div>
            </div>
          </div>
        </div>

        <div class="prose mt-5">
          <p>
            This was useful for you? Do you have a suggestion? Please, consider submit a PR on
            <a class="link"
               target="_blank"
               href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/components/Tools/BatteryLifeEstimator.vue">
              this project on GitHub
              <Icon name="fa6-brands:github" />
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Danilo Pinotti - Battery Life Estimator',
  meta: [
    {
      name: 'keywords',
      content: 'iot, esp32, battery life, battery life estimator, 18650, power consumption, optimization, low power',
    },
    {
      name: 'description',
      content: 'Calculate an estimate of the battery life time of IoT devices.',
    },
  ],
})

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

