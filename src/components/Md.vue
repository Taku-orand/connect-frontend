<template>
  <div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css">

    <textarea v-model="text" v-on:input="md"></textarea>
    <Markdown :source="md" :linkify="linkify" :emoji="emoji" />
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Markdown
  },
  data() {
    return {
      emoji: {
        "smile":[ ":)", ":-)" ]
      },
      linkify: true,
      source: '# Hello World!',
      text: ''
    }
  },
  computed: {
    md: function(){
      return this.source = this.text
    }
  }
}
</script>