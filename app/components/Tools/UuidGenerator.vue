<template>
  <div class="w-full mx-auto">
    <p class="mb-6">Generate UUIDs in versions 4, 5 and 7</p>

    <div class="flex flex-col gap-8">
      <!-- V4 -->
      <div class="border-l-4 border-success pl-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-2">
          <h2 class="text-xl font-bold">Version 4 <span class="text-sm font-normal text-gray-500">— Random</span></h2>
          <div class="flex gap-2">
            <button class="btn btn-success text-white" @click="generateV4">
              <Icon name="fa6-solid:arrows-rotate" />
              Generate
            </button>
            <button class="btn btn-success text-white" @click="generateAndCopyV4">
              <Icon :name="copied.v4 ? 'fa6-solid:check' : 'fa6-solid:copy'" />
              {{ copied.v4 ? 'Copied!' : 'Generate & Copy' }}
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mb-4">Fully random — generated from a cryptographically secure RNG. No input required. Best choice for general-purpose unique identifiers.</p>
        <div class="join w-full">
          <input type="text" readonly class="input input-bordered join-item w-full font-mono" :value="v4Result" />
          <SharedButtonsCopy class="join-item btn" :text="v4Result" />
        </div>
      </div>

      <hr class="border-base-300" />

      <!-- V5 -->
      <div class="border-l-4 border-warning pl-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-2">
          <h2 class="text-xl font-bold">Version 5 <span class="text-sm font-normal text-gray-500">— Name-based (SHA-1)</span></h2>
          <div class="flex gap-2">
            <button class="btn btn-warning text-white" @click="generateV5" :disabled="!v5Name">
              <Icon name="fa6-solid:arrows-rotate" />
              Generate
            </button>
            <button class="btn btn-warning text-white" @click="generateAndCopyV5" :disabled="!v5Name">
              <Icon :name="copied.v5 ? 'fa6-solid:check' : 'fa6-solid:copy'" />
              {{ copied.v5 ? 'Copied!' : 'Generate & Copy' }}
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mb-4">Deterministic — derived from a namespace UUID and a name via SHA-1. The same inputs always produce the same UUID, making it ideal for stable, reproducible identifiers.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="form-control w-full">
            <label class="label"><span class="label-text font-medium">Namespace</span></label>
            <select class="select select-bordered w-full" v-model="v5NamespaceKey" @change="onNamespaceChange">
              <option v-for="ns in namespaces" :key="ns.key" :value="ns.key">{{ ns.label }}</option>
            </select>
          </div>
          <div class="form-control w-full">
            <label class="label"><span class="label-text font-medium">Namespace UUID</span></label>
            <input
              type="text"
              class="input input-bordered font-mono w-full"
              v-model="v5Namespace"
              :readonly="v5NamespaceKey !== 'custom'"
              placeholder="Namespace UUID"
            />
          </div>
        </div>

        <div class="form-control w-full mb-4">
          <label class="label"><span class="label-text font-medium">Name</span></label>
          <input
            type="text"
            class="input input-bordered w-full"
            v-model="v5Name"
            placeholder="Enter a name (e.g. example.com)"
            @keyup.enter="generateV5"
          />
        </div>

        <div class="join w-full">
          <input type="text" readonly class="input input-bordered join-item w-full font-mono" :value="v5Result" placeholder="Fill in the fields above and click Generate..." />
          <SharedButtonsCopy class="join-item btn" :text="v5Result" />
        </div>

        <p class="text-sm text-gray-500 mt-2">
          <Icon name="heroicons:information-circle" size="14" class="mr-1" />
          Same name + namespace always produces the same UUID.
        </p>
      </div>

      <hr class="border-base-300" />

      <!-- V7 -->
      <div class="border-l-4 border-info pl-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-2">
          <h2 class="text-xl font-bold">Version 7 <span class="text-sm font-normal text-gray-500">— Time-ordered</span></h2>
          <div class="flex gap-2">
            <button class="btn btn-info text-white" @click="generateV7">
              <Icon name="fa6-solid:arrows-rotate" />
              Generate
            </button>
            <button class="btn btn-info text-white" @click="generateAndCopyV7">
              <Icon :name="copied.v7 ? 'fa6-solid:check' : 'fa6-solid:copy'" />
              {{ copied.v7 ? 'Copied!' : 'Generate & Copy' }}
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mb-4">Time-sortable — embeds a Unix millisecond timestamp in the most significant bits. UUIDs generated later sort after earlier ones, making them great for database primary keys.</p>
        <div class="join w-full">
          <input type="text" readonly class="input input-bordered join-item w-full font-mono" :value="v7Result" />
          <SharedButtonsCopy class="join-item btn" :text="v7Result" />
        </div>
        <p class="text-sm text-gray-500 mt-2">
          <Icon name="heroicons:information-circle" size="14" class="mr-1" />
          UUID v7 embeds a Unix timestamp, making it naturally sortable.
        </p>
      </div>
    </div>


    <div class="prose mt-8">
      <p>
        This was useful for you? Do you have a suggestion? Please, consider submit a PR on
        <a class="link" target="_blank"
           href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/components/Tools/UuidGenerator.vue">
          this project on GitHub
          <Icon name="fa6-brands:github" />
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { v4 as uuidv4, v5 as uuidv5, v7 as uuidv7 } from 'uuid'

useHead({
  title: 'Danilo Pinotti - UUID Generator',
  meta: [
    { name: 'keywords', content: 'uuid, uuid generator, uuid v4, uuid v5, uuid v7' },
    { name: 'description', content: 'Generate UUIDs in versions 4, 5 and 7 and understand the differences between them.' },
  ],
})

// V4
const v4Result = ref(uuidv4())
function generateV4() {
  v4Result.value = uuidv4()
}
function generateAndCopyV4() {
  generateV4()
  navigator.clipboard.writeText(v4Result.value)
  copied.value.v4 = true
  setTimeout(() => copied.value.v4 = false, 2000)
}

// V5
const namespaces = [
  { key: 'dns',    label: 'DNS',    value: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' },
  { key: 'url',    label: 'URL',    value: '6ba7b811-9dad-11d1-80b4-00c04fd430c8' },
  { key: 'oid',    label: 'OID',    value: '6ba7b812-9dad-11d1-80b4-00c04fd430c8' },
  { key: 'x500',   label: 'X.500',  value: '6ba7b814-9dad-11d1-80b4-00c04fd430c8' },
  { key: 'custom', label: 'Custom', value: '' },
]

const v5NamespaceKey = ref('dns')
const v5Namespace = ref(namespaces[0].value)
const v5Name = ref('')
const v5Result = ref('')

function onNamespaceChange() {
  const ns = namespaces.find(n => n.key === v5NamespaceKey.value)
  v5Namespace.value = ns?.value ?? ''
}

function generateV5() {
  if (!v5Name.value || !v5Namespace.value) return
  try {
    v5Result.value = uuidv5(v5Name.value, v5Namespace.value)
  } catch {
    v5Result.value = 'Invalid namespace UUID'
  }
}
function generateAndCopyV5() {
  generateV5()
  navigator.clipboard.writeText(v5Result.value)
  copied.value.v5 = true
  setTimeout(() => copied.value.v5 = false, 2000)
}

// V7
const v7Result = ref(uuidv7())
function generateV7() {
  v7Result.value = uuidv7()
}
function generateAndCopyV7() {
  generateV7()
  navigator.clipboard.writeText(v7Result.value)
  copied.value.v7 = true
  setTimeout(() => copied.value.v7 = false, 2000)
}

// Copied feedback state
const copied = ref({
  v4: false,
  v5: false,
  v7: false,
})
</script>
