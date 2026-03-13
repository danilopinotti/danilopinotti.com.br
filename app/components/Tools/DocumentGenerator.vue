<template>
  <div class="w-full mx-auto">
    <div class="mb-6">
      Generate and Validate Brazilian documents
    </div>

    <p class="text-sm text-warning-content mb-8 flex items-center gap-1.5 bg-warning/20 border border-warning/40 rounded px-3 py-2">
      <Icon name="heroicons:exclamation-triangle" class="h-4 w-4 shrink-0 text-warning" />
      This tool is intended for testing and validation purposes only.
    </p>

    <div class="flex flex-col gap-10">
      <div>
        <h2 class="text-2xl font-bold mb-4">CPF</h2>

        <div class="mb-6 border-l-4 border-success pl-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <h3 class="font-bold text-lg">Generator</h3>
            <button @click="handleGenerateCpf" class="btn btn-success text-base text-white">
              <Icon name="fa6-solid:arrows-rotate" />
              Generate New
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="form-control w-full">
              <div class="join w-full">
                <span class="join-item btn btn-disabled">Masked</span>
                <input type="text" readonly class="input input-bordered join-item w-full"
                       v-model="cpf.generatedMasked"/>
                <SharedButtonsCopy class="join-item btn" :text="cpf.generatedMasked"/>
              </div>
            </div>
            <div class="form-control w-full">
              <div class="join w-full">
                <span class="join-item btn btn-disabled">Unmasked</span>
                <input type="text" readonly class="input input-bordered join-item w-full" v-model="cpf.generatedValue"/>
                <SharedButtonsCopy class="join-item btn" :text="cpf.generatedValue"/>
              </div>
            </div>
          </div>
        </div>

        <div class="border-l-4 border-info pl-4">
          <h3 class="font-bold text-lg mb-2">Validator</h3>
          <div class="form-control w-full">
            <label class="input input-bordered flex items-center gap-2"
                   :class="{'input-error': cpf.isValid === false, 'input-success': cpf.isValid === true}">
              <input
                type="text"
                class="grow"
                placeholder="Paste CPF here to validate"
                v-model="cpf.input"
                @input="handleValidateCpf"
                maxlength="14"
              />
              <span v-if="cpf.isValid === true" class="badge badge-success text-white gap-1">
                <Icon name="fa6-solid:check" /> Valid
              </span>
              <span v-else-if="cpf.isValid === false" class="badge badge-error text-white gap-1">
                <Icon name="fa6-solid:xmark" /> Invalid
              </span>
              <span v-else class="badge badge-ghost">Waiting</span>
            </label>
          </div>
        </div>
      </div>

      <hr class="border-base-300"/>

      <div>
        <h2 class="text-2xl font-bold mb-4">CNPJ</h2>

        <div class="mb-6 border-l-4 border-success pl-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-2">
            <h3 class="font-bold text-lg">Generator</h3>
            <button @click="handleGenerateCnpj" class="btn btn-success text-base text-white">
              <Icon name="fa6-solid:arrows-rotate" />
              Generate New
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="form-control w-full">
              <div class="join w-full">
                <span class="join-item btn btn-disabled">Masked</span>
                <input type="text" readonly class="input input-bordered join-item w-full"
                       v-model="cnpj.generatedMasked"/>
                <SharedButtonsCopy class="join-item btn" :text="cnpj.generatedMasked"/>
              </div>
            </div>
            <div class="form-control w-full">
              <div class="join w-full">
                <span class="join-item btn btn-disabled">Unmasked</span>
                <input type="text" readonly class="input input-bordered join-item w-full" v-model="cnpj.generatedValue"/>
                <SharedButtonsCopy class="join-item btn" :text="cnpj.generatedValue"/>
              </div>
            </div>
          </div>
        </div>

        <div class="border-l-4 border-info pl-4">
          <h3 class="font-bold text-lg mb-2">Validator</h3>
          <div class="form-control w-full">
            <label class="input input-bordered flex items-center gap-2"
                   :class="{'input-error': cnpj.isValid === false, 'input-success': cnpj.isValid === true}">
              <input
                type="text"
                class="grow"
                placeholder="Paste CNPJ here to validate"
                v-model="cnpj.input"
                @input="handleValidateCnpj"
                maxlength="18"
              />
              <span v-if="cnpj.isValid === true" class="badge badge-success text-white gap-1">
                <Icon name="fa6-solid:check" /> Valid
              </span>
              <span v-else-if="cnpj.isValid === false" class="badge badge-error text-white gap-1">
                <Icon name="fa6-solid:xmark" /> Invalid
              </span>
              <span v-else class="badge badge-ghost">Waiting</span>
            </label>
          </div>
        </div>
      </div>

      <div class="prose mt-5">
        <p>
          This was useful for you? Do you have a suggestion? Please, consider submit a PR on
          <a class="link" target="_blank"
             href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/components/Tools/DocumentGenerator.vue">
            this project on GitHub
            <Icon name="fa6-brands:github" />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Utils for document generation/validation
