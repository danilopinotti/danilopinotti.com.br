<template>
  <div>
    Calculate an estimate of the battery life time of a IoT devices.

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mt-4">
        <div>
          <h2 class="text-lg font-bold">
            <fa icon="battery-full" class="mr-1 text-green-600"></fa>
            Battery
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Battery Capacity (mAh)</span>
            </label>
            <label class="input-group">
              <input type="number" step="100" min="0" class="input input-bordered text-right"
                     v-model.number="batteryCapacityMAh">
              <span>mAh</span>
            </label>
          </div>
          <div class="form-group mt-4">
            <label class="label">
              <span class="label-text">Battery Self-Discharging Rate (% per year)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <label class="input-group w-min">
                <input type="number" step="1" min="0" max="100" class="input input-bordered text-right"
                       v-model.number="batterySelfDischargingPercentageYear">
                <span class="whitespace-nowrap">% per year</span>
              </label>

              <div class="ml-0 mt-2 md:mt-0 md:ml-4 grid grid-cols-2 text-sm">
                <div class="mr-2 rounded-md shadow-md p-3 text-center items-center bg-white">
                  like <strong>{{ (mAhSelfDischargingByHour*60).toFixed(2) }}</strong> mA constantly
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <h2 class="text-lg font-bold">
            <fa icon="lightbulb" class="mr-1 text-yellow-500"></fa>
            Consumption in Active Mode
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Average Current (mA)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <label class="input-group w-min">
                <input type="number" step="0.01" min="0" class="input input-bordered text-right"
                       v-model.number="activeAvgCurrentMa">
                <span>mA</span>
              </label>
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
              <label class="input-group w-min">
                <input type="number" step="1" min="0" class="input input-bordered text-right"
                       v-model.number="activeTimeMs">
                <span>ms</span>
              </label>
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
                <label class="input-group">
                  <span>1 time each</span>
                  <input type="number" step="1" min="0" class="input input-bordered text-right"
                         v-model.number="occasionallyActiveEach">
                  <span>activations</span>
                </label>
              </div>

              <div class="form-group mt-4">
                <label class="label">
                  <span class="label-text">Average Current (mA)</span>
                </label>
                <div class="flex items-left md:items-center flex-col md:flex-row">
                  <label class="input-group w-min">
                    <input type="number" step="0.01" min="0" class="input input-bordered text-right"
                           v-model.number="occasionallyActiveAvgCurrentMa">
                    <span>mA</span>
                  </label>
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
                  <label class="input-group w-min">
                    <input type="number" step="1" min="0" class="input input-bordered text-right"
                           v-model.number="occasionallyActiveTimeMs">
                    <span>ms</span>
                  </label>
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
            <fa icon="bed" class="mr-1 text-blue-800"></fa>
            Consumption in Sleep Mode
          </h2>
          <hr>
          <div class="form-group">
            <label class="label">
              <span class="label-text">Average Current (mA)</span>
            </label>
            <div class="flex items-left md:items-center flex-col md:flex-row">
              <label class="input-group w-min">
                <input type="number" step="0.01" min="0" class="input input-bordered text-right"
                       v-model.number="sleepAvgCurrentMa">
                <span>mA</span>
              </label>
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
              <label class="input-group w-min">
                <input type="number" step="1" min="0" class="input input-bordered text-right"
                       v-model.number="sleepTimeMs">
                <span>ms</span>
              </label>
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
          <fa icon="hourglass" class="mr-1 text-purple-700"></fa>
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
              <fa :icon="['fab', 'github']"></fa>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryLifeEstimator",

  computed: {
    mAhSelfDischargingByHour() {
      return this.batteryCapacityMAh * (this.batterySelfDischargingPercentageYear / 8760 / 100);
    },

    batteryPercentageConsumptionByDay() {
      return 100 / this.lifetimeSeconds * 86400;
    },

    occasionallyActiveFrequency() {
      return 1 / this.occasionallyActiveEach;
    },

    lifetimeSeconds() {
      let mAhWhenActive = this.activeAvgCurrentMa * (this.activeTimeMs / 3600000);
      let mAhWhenSleep = this.sleepAvgCurrentMa * (this.sleepTimeMs / 3600000);

      let cycleTimeInHours = (this.activeTimeMs + this.sleepTimeMs) / 3600000;

      if (this.occasionallyActiveEach !== 0) {
        let mAhOccasionallyActive = this.occasionallyActiveAvgCurrentMa * (this.occasionallyActiveTimeMs / 3600000);
        let activeTimeMedian = this.activeTimeMs * (1 - this.occasionallyActiveFrequency)
          + this.occasionallyActiveTimeMs * this.occasionallyActiveFrequency;

        cycleTimeInHours = (activeTimeMedian + this.sleepTimeMs) / 3600000;
        mAhWhenActive = mAhWhenActive * (1 - this.occasionallyActiveFrequency)
          + mAhOccasionallyActive * this.occasionallyActiveFrequency;
      }

      let mAhSelfDischargingByCycle = this.mAhSelfDischargingByHour / cycleTimeInHours;
      let mAhByCycle = mAhWhenActive + mAhWhenSleep + mAhSelfDischargingByCycle;

      let deviceCyclesBatteryCapacity = this.batteryCapacityMAh / mAhByCycle;
      return deviceCyclesBatteryCapacity * cycleTimeInHours * 3600;
    },

    lifetimeMonths() {
      return this.lifetimeSeconds / 2629746;
    },

    lifetimeDhm() {
      let seconds = Number(this.lifetimeSeconds);
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor(seconds % (3600 * 24) / 3600);
      const m = Math.floor(seconds % 3600 / 60);

      const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes") : "";
      return dDisplay + hDisplay + mDisplay;
    },
  },

  data() {
    return {
      batteryCapacityMAh: 2500,
      batterySelfDischargingPercentageYear: 0,
      activeAvgCurrentMa: 109.197271,
      activeTimeMs: 3877,

      occasionallyActiveEach: 0,
      occasionallyActiveAvgCurrentMa: 109.197271,
      occasionallyActiveTimeMs: 3877,

      sleepAvgCurrentMa: 0.025,
      sleepTimeMs: 900000,
    }
  },
}
</script>

<style scoped>

</style>
