<template>
  <div style="text-align: right;">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css">
  <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="text-align: right;">
    <div class="btn-group mr-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-secondary btn-sm">undo</button>
      <button type="button" class="btn btn-secondary btn-sm">redo</button>
      <button type="button" class="btn btn-secondary btn-sm">clear</button>
    </div>
    <div class="btn-group mr-2" role="group" aria-label="Second group">
      <button type="button" class="btn btn-secondary btn-sm">h</button>
      <button type="button" class="btn btn-secondary btn-sm">Bold</button>
      <button type="button" class="btn btn-secondary btn-sm">Italic</button>
    </div>
    <div class="btn-group" role="group" aria-label="Third group">
      <button type="button" class="btn btn-secondary btn-sm"> &quot;&quot; </button>
    </div>
    <div class="btn-group" role="group" aria-label="Fourth group">
      <button type="button" class="btn btn-secondary btn-sm">Table</button>
    </div>
    <div class="btn-group" role="group" aria-label="Fifth group">
      <button type="button" class="btn btn-secondary btn-sm">Link</button>
    </div>
    <div class="btn-group" role="group" aria-label="Sixth group">
      <button type="button" class="btn btn-secondary btn-sm"> &lt; code &gt; </button>
    </div>
  </div>
    <textarea v-model="text" v-on:input="md" placeholder="内容" cols="100px"></textarea>
    <Markdown :source="md" :linkify="linkify" :emoji="emoji" />
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  name: "md",
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