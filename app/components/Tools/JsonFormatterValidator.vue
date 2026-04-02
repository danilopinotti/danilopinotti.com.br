<template>
  <div class="w-full mx-auto">
    <div class="mb-5 rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4 shadow-sm">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-2xl">
          <div class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200">
            <Icon name="heroicons:code-bracket-square" />
            JSON utility
          </div>
          <h2 class="mb-1 text-xl font-bold text-gray-900">Validate, format and minify JSON without leaving the browser</h2>
          <p class="text-sm text-base-content/70">Paste raw JSON, pretty-print it for inspection or minify it for transport. Parsing happens locally and returns clear validation feedback.</p>
        </div>

      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.55fr)]">
      <div class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body gap-5">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 class="card-title text-base md:text-lg">
                <Icon name="fa6-solid:keyboard" class="text-amber-500" />
                Workspace
              </h2>
              <p class="text-sm text-base-content/60">Use the left panel for source JSON and the right panel for the transformed result.</p>
            </div>

            <div class="flex flex-wrap gap-2 rounded-2xl border border-base-300/70 bg-base-200/40 p-2">
              <button class="btn rounded-xl border border-transparent bg-transparent text-base-content/70 hover:border-base-300 hover:bg-white hover:text-base-content" type="button" @click="clearAll">
                <Icon name="fa6-solid:trash" />
                Clear All
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div class="flex h-full flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Input JSON</h3>
                <button class="btn btn-sm rounded-xl border border-base-300 bg-white/90 text-base-content shadow-xs hover:border-base-400 hover:bg-base-100" type="button" @click="pasteExample">
                  <Icon name="fa6-solid:file-code" />
                  Try Example
                </button>
              </div>

              <textarea
                v-model="jsonInput"
                class="textarea textarea-bordered min-h-80 w-full flex-1 font-mono text-sm leading-6"
                placeholder='{"name":"Danilo","stack":["Nuxt","TypeScript"]}'
                spellcheck="false"
              />

              <div class="flex flex-wrap items-center gap-2">
                <span class="badge badge-ghost">{{ inputSize }} characters</span>
                <span class="badge badge-ghost">{{ inputLines }} lines</span>
                <span class="badge badge-ghost">Size {{ inputByteSize }}</span>
                <span class="badge badge-ghost">{{ inputTokens.toLocaleString() }} tokens</span>
              </div>
            </div>

            <div class="flex h-full flex-col gap-2">
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Output</h3>
                <div class="flex flex-wrap items-center justify-end gap-2">
                  <button class="btn btn-sm rounded-xl border-0 bg-amber-500 text-white shadow-sm hover:bg-amber-600" type="button" @click="setFormattedOutput">
                    <Icon name="fa6-solid:wand-magic-sparkles" />
                    Format
                  </button>
                  <button class="btn btn-sm rounded-xl border-0 bg-sky-500 text-white shadow-sm hover:bg-sky-600" type="button" @click="minifyJson">
                    <Icon name="fa6-solid:compress" />
                    Minify
                  </button>
                  <SharedButtonsCopy class="btn btn-sm rounded-xl border border-base-300 bg-white text-base-content shadow-xs hover:border-base-400 hover:bg-base-100" label="Copy" :text="jsonOutput" />
                </div>
              </div>

              <div :class="outputContainerClass">
                <pre
                  v-if="jsonOutput && !hasOutputError"
                  class="min-h-80 max-h-[500px] flex-1 w-full overflow-auto whitespace-pre-wrap break-all font-mono text-sm leading-6"
                  v-html="highlightedOutput"
                />
                <pre
                  v-else-if="hasOutputError"
                  class="min-h-80 max-h-[500px] flex-1 w-full overflow-auto whitespace-pre-wrap break-all font-mono text-sm leading-6 text-red-700"
                >{{ jsonOutput }}</pre>
                <pre
                  v-else
                  class="min-h-80 max-h-[500px] flex-1 w-full overflow-auto font-mono text-sm leading-6 text-base-content/30"
                >Formatted JSON will appear here automatically</pre>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <span class="badge badge-ghost">{{ outputSize }} characters</span>
                <span class="badge badge-ghost">{{ outputLines }} lines</span>
                <span class="badge badge-ghost">Size {{ outputByteSize }}</span>
                <span class="badge badge-ghost">{{ outputTokens.toLocaleString() }} tokens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:circle-info" class="text-blue-500" />
              Quick notes
            </h2>
            <ul class="space-y-3 text-sm text-base-content/70">
              <li>Objects, arrays, strings, numbers, booleans and `null` are supported.</li>
              <li>Formatting happens automatically while you type or paste.</li>
              <li>Formatting uses 2-space indentation for readability.</li>
              <li>Minify removes whitespace without changing the JSON structure.</li>
              <li>Parsing errors are shown directly in the output panel.</li>
            </ul>
          </div>
        </div>

        <div class="prose mt-2">
          <p>
            This was useful for you? Do you have a suggestion? Please, consider submit a PR on
            <a class="link" target="_blank"
               href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/app/components/Tools/JsonFormatterValidator.vue">
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
const jsonInput = ref('')
const jsonOutput = ref('')
const outputMode = ref<'format' | 'minify'>('format')
const hasOutputError = ref(false)

