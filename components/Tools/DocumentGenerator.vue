<template>
  <div>
    Generate and Validate Brazilian documents.

    <div role="alert" class="alert alert-warning shadow-sm my-6">
      <LazySharedIconsWarning/>
      <span><strong>Warning:</strong> This tool must be used for testing and validation purposes only.</span>
    </div>

    <div class="flex flex-col gap-8">
      <div class="mt-4">
        <h2 class="text-2xl font-bold mb-4">CPF</h2>

        <div class="mb-6 border-l-4 border-success pl-4">
          <div class="w-full flex justify-between items-end mb-2">
            <h3 class="font-bold text-lg">Generator</h3>
            <button @click="generateCpf" class="btn btn-success text-white">
              <fa :icon="['fas', 'arrows-rotate']"></fa>
              Generate New
            </button>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="input input-bordered flex items-center gap-2">
                <span class="text-muted font-bold">Masked</span>
                <input type="text" readonly class="grow" v-model="cpf.generatedMasked"/>
                <CopyButton :text="cpf.generatedMasked"/>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="input input-bordered flex items-center gap-2">
                <span class="text-muted font-bold">Unmasked</span>
                <input type="text" readonly class="grow" v-model="cpf.generatedValue"/>
                <CopyButton :text="cpf.generatedValue"/>
              </label>
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
                class="grow select-all"
                placeholder="Paste CPF here to validate"
                v-model="cpf.input"
                @input="validateCpf"
                maxlength="14"
              />
              <span v-if="cpf.isValid === true" class="badge badge-success text-white"><fa :icon="['fas', 'check']" class="mr-1"/> Valid</span>
              <span v-else-if="cpf.isValid === false" class="badge badge-error text-white"><fa :icon="['fas', 'xmark']" class="mr-1"/> Invalid</span>
              <span v-else class="badge badge-ghost">Waiting</span>
            </label>
          </div>
        </div>
      </div>

      <hr class="border-base-300"/>

      <div class="mt-4">
        <h2 class="text-2xl font-bold mb-4">CNPJ</h2>

        <div class="mb-6 border-l-4 border-success pl-4">
          <div class="w-full flex justify-between items-end mb-2">
            <h3 class="font-bold text-lg">Generator</h3>
            <button @click="generateCnpj" class="btn btn-success text-white">
              <fa :icon="['fas', 'arrows-rotate']"></fa>
              Generate New
            </button>
          </div>
          <div class="flex gap-4">
            <div class="form-control w-full">
              <label class="input input-bordered flex items-center gap-2">
                <span class="text-muted font-bold">Masked</span>
                <input type="text" readonly class="grow" v-model="cnpj.generatedMasked"/>
                <CopyButton :text="cnpj.generatedMasked"/>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="input input-bordered flex items-center gap-2">
                <span class="text-muted font-bold">Unmasked</span>
                <input type="text" readonly class="grow" v-model="cnpj.generatedValue"/>
                <CopyButton :text="cnpj.generatedValue"/>
              </label>
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
                class="grow select-all"
                placeholder="Paste CNPJ here to validate"
                v-model="cnpj.input"
                @input="validateCnpj"
                maxlength="18"
              />
              <span v-if="cnpj.isValid === true" class="badge badge-success text-white"><fa :icon="['fas', 'check']" class="mr-1"/> Valid</span>
              <span v-else-if="cnpj.isValid === false" class="badge badge-error text-white"><fa :icon="['fas', 'xmark']" class="mr-1"/> Invalid</span>
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
            <fa :icon="['fab', 'github']"></fa>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CopyButton from "@/components/Shared/Buttons/Copy.vue";