const DocUtils = {
  rand: (n) => Math.floor(Math.random() * n),
  mod: (dividend, divisor) => Math.round(dividend - (Math.floor(dividend / divisor) * divisor)),

  generateCpf() {
    let n = Array(9).fill(0).map(() => this.rand(9))
    let d1 = n.reduce((total, num, i) => total + (num * (10 - i)), 0)
    d1 = 11 - this.mod(d1, 11)
    if (d1 >= 10) d1 = 0

    let d2 = n.reduce((total, num, i) => total + (num * (11 - i)), 0) + (d1 * 2)
    d2 = 11 - this.mod(d2, 11)
    if (d2 >= 10) d2 = 0

    return `${n.join('')}${d1}${d2}`
  },

  generateCnpj() {
    let n = Array(8).fill(0).map(() => this.rand(9))
    n = n.concat([0, 0, 0, 1])

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let d1 = n.reduce((total, num, i) => total + (num * w1[i]), 0)
    d1 = 11 - this.mod(d1, 11)
    if (d1 >= 10) d1 = 0

    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let nWithD1 = [...n, d1]
    let d2 = nWithD1.reduce((total, num, i) => total + (num * w2[i]), 0)
    d2 = 11 - this.mod(d2, 11)
    if (d2 >= 10) d2 = 0

    return `${n.join('')}${d1}${d2}`
  },

  validateCpf(cpf) {
    const clean = cpf.replace(/\D/g, '')
    if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) return false

    let sum = 0
    let remainder
    for (let i = 1; i <= 9; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (11 - i)
    remainder = (sum * 10) % 11
    if ((remainder === 10) || (remainder === 11)) remainder = 0
    if (remainder !== parseInt(clean.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (12 - i)
    remainder = (sum * 10) % 11
    if ((remainder === 10) || (remainder === 11)) remainder = 0

    return remainder === parseInt(clean.substring(10, 11))
  },

  validateCnpj(cnpj) {
    const clean = cnpj.replace(/\D/g, '')
    if (clean.length !== 14 || /^(\d)\1+$/.test(clean)) return false

    let length = clean.length - 2
    let numbers = clean.substring(0, length)
    let digits = clean.substring(length)
    let sum = 0
    let pos = length - 7

    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--
      if (pos < 2) pos = 9
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result !== parseInt(digits.charAt(0))) return false

    length = length + 1
    numbers = clean.substring(0, length)
    sum = 0
    pos = length - 7
    for (let i = length; i >= 1; i--) {
      sum += numbers.charAt(length - i) * pos--
      if (pos < 2) pos = 9
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11

    return result === parseInt(digits.charAt(1))
  }
}

useHead({
  title: 'Danilo Pinotti - Document Generator',
  meta: [
    { name: 'keywords', content: 'cpf,cnpj,document,brasil,brazil' },
    { name: 'description', content: 'Generate and Validate Brazilian documents easily.' },
  ],
})

const cpf = reactive({
  generatedValue: '',
  generatedMasked: '',
  input: '',
  isValid: null
})

const cnpj = reactive({
  generatedValue: '',
  generatedMasked: '',
  input: '',
  isValid: null
})

function handleGenerateCpf() {
  const raw = DocUtils.generateCpf()
  cpf.generatedValue = raw
  cpf.generatedMasked = raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function handleGenerateCnpj() {
  const raw = DocUtils.generateCnpj()
  cnpj.generatedValue = raw
  cnpj.generatedMasked = raw.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

function handleValidateCpf() {
  if (!cpf.input) {
    cpf.isValid = null
    return
  }
  cpf.isValid = DocUtils.validateCpf(cpf.input)
}

function handleValidateCnpj() {
  if (!cnpj.input) {
    cnpj.isValid = null
    return
  }
  cnpj.isValid = DocUtils.validateCnpj(cnpj.input)
}

onMounted(() => {
  handleGenerateCpf()
  handleGenerateCnpj()
})
</script>
