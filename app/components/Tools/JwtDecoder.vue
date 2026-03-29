<template>
  <div class="w-full mx-auto">
    <div class="mb-5 rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-rose-50 p-4 shadow-sm">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-2xl">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-red-200">
            <Icon name="heroicons:key" />
            JWT inspector
          </div>
          <h2 class="mb-1 text-xl font-bold text-gray-900">Inspect JWT structure without sending the token anywhere</h2>
          <p class="text-sm text-base-content/70">Decode Base64URL header and payload locally, review claims quickly and keep in mind that this tool does not verify signatures.</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.55fr)]">
      <div class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body gap-5">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 class="card-title text-base md:text-lg">
                <Icon name="fa6-solid:unlock-keyhole" class="text-red-500" />
                Decode token
              </h2>
              <p class="text-sm text-base-content/60">Paste a JWT with two or three segments. Header and payload will be pretty-printed for inspection.</p>
            </div>

            <div class="flex flex-wrap gap-2 rounded-2xl border border-base-300/70 bg-base-200/40 p-2">
              <button class="btn rounded-xl border border-transparent bg-transparent text-base-content/70 hover:border-base-300 hover:bg-white hover:text-base-content" type="button" @click="clearAll">
                <Icon name="fa6-solid:trash" />
                Clear All
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-3">
              <div class="min-w-0">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60"><Icon name="fa6-solid:key" class="inline text-red-400" /> JWT token</h3>
                <p class="text-xs text-base-content/50">Header.Payload.Signature</p>
              </div>
              <div class="flex flex-wrap items-center justify-end gap-2">
                <button class="btn btn-sm rounded-xl border-0 bg-blue-100 text-blue-600 shadow-none hover:bg-blue-200" type="button" @click="loadExample">
                  <Icon name="fa6-solid:flask" />
                  Try Example
                </button>
              </div>
            </div>
            <textarea
              v-model="token"
              class="textarea textarea-bordered h-36 w-full font-mono text-sm leading-6"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              spellcheck="false"
            />
          </div>

          <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60"><Icon name="fa6-solid:gear" class="inline text-blue-400" /> Header</h3>
                <SharedButtonsCopy class="btn btn-sm rounded-xl border border-base-300 bg-white text-base-content shadow-xs hover:border-base-400 hover:bg-base-100" label="Copy" :text="decodedHeader" />
              </div>

              <div :class="headerEditorClass">
                <div
                  ref="headerLineNumbersRef"
                  aria-hidden="true"
                  class="w-14 shrink-0 overflow-hidden border-r border-base-300 bg-base-200/60 px-2 py-3 text-right font-mono text-xs leading-6 text-base-content/45"
                >
                  <div :style="{ transform: `translateY(-${headerScrollTop}px)` }">
                    <div v-for="lineNumber in headerLineNumbers" :key="`header-${lineNumber}`">{{ lineNumber }}</div>
                  </div>
                </div>

                <textarea
                  ref="headerTextareaRef"
                  :value="decodedHeader"
                  :class="headerTextareaClass"
                  placeholder="Decoded JWT header will appear here"
                  readonly
                  spellcheck="false"
                  @scroll="syncLineNumbers('header')"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60"><Icon name="fa6-solid:box-open" class="inline text-amber-500" /> Payload</h3>
                <SharedButtonsCopy class="btn btn-sm rounded-xl border border-base-300 bg-white text-base-content shadow-xs hover:border-base-400 hover:bg-base-100" label="Copy" :text="decodedPayload" />
              </div>

              <div :class="payloadEditorClass">
                <div
                  ref="payloadLineNumbersRef"
                  aria-hidden="true"
                  class="w-14 shrink-0 overflow-hidden border-r border-base-300 bg-base-200/60 px-2 py-3 text-right font-mono text-xs leading-6 text-base-content/45"
                >
                  <div :style="{ transform: `translateY(-${payloadScrollTop}px)` }">
                    <div v-for="lineNumber in payloadLineNumbers" :key="`payload-${lineNumber}`">{{ lineNumber }}</div>
                  </div>
                </div>

                <textarea
                  ref="payloadTextareaRef"
                  :value="decodedPayload"
                  :class="payloadTextareaClass"
                  placeholder="Decoded JWT payload will appear here"
                  readonly
                  spellcheck="false"
                  @scroll="syncLineNumbers('payload')"
                />
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-base-300 bg-base-200/60 p-4">
            <div class="mb-2 flex items-center justify-between gap-3">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60"><Icon name="fa6-solid:fingerprint" class="inline text-emerald-500" /> Signature</h3>
              <SharedButtonsCopy class="btn btn-sm rounded-xl border border-base-300 bg-white text-base-content shadow-xs hover:border-base-400 hover:bg-base-100" label="Copy" :text="tokenParts.signature" />
            </div>
            <div class="font-mono text-sm break-all text-base-content/70" :class="{ 'text-base-content/40 italic': !tokenParts.signature }">
              {{ tokenParts.signature || 'Signature will appear here' }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:shield-halved" class="text-red-500" />
              Security note
            </h2>
            <p class="text-sm text-base-content/70">Decoding a JWT only reveals its contents. It does not prove authenticity, validity window, issuer trust or signature correctness.</p>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:list-check" class="text-blue-500" />
              Quick summary
            </h2>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-2xl bg-base-200/60 p-4">
                <div class="mb-1 text-base-content/60">Status</div>
                <div class="font-semibold">{{ statusLabel }}</div>
              </div>
              <div class="rounded-2xl bg-base-200/60 p-4">
                <div class="mb-1 text-base-content/60">Algorithm</div>
                <div class="font-semibold break-words">{{ headerAlgorithm }}</div>
              </div>
              <div class="rounded-2xl bg-base-200/60 p-4">
                <div class="mb-1 text-base-content/60">Type</div>
                <div class="font-semibold break-words">{{ headerType }}</div>
              </div>
              <div class="rounded-2xl bg-base-200/60 p-4">
                <div class="mb-1 text-base-content/60">Expires</div>
                <div class="font-semibold break-words">{{ expirationLabel }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:circle-info" class="text-indigo-500" />
              What to expect
            </h2>
            <ul class="space-y-3 text-sm text-base-content/70">
              <li>Supports standard JWT Base64URL decoding.</li>
              <li>Header and payload are rendered as formatted JSON.</li>
              <li>Malformed tokens return a clear error state instead of partial output.</li>
              <li>Useful for inspecting claims like `sub`, `iss`, `aud`, `iat` and `exp`.</li>
            </ul>
          </div>
        </div>

        <div class="prose mt-2">
          <p>
            This was useful for you? Do you have a suggestion? Please, consider submit a PR on
            <a class="link" target="_blank"
               href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/app/components/Tools/JwtDecoder.vue">
              this project on GitHub
              <Icon name="fa6-brands:github" />
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'

const token = ref('')
const decodedHeader = ref('')
const decodedPayload = ref('')
const hasError = ref(false)
const tokenParts = ref({ signature: '' })
const decodedHeaderObject = ref<Record<string, unknown> | null>(null)
const decodedPayloadObject = ref<Record<string, unknown> | null>(null)
const headerTextareaRef = ref<HTMLTextAreaElement | null>(null)
const payloadTextareaRef = ref<HTMLTextAreaElement | null>(null)
const headerLineNumbersRef = ref<HTMLDivElement | null>(null)
const payloadLineNumbersRef = ref<HTMLDivElement | null>(null)
const headerScrollTop = ref(0)
const payloadScrollTop = ref(0)

const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFuaWxvIFBpbm90dGkiLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzE2NjQzMjAwfQ.c2lnbmF0dXJl'

const headerEditorClass = computed(() => hasError.value
  ? 'flex h-80 overflow-hidden rounded-2xl border border-red-300 bg-red-50/80'
  : 'flex h-80 overflow-hidden rounded-2xl border border-base-300 bg-base-200/40')
const headerTextareaClass = computed(() => hasError.value
  ? 'h-80 w-full resize-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-6 text-red-700 outline-none'
  : 'h-80 w-full resize-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-6 outline-none')
const payloadEditorClass = computed(() => hasError.value
  ? 'flex h-80 overflow-hidden rounded-2xl border border-red-300 bg-red-50/80'
  : 'flex h-80 overflow-hidden rounded-2xl border border-base-300 bg-base-200/40')
const payloadTextareaClass = computed(() => hasError.value
  ? 'h-80 w-full resize-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-6 text-red-700 outline-none'
  : 'h-80 w-full resize-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-6 outline-none')
const headerLineNumbers = computed(() => {
  const count = decodedHeader.value ? decodedHeader.value.split('\n').length : 1
  return Array.from({ length: count }, (_, index) => index + 1)
})
const payloadLineNumbers = computed(() => {
  const count = decodedPayload.value ? decodedPayload.value.split('\n').length : 1
  return Array.from({ length: count }, (_, index) => index + 1)
})
const headerAlgorithm = computed(() => typeof decodedHeaderObject.value?.alg === 'string' ? decodedHeaderObject.value.alg : 'Unknown')
const headerType = computed(() => typeof decodedHeaderObject.value?.typ === 'string' ? decodedHeaderObject.value.typ : 'Unknown')
const statusLabel = computed(() => {
  if (!token.value.trim())
    return 'Idle'

  return hasError.value ? 'Invalid token' : 'Decoded'
})
const expirationLabel = computed(() => {
  const exp = decodedPayloadObject.value?.exp

  if (typeof exp !== 'number')
    return 'Not provided'

  return new Date(exp * 1000).toLocaleString('en-US')
})

function syncLineNumbers(panel: 'header' | 'payload') {
  if (panel === 'header') {
    headerScrollTop.value = headerTextareaRef.value?.scrollTop ?? 0
    return
  }

  payloadScrollTop.value = payloadTextareaRef.value?.scrollTop ?? 0
}

function resetOutputs() {
  decodedHeader.value = ''
  decodedPayload.value = ''
  tokenParts.value.signature = ''
  decodedHeaderObject.value = null
  decodedPayloadObject.value = null
  hasError.value = false
}

function setInlineError(message: string) {
  decodedHeader.value = `Invalid JWT\n\n${message}`
  decodedPayload.value = `Invalid JWT\n\n${message}`
  tokenParts.value.signature = ''
  decodedHeaderObject.value = null
  decodedPayloadObject.value = null
  hasError.value = true
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4))
  const base64 = normalized + padding

  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function decodeSection(section: string) {
  const decoded = decodeBase64Url(section)
  const parsed = JSON.parse(decoded) as Record<string, unknown>

  return {
    parsed,
    formatted: JSON.stringify(parsed, null, 2),
  }
}

function decodeJwt() {
  if (!token.value.trim()) {
    resetOutputs()
    return
  }

  const parts = token.value.trim().split('.')

  if (parts.length < 2) {
    setInlineError('Expected at least header and payload sections (two dots).')
    return
  }

  try {
    const header = decodeSection(parts[0])
    const payload = decodeSection(parts[1])

    decodedHeaderObject.value = header.parsed
    decodedPayloadObject.value = payload.parsed
    decodedHeader.value = header.formatted
    decodedPayload.value = payload.formatted
    tokenParts.value.signature = parts[2] ?? ''
    hasError.value = false
  } catch (error) {
    setInlineError(error instanceof Error ? error.message : 'Failed to decode JWT.')
  }
}

function loadExample() {
  token.value = exampleToken
}

function clearAll() {
  token.value = ''
  resetOutputs()
}

watch(token, () => {
  decodeJwt()
})

watch(decodedHeader, async () => {
  await nextTick()
  syncLineNumbers('header')
})

watch(decodedPayload, async () => {
  await nextTick()
  syncLineNumbers('payload')
})
</script>
