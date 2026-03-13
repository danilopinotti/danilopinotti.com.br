<template>
  <div>
    Simply Encode and Decode Base64 strings

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mt-4">
        <div>
          <h2 class="text-lg font-bold mb-2">
            <Icon name="fa6-solid:keyboard" class="mr-1 text-green-600" />
            Text Input
          </h2>
          <div class="form-control">
            <textarea class="textarea h-24 textarea-bordered"
                      :placeholder="inputPlaceholder"
                      :value="textInput"
                      @input="encode($event.target.value)"
            >
            </textarea>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-lg font-bold mb-2">
          <Icon name="fa6-solid:code" class="mr-1 text-blue-600" />
          Base64 Output
        </h2>

        <div class="form-control">
            <textarea class="textarea h-24 textarea-bordered"
                      placeholder="Output Data"
                      v-model="textOutput"
            >
            </textarea>
        </div>

        <div class="prose mt-5">
          <p>
            This was useful for you? Do you have a suggestion? Please, consider submit a PR on
            <a class="link"
               target="_blank"
               href="https://github.com/danilopinotti/danilopinotti.com.br/blob/master/components/Tools/Base64EncoderDecoder.vue">
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
  title: 'Danilo Pinotti - Base64 Encoder/Decoder',
  meta: [
    {
      name: 'keywords',
      content: 'base64,base64 encode, base64 decode',
    },
    {
      name: 'description',
      content: 'Simply Encode and Decode Base64 strings.',
    },
  ],
})

const inputPlaceholder = ref('Input Data')
const textInput = ref('')
const textOutput = ref('')

watch(textOutput, (newValue) => {
  decode(newValue)
})

function encode(text) {
  textOutput.value = btoa(text)
}

function decode(base64string) {
  try {
    textInput.value = atob(base64string)
    inputPlaceholder.value = 'Input Data'
  } catch (e) {
    textInput.value = ''
    inputPlaceholder.value = 'Invalid Base64 string'
  }
}
</script>

<style scoped>

</style>
