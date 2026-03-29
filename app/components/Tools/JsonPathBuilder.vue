<template>
  <div class="w-full mx-auto">
    <!-- Hero -->
    <div class="mb-5 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 shadow-sm">
      <div class="max-w-2xl">
        <div class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-sky-700 ring-1 ring-sky-200">
          <Icon name="fa6-solid:route" />
          JSONPath helper
        </div>
        <h2 class="mb-1 text-xl font-bold text-gray-900">Build JSONPath expressions by clicking on JSON elements</h2>
        <p class="text-sm text-base-content/70">Paste your JSON, then click any key or value in the interactive tree to get its JSONPath expression. Everything runs locally in your browser.</p>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.55fr)]">
      <!-- Workspace -->
      <div class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body gap-5">
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 class="card-title text-base md:text-lg">
                <Icon name="fa6-solid:keyboard" class="text-sky-500" />
                Workspace
              </h2>
              <p class="text-sm text-base-content/60">Paste JSON in the input, then click elements in the tree below.</p>
            </div>
            <div class="flex flex-wrap gap-2 rounded-2xl border border-base-300/70 bg-base-200/40 p-2">
              <button class="btn rounded-xl border border-transparent bg-transparent text-base-content/70 hover:border-base-300 hover:bg-white hover:text-base-content" type="button" @click="pasteExample">
                <Icon name="fa6-solid:file-code" />
                Example
              </button>
              <button class="btn rounded-xl border border-transparent bg-transparent text-base-content/70 hover:border-base-300 hover:bg-white hover:text-base-content" type="button" @click="clearAll">
                <Icon name="fa6-solid:trash" />
                Clear
              </button>
            </div>
          </div>

          <!-- Input JSON -->
          <div class="flex flex-col gap-2">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Input JSON</h3>
            <textarea
              v-model="jsonInput"
              class="textarea textarea-bordered min-h-48 w-full font-mono text-sm leading-6"
              placeholder='{"name":"Danilo","stack":["Nuxt","TypeScript"]}'
              spellcheck="false"
            />
            <div v-if="parseError" class="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <Icon name="heroicons:exclamation-triangle" class="mt-0.5 shrink-0" />
              <span>{{ parseError }}</span>
            </div>
          </div>

          <!-- Interactive Tree -->
          <div v-if="parsedValue !== undefined" class="flex flex-col gap-2">
            <h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60">Interactive Tree — click any element</h3>
            <div class="overflow-x-auto rounded-xl border border-base-300 bg-base-200/30 p-4 font-mono text-sm leading-7 max-h-[600px] overflow-y-auto">
              <div v-for="(line, idx) in treeLines" :key="idx" class="whitespace-pre">
                <span :style="{ paddingLeft: line.indent * 20 + 'px' }">
                  <template v-for="(seg, si) in line.segments" :key="si">
                    <span
                      v-if="seg.path"
                      :class="[
                        segmentClass(seg.type),
                        'cursor-pointer rounded px-0.5 transition-all duration-150',
                        selectedPath === seg.path
                          ? 'bg-sky-200 ring-2 ring-sky-400'
                          : 'hover:bg-sky-100 hover:ring-1 hover:ring-sky-300',
                      ]"
                      :title="seg.path"
                      @click="selectPath(seg.path)"
                    >{{ seg.text }}</span>
                    <span v-else :class="segmentClass(seg.type)">{{ seg.text }}</span>
                  </template>
                  <span v-if="line.comma" class="text-base-content/30">,</span>
                </span>
              </div>
            </div>
          </div>

          <!-- JSONPath Output -->
          <div v-if="parsedValue !== undefined" class="card border-2 border-sky-200 bg-sky-50/50 shadow-sm">
            <div class="card-body py-3 gap-2">
              <div class="flex items-center gap-2 text-sm font-semibold text-sky-700">
                <Icon name="fa6-solid:route" />
                JSONPath
              </div>
              <div class="flex items-center gap-2">
                <code class="flex-1 rounded-lg border border-sky-200 bg-white px-4 py-2 font-mono text-sm text-sky-900 select-all break-all">{{ selectedPath }}</code>
                <SharedButtonsCopy class="btn btn-sm rounded-xl border border-sky-300 bg-white text-sky-700 hover:bg-sky-100 shrink-0" :text="selectedPath" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="flex flex-col gap-6">
        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:circle-info" class="text-blue-500" />
              Quick notes
            </h2>
            <ul class="space-y-3 text-sm text-base-content/70">
              <li><strong class="font-mono">$</strong> — represents the root of the JSON document.</li>
              <li><strong class="font-mono">.key</strong> — accesses an object property (dot notation).</li>
              <li><strong class="font-mono">['key']</strong> — accesses properties with special characters.</li>
              <li><strong class="font-mono">[0]</strong> — accesses an array element by index.</li>
              <li>Click any key, value, or bracket to get its JSONPath.</li>
              <li>All processing happens locally in your browser.</li>
            </ul>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-4">
            <h2 class="card-title text-base">
              <Icon name="fa6-solid:palette" class="text-purple-500" />
              Color legend
            </h2>
            <div class="space-y-2 text-sm font-mono">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
                <span class="text-purple-700 font-semibold">"key"</span>
                <span class="text-base-content/50 font-sans">Object keys</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-green-600 shrink-0" />
                <span class="text-green-700">"string"</span>
                <span class="text-base-content/50 font-sans">String values</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                <span class="text-orange-600">42</span>
                <span class="text-base-content/50 font-sans">Number values</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                <span class="text-red-600">true/false</span>
                <span class="text-base-content/50 font-sans">Boolean values</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-gray-400 shrink-0" />
                <span class="text-gray-500 italic">null</span>
                <span class="text-base-content/50 font-sans">Null values</span>
              </div>
            </div>
          </div>
        </div>

        <div class="prose mt-2">
          <p>
            This was useful for you? Do you have a suggestion? Please, consider submit a PR on
            <a class="link" target="_blank"
               href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/app/components/Tools/JsonPathBuilder.vue">
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
interface Segment {
  text: string
  type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'brace' | 'bracket' | 'punctuation'
  path?: string
}