const exampleJson = `{
  "name": "Danilo Pinotti",
  "website": "danilopinotti.com.br",
  "stack": ["Nuxt", "TypeScript", "Tailwind CSS"],
  "openSource": true
}`

const inputSize = computed(() => jsonInput.value.length.toLocaleString())
const outputSize = computed(() => jsonOutput.value.length.toLocaleString())
const inputLines = computed(() => jsonInput.value ? jsonInput.value.split('\n').length : 0)
const outputLines = computed(() => jsonOutput.value ? jsonOutput.value.split('\n').length : 0)
const inputByteSize = computed(() => formatBytes(new TextEncoder().encode(jsonInput.value).byteLength))
const outputByteSize = computed(() => formatBytes(new TextEncoder().encode(jsonOutput.value).byteLength))
const inputTokens = computed(() => estimateTokens(jsonInput.value))
const outputTokens = computed(() => estimateTokens(jsonOutput.value))
const outputContainerClass = computed(() => hasOutputError.value
  ? 'flex flex-1 flex-col rounded-2xl border border-red-300 bg-red-50/80 px-3 py-2'
  : 'flex flex-1 flex-col rounded-2xl border border-base-300 bg-base-200/40 px-3 py-2')

function syntaxHighlight(json: string): string {
  const escaped = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span class="text-amber-600 font-medium">${match}</span>`
        }
        return `<span class="text-green-600">${match}</span>`
      }
      if (match === 'true' || match === 'false') {
        return `<span class="text-purple-600">${match}</span>`
      }
      if (match === 'null') {
        return `<span class="text-slate-400">${match}</span>`
      }
      return `<span class="text-blue-600">${match}</span>`
    },
  )
}

const highlightedOutput = computed(() => syntaxHighlight(jsonOutput.value))

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const k = 1024
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1)
  const value = bytes / Math.pow(k, i)
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[i]}`
}

function estimateTokens(text: string): number {
  if (!text) return 0
  // Heuristic: ~1 token per 4 characters (widely used approximation for LLMs)
  return Math.ceil(text.length / 4)
}

function tryParseJson(sourceText: string) {
  if (!sourceText.trim()) {
    throw new Error('Enter valid JSON to continue.')
  }

  return JSON.parse(sourceText)
}

function formatJson(sourceText = jsonInput.value) {
  try {
    const parsed = tryParseJson(sourceText)
    jsonOutput.value = outputMode.value === 'minify'
      ? JSON.stringify(parsed)
      : JSON.stringify(parsed, null, 2)
    hasOutputError.value = false
  } catch (error) {
    jsonOutput.value = `Invalid JSON\n\n${error instanceof Error ? error.message : 'Unable to parse the provided JSON.'}`
    hasOutputError.value = true
  }
}

function setFormattedOutput() {
  outputMode.value = 'format'
  formatJson()
}

function minifyJson() {
  outputMode.value = 'minify'
  formatJson()
}

function clearAll() {
  jsonInput.value = ''
  jsonOutput.value = ''
  outputMode.value = 'format'
  hasOutputError.value = false
}

function pasteExample() {
  jsonInput.value = exampleJson
  outputMode.value = 'format'
}

watch(jsonInput, () => {
  outputMode.value = 'format'

  if (!jsonInput.value.trim()) {
    jsonOutput.value = ''
    hasOutputError.value = false
    return
  }

  formatJson()
})
</script>