export default {
  name: "DocumentGenerator",
  components: {CopyButton},

  head() {
    return {
      title: 'Danilo Pinotti - Document Generator',
      meta: [
        {hid: 'keywords', name: 'keywords', content: 'cpf,cnpj,document,brasil,brazil'},
        {hid: "description", name: "description", content: 'Generate and Validate Brazilian documents easily.'}
      ]
    };
  },

  data() {
    return {
      cpf: {
        placeholder: 'CPF',
        generatedValue: '',
        generatedMasked: '',
        input: '',
        isValid: null
      },
      cnpj: {
        placeholder: 'CNPJ',
        generatedValue: '',
        generatedMasked: '',
        input: '',
        isValid: null
      }
    }
  },

  mounted() {
    this.generateCpf();
    this.generateCnpj();
  },

  methods: {
    generateCpf() {
      const rand = (n) => Math.floor(Math.random() * n);
      const mod = (dividend, divisor) => Math.round(dividend - (Math.floor(dividend / divisor) * divisor));
      let n = Array(9).fill(0).map(() => rand(9));
      let d1 = n.reduce((total, num, i) => total + (num * (10 - i)), 0);
      d1 = 11 - mod(d1, 11);
      if (d1 >= 10) d1 = 0;
      let d2 = n.reduce((total, num, i) => total + (num * (11 - i)), 0) + (d1 * 2);
      d2 = 11 - mod(d2, 11);
      if (d2 >= 10) d2 = 0;
      const raw = `${n.join('')}${d1}${d2}`;
      this.cpf.generatedValue = raw;
      this.cpf.generatedMasked = raw.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },

    generateCnpj() {
      const rand = (n) => Math.floor(Math.random() * n);
      const mod = (dividend, divisor) => Math.round(dividend - (Math.floor(dividend / divisor) * divisor));
      let n = Array(8).fill(0).map(() => rand(9));
      n = n.concat([0, 0, 0, 1]);
      let w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let d1 = n.reduce((total, num, i) => total + (num * w1[i]), 0);
      d1 = 11 - mod(d1, 11);
      if (d1 >= 10) d1 = 0;
      let w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      let nWithD1 = [...n, d1];
      let d2 = nWithD1.reduce((total, num, i) => total + (num * w2[i]), 0);
      d2 = 11 - mod(d2, 11);
      if (d2 >= 10) d2 = 0;
      const raw = `${n.join('')}${d1}${d2}`;
      this.cnpj.generatedValue = raw;
      this.cnpj.generatedMasked = raw.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    },

    validateCpf() {
      const clean = this.cpf.input.replace(/\D/g, '');
      if (clean.length === 0) {
        this.cpf.isValid = null;
        return;
      }
      if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) {
        this.cpf.isValid = false;
        return;
      }

      let sum = 0;
      let remainder;
      for (let i = 1; i <= 9; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (11 - i);
      remainder = (sum * 10) % 11;
      if ((remainder === 10) || (remainder === 11)) remainder = 0;
      if (remainder !== parseInt(clean.substring(9, 10))) {
        this.cpf.isValid = false;
        return;
      }

      sum = 0;
      for (let i = 1; i <= 10; i++) sum = sum + parseInt(clean.substring(i - 1, i)) * (12 - i);
      remainder = (sum * 10) % 11;
      if ((remainder === 10) || (remainder === 11)) remainder = 0;

      this.cpf.isValid = remainder === parseInt(clean.substring(10, 11));
    },

    validateCnpj() {
      const clean = this.cnpj.input.replace(/\D/g, '');
      if (clean.length === 0) {
        this.cnpj.isValid = null;
        return;
      }
      if (clean.length !== 14 || /^(\d)\1+$/.test(clean)) {
        this.cnpj.isValid = false;
        return;
      }

      let length = clean.length - 2;
      let numbers = clean.substring(0, length);
      let digits = clean.substring(length);
      let sum = 0;
      let pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(digits.charAt(0))) {
        this.cnpj.isValid = false;
        return;
      }

      length = length + 1;
      numbers = clean.substring(0, length);
      sum = 0;
      pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;

      this.cnpj.isValid = result === parseInt(digits.charAt(1));
    }
  }
}
</script>