interface TreeLine {
  indent: number
  segments: Segment[]
  comma: boolean
}

const jsonInput = ref('')
const selectedPath = ref('$')
const parseError = ref('')

const exampleJson = `{
  "name": "Danilo Pinotti",
  "website": "danilopinotti.com.br",
  "skills": ["Vue.js", "TypeScript", "PHP", "Laravel"],
  "experience": {
    "years": 10,
    "current": {
      "role": "Software Engineer",
      "remote": true
    }
  },
  "openSource": true,
  "social": null
}`

const parsedValue = computed(() => {
  if (!jsonInput.value.trim()) return undefined
  try {
    const result = JSON.parse(jsonInput.value)
    parseError.value = ''
    return result
  }
  catch (e) {
    parseError.value = e instanceof Error ? e.message : 'Unable to parse JSON.'
    return undefined
  }
})

const treeLines = computed<TreeLine[]>(() => {
  if (parsedValue.value === undefined) return []
  return buildTree(parsedValue.value, '$', null, 0, true)
})

function isSimpleKey(key: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
}

function escapeJsonString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

function buildTree(
  value: unknown,
  path: string,
  keyName: string | null,
  indent: number,
  isLast: boolean,
): TreeLine[] {
  const lines: TreeLine[] = []

  // Build key prefix for object properties
  const keyPrefix: Segment[] = []
  if (keyName !== null) {
    keyPrefix.push({ text: `"${escapeJsonString(keyName)}"`, type: 'key', path })
    keyPrefix.push({ text: ': ', type: 'punctuation' })
  }

  if (value === null) {
    lines.push({
      indent,
      segments: [...keyPrefix, { text: 'null', type: 'null', path }],
      comma: !isLast,
    })
  }
  else if (typeof value === 'string') {
    lines.push({
      indent,
      segments: [...keyPrefix, { text: `"${escapeJsonString(value)}"`, type: 'string', path }],
      comma: !isLast,
    })
  }
  else if (typeof value === 'number') {
    lines.push({
      indent,
      segments: [...keyPrefix, { text: String(value), type: 'number', path }],
      comma: !isLast,
    })
  }
  else if (typeof value === 'boolean') {
    lines.push({
      indent,
      segments: [...keyPrefix, { text: String(value), type: 'boolean', path }],
      comma: !isLast,
    })
  }
  else if (Array.isArray(value)) {
    if (value.length === 0) {
      lines.push({
        indent,
        segments: [...keyPrefix, { text: '[]', type: 'bracket', path }],
        comma: !isLast,
      })
    }
    else {
      lines.push({
        indent,
        segments: [...keyPrefix, { text: '[', type: 'bracket', path }],
        comma: false,
      })
      value.forEach((item, i) => {
        const childPath = `${path}[${i}]`
        lines.push(...buildTree(item, childPath, null, indent + 1, i === value.length - 1))
      })
      lines.push({
        indent,
        segments: [{ text: ']', type: 'bracket' }],
        comma: !isLast,
      })
    }
  }
  else if (typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>)
    if (keys.length === 0) {
      lines.push({
        indent,
        segments: [...keyPrefix, { text: '{}', type: 'brace', path }],
        comma: !isLast,
      })
    }
    else {
      lines.push({
        indent,
        segments: [...keyPrefix, { text: '{', type: 'brace', path }],
        comma: false,
      })
      keys.forEach((k, i) => {
        const childPath = isSimpleKey(k) ? `${path}.${k}` : `${path}['${escapeJsonString(k)}']`
        lines.push(...buildTree(
          (value as Record<string, unknown>)[k],
          childPath,
          k,
          indent + 1,
          i === keys.length - 1,
        ))
      })
      lines.push({
        indent,
        segments: [{ text: '}', type: 'brace' }],
        comma: !isLast,
      })
    }
  }

  return lines
}

function segmentClass(type: string): string {
  switch (type) {
    case 'key': return 'text-purple-700 font-semibold'
    case 'string': return 'text-green-700'
    case 'number': return 'text-orange-600'
    case 'boolean': return 'text-red-600'
    case 'null': return 'text-gray-500 italic'
    case 'brace':
    case 'bracket': return 'text-base-content/80'
    case 'punctuation': return 'text-base-content/40'
    default: return ''
  }
}

function selectPath(path: string) {
  selectedPath.value = path
}

function clearAll() {
  jsonInput.value = ''
  selectedPath.value = '$'
  parseError.value = ''
}

function pasteExample() {
  jsonInput.value = exampleJson
  selectedPath.value = '$'
}

watch(jsonInput, () => {
  selectedPath.value = '$'
})
</script>
