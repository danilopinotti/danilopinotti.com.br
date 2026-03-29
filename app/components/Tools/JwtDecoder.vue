<template>
  <div class="w-full mx-auto">
    <div class="mb-8 rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-rose-50 p-6 shadow-sm">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-2xl">
          <div class="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-red-200">
            <Icon name="heroicons:key" />
            JWT inspector
          </div>
          <h2 class="mb-2 text-2xl font-bold text-gray-900">Inspect JWT structure without sending the token anywhere</h2>
          <p class="text-base-content/70">Decode Base64URL header and payload locally, review claims quickly and keep in mind that this tool does not verify signatures.</p>
        </div>

        <div class="stats stats-vertical border border-red-100 bg-white/90 shadow-sm sm:stats-horizontal">
          <div class="stat px-5 py-4">
            <div class="stat-title">Segments</div>
            <div class="stat-value text-xl text-red-600">{{ segmentCount }}</div>
            <div class="stat-desc">dot-separated parts</div>
          </div>
          <div class="stat px-5 py-4">
            <div class="stat-title">Claims</div>
            <div class="stat-value text-xl text-green-600">{{ payloadClaimCount }}</div>
            <div class="stat-desc">payload keys</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
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

            <div class="flex flex-wrap gap-2">
              <button class="btn btn-error text-white" type="button" @click="decodeJwt">
                <Icon name="fa6-solid:unlock-keyhole" />
                Decode
              </button>
              <button class="btn btn-outline" type="button" @click="loadExample">
                <Icon name="fa6-solid:file-code" />
                Example
              </button>
              <button class="btn btn-ghost" type="button" @click="clearAll">
                <Icon name="fa6-solid:trash" />
                Clear
              </button>
            </div>
          </div>

          <div class="form-control">
            <label class="label pb-2">
              <span class="label-text font-medium">JWT token</span>
              <span class="label-text-alt text-base-content/60">Header.Payload.Signature</span>
            </label>
            <textarea
              v-model="token"
              class="textarea textarea-bordered h-36 w-full font-mono text-sm leading-6"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              spellcheck="false"
            />
          </div>

          <div v-if="statusMessage" :class="statusClass" class="alert">
            <Icon :name="statusIcon" size="18" />
            <span>{{ statusMessage }}</span>
          </div>

          <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Header</h3>
                <SharedButtonsCopy class="btn btn-sm btn-ghost" :text="decodedHeader" />
              </div>

              <textarea
                :value="decodedHeader"
                class="textarea textarea-bordered min-h-72 w-full bg-base-200/40 font-mono text-sm leading-6"
                placeholder="Decoded JWT header will appear here"
                readonly
                spellcheck="false"
              />
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Payload</h3>
                <SharedButtonsCopy class="btn btn-sm btn-ghost" :text="decodedPayload" />
              </div>

              <textarea
                :value="decodedPayload"
                class="textarea textarea-bordered min-h-72 w-full bg-base-200/40 font-mono text-sm leading-6"
                placeholder="Decoded JWT payload will appear here"
                readonly
                spellcheck="false"
              />
            </div>
          </div>

          <div v-if="tokenParts.signature" class="rounded-2xl border border-base-300 bg-base-200/60 p-4">
            <div class="mb-2 flex items-center justify-between gap-3">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Signature</h3>
              <SharedButtonsCopy class="btn btn-sm btn-ghost" :text="tokenParts.signature" />
            </div>
            <div class="font-mono text-sm break-all">{{ tokenParts.signature }}</div>
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
const token = ref('')
const decodedHeader = ref('')
const decodedPayload = ref('')
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')
const tokenParts = ref({ signature: '' })
const decodedHeaderObject = ref<Record<string, unknown> | null>(null)
const decodedPayloadObject = ref<Record<string, unknown> | null>(null)

const exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGFuaWxvIFBpbm90dGkiLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzE2NjQzMjAwfQ.c2lnbmF0dXJl'

const statusClass = computed(() => statusType.value === 'success' ? 'alert-success' : 'alert-error')
const statusIcon = computed(() => statusType.value === 'success' ? 'fa6-solid:circle-check' : 'fa6-solid:triangle-exclamation')
const segmentCount = computed(() => token.value.trim() ? token.value.trim().split('.').length : 0)
const payloadClaimCount = computed(() => decodedPayloadObject.value ? Object.keys(decodedPayloadObject.value).length : 0)
const headerAlgorithm = computed(() => typeof decodedHeaderObject.value?.alg === 'string' ? decodedHeaderObject.value.alg : 'Unknown')
const headerType = computed(() => typeof decodedHeaderObject.value?.typ === 'string' ? decodedHeaderObject.value.typ : 'Unknown')
const statusLabel = computed(() => {
  if (!statusMessage.value)
    return 'Idle'

  return statusType.value === 'success' ? 'Decoded' : 'Invalid token'
})
const expirationLabel = computed(() => {
  const exp = decodedPayloadObject.value?.exp

  if (typeof exp !== 'number')
    return 'Not provided'

  return new Date(exp * 1000).toLocaleString('en-US')
})

function setSuccess(message: string) {
  statusType.value = 'success'
  statusMessage.value = message
}

function setError(message: string) {
  statusType.value = 'error'
  statusMessage.value = message
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
  decodedHeader.value = ''
  decodedPayload.value = ''
  tokenParts.value.signature = ''
  decodedHeaderObject.value = null
  decodedPayloadObject.value = null

  if (!token.value.trim()) {
    setError('Enter a JWT token to decode.')
    return
  }

  const parts = token.value.trim().split('.')

  if (parts.length < 2) {
    setError('Invalid JWT. Expected at least header and payload sections.')
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
    setSuccess('JWT decoded successfully. Signature was not verified.')
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to decode JWT.')
  }
}

function loadExample() {
  token.value = exampleToken
  decodeJwt()
}

function clearAll() {
  token.value = ''
  decodedHeader.value = ''
  decodedPayload.value = ''
  tokenParts.value.signature = ''
  decodedHeaderObject.value = null
  decodedPayloadObject.value = null
  statusMessage.value = ''
}
</script>
