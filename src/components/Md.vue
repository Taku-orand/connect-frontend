<template>
  <div>
    <!-- コードをハイライトするcss -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css" />

    <div class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups">
      <div class="dropdown mr-1">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">h </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <button v-on:click="inputH1" class="dropdown-item">h1</button>
          <button v-on:click="inputH2" class="dropdown-item">h2</button>
          <button v-on:click="inputH3" class="dropdown-item">h3</button>
          <button v-on:click="inputH4" class="dropdown-item">h4</button>
          <button v-on:click="inputH5" class="dropdown-item">h5</button>
        </div>
      </div>
      <button v-on:click="inputBold" type="button" class="btn btn-secondary mr-1">Bold</button>
      <button v-on:click="inputItalic" type="button" class="btn btn-secondary mr-1">Italic</button>
      <button v-on:click="inputQuot" type="button" class="btn btn-secondary mr-1">&quot;&quot;</button>
      <button v-on:click="inputTable" type="button" class="btn btn-secondary mr-1">Table</button>
      <button v-on:click="inputLink" type="button" class="btn btn-secondary mr-1">Link</button>
      <button v-on:click="inputCode" type="button" class="btn btn-secondary mr-1">&lt; code &gt;</button>
      <button v-on:click="inputClear" type="button" class="btn btn-secondary mr-1">clear</button>
    </div>
    <div class="input-area mb-3">
      <div class="row">
        <div class="col">
          <div class="form-group">
            <textarea v-model="$store.state.questionDetails.content" class="form-control" id="content" rows="10" placeholder="質問内容を入力してください。"> </textarea>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <Markdown :source="$store.state.questionDetails.content" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
import { useStore } from "vuex";
import { reactive } from "vue";

export default {
  components: {
    Markdown,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      text: "",
      source: "",
      breaks: true,
    });

    function inputH1() {
      store.state.questionDetails.content += "# text\n";
    }
    function inputH2() {
      store.state.questionDetails.content += "## text\n";
    }
    function inputH3() {
      store.state.questionDetails.content += "### text\n";
    }
    function inputH4() {
      store.state.questionDetails.content += "#### text\n";
    }
    function inputH5() {
      store.state.questionDetails.content += "##### text\n";
    }
    function inputBold() {
      store.state.questionDetails.content += "**text**\n";
    }
    function inputItalic() {
      store.state.questionDetails.content += "*text*\n";
    }
    function inputQuot() {
      store.state.questionDetails.content += "> text\n";
    }
    function inputTable() {
      store.state.questionDetails.content += "## Tables\nFirst Header | Second Header\n------------ | -------------\nContent from cell 1 | Content from cell 2\nContent in the first column | Content in the second column";
    }
    function inputLink() {
      store.state.questionDetails.content += "[タイトル](URL)\n";
    }
    function inputCode() {
      store.state.questionDetails.content += "``` language\n```";
    }
    function inputClear() {
      store.state.questionDetails.content = "";
    }
    return {
      data,
      inputH1,
      inputH2,
      inputH3,
      inputH4,
      inputH5,
      inputBold,
      inputItalic,
      inputQuot,
      inputTable,
      inputLink,
      inputCode,
      inputClear,
    };
  },
};
</script>

<style>
/* テーブル */
.text table {
  width: auto;
  border: 1px solid #555555;
  border-collapse: collapse;
  border-spacing: 0;
}
th {
  color: #333;
  padding: 5px;
  border-top: 1px solid #555555;
  border-bottom: 1px solid #555555;
  border-left: 1px solid #555555;
  border-right: 1px solid #555555;
  background: var(--table-head-color);
  font-weight: bold;
  line-height: 120%;
  text-align: center;
}
td {
  padding: 5px;
  border-bottom: 1px solid #555555;
  border-left: 1px solid #555555;
  border-right: 1px solid #555555;
}
tr:nth-child(2n + 1) {
  background: var(--silver-color);
}
/* 引用 */
blockquote {
  position: relative;
  padding: 10px 15px 10px 60px;
  box-sizing: border-box;
  font-style: italic;
  background: #f5f5f5;
  color: #777777;
  border-left: 4px solid #9dd4ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
}

blockquote:before {
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 0;
  content: "“";
  font-family: sans-serif;
  color: #9dd4ff;
  font-size: 90px;
  line-height: 1;
}

blockquote p {
  padding: 0;
  margin: 7px 0;
  line-height: 1.7;
}

blockquote cite {
  display: block;
  text-align: right;
  color: #888888;
  font-size: 0.9em;
}
</style>
