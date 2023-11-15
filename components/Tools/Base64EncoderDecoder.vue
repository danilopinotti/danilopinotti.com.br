<template>
  <div>
    Simply Encode and Decode Base64 strings

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mt-4">
        <div>
          <h2 class="text-lg font-bold mb-2">
            <fa icon="keyboard" class="mr-1 text-green-600"></fa>
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
          <fa icon="code" class="mr-1 text-blue-600"></fa>
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
  name: "Base64EncoderDecoder",

  head() {
    return {
      title: 'Danilo Pinotti - Base64 Encoder/Decoder',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'base64,base64 encode, base64 decode',
        },
        {
          hid: "description",
          name: "description",
          content: 'Simply Encode and Decode Base64 strings.'
        }
      ]
    };
  },

  watch: {
    textOutput() {
      this.decode(this.textOutput);
    }
  },

  data() {
    return {
      inputPlaceholder: 'Input Data',
      textInput: '',
      textOutput: '',
    }
  },

  methods: {
    encode(text) {
      this.textOutput = btoa(text);
    },

    decode(base64string) {
      try {
        this.textInput = atob(base64string);
      } catch (e) {
        this.textInput = '';
        this.inputPlaceholder = 'Invalid Base64 string';
      }
    }
  }
}
</script>

<style scoped>

</style>
