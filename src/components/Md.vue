<template>
  <div class="container">
    <textarea v-model="sourceText"></textarea>
    <vue-markdown-it :source="markdown" />
    <vue-markdown-it :text="markdown" />
  </div>
</template>
 
<script>
import VueMarkdownIt from 'vue3-markdown-it';
import 'highlight.js/styles/monokai.css';
 
//let str = '# Hello World! \n ## Hello World!'
 
export default {
  components: {
    VueMarkdownIt
  },
  props: ['text'],
  data() {
    return {
      sourceText: "T",
      text: String
    }
  },
}
</script>
<style>
.container {
  margin: 0 auto;
  margin-top: 200px;
  min-height: 100vh;
  width: 500px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
