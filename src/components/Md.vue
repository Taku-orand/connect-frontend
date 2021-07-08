<template>
  <div>
    <div class="btn-toolbar mb-1" role="toolbar" aria-label="Toolbar with button groups">
      <div class="dropdown mr-1">
        <a class="btn btn-secondary dropdown-toggle p-1 p-md-2" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">h </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <button v-on:click="input('h1')" class="dropdown-item">h1</button>
          <button v-on:click="input('h2')" class="dropdown-item">h2</button>
          <button v-on:click="input('h3')" class="dropdown-item">h3</button>
          <button v-on:click="input('h4')" class="dropdown-item">h4</button>
          <button v-on:click="input('h5')" class="dropdown-item">h5</button>
        </div>
      </div>
      <button v-on:click="input('bold')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1 mr-md-2 mb-1 mb-md-2">Bold</button>
      <button v-on:click="input('italic')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">Italic</button>
      <button v-on:click="input('quot')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">&quot;&quot;</button>
      <button v-on:click="input('table')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">Table</button>
      <button v-on:click="input('link')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">Link</button>
      <button v-on:click="input('code')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">&lt; code &gt;</button>
      <button v-on:click="input('clear')" type="button" class="btn btn-secondary p-1 p-md-2 mr-1  mb-1 mb-md-2">clear</button>
    </div>
    <div class="input-area mb-3">
      <div class="input-tab">
        <ul class="nav nav-tabs" id="markdownTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="input-tab" data-toggle="tab" href="#input" role="tab" aria-controls="input" aria-selected="true">内容</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="preview-tab" data-toggle="tab" href="#preview" role="tab" aria-controls="preview" aria-selected="false">プレビュー</a>
          </li>
        </ul>
        <div class="tab-content" id="markdownTabContent">
          <div class="tab-pane fade show active" id="input" role="tabpanel" aria-labelledby="input-tab">
            <div class="form-group">
              <textarea v-if="!isAnswer" v-model="$store.state.questionDetails.content" class="form-control" id="content" rows="10" placeholder="質問内容を入力してください。"> </textarea>
              <textarea v-if="isAnswer" v-model="$store.state.newAnswer.content" class="form-control" id="content" rows="10" placeholder="回答内容を入力してください。"> </textarea>
            </div>
          </div>
          <div class="tab-pane fade" id="preview" role="tabpanel" aria-labelledby="preview-tab">
            <div class="card">
              <div class="card-body">
                <Markdown v-if="!isAnswer" :source="$store.state.questionDetails.content" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
                <Markdown v-if="isAnswer" :source="$store.state.newAnswer.content" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-preview">
        <div class="row">
          <div class="col pr-0">
            <div class="form-group mb-0">
              <textarea v-if="!isAnswer" v-model="$store.state.questionDetails.content" class="form-control" id="content" rows="10" placeholder="質問内容を入力してください。"> </textarea>
              <textarea v-if="isAnswer" v-model="$store.state.newAnswer.content" class="form-control" id="content" rows="10" placeholder="回答内容を入力してください。"> </textarea>
            </div>
          </div>
          <div class="col pl-0">
            <div class="card h-100">
              <div class="card-body">
                <Markdown v-if="!isAnswer" :source="$store.state.questionDetails.content" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
                <Markdown v-if="isAnswer" :source="$store.state.newAnswer.content" :linkify="true" :emoji="data.emoji" :breaks="data.breaks" />
              </div>
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
import { reactive, onMounted } from "vue";

export default {
  components: {
    Markdown,
  },
  props: {
    isAnswer: Boolean,
  },
  setup(props) {
    const store = useStore();

    const data = reactive({
      text: "",
      source: "",
      breaks: true,
      storeTarget: "",
    });

    onMounted(() => {});

    function input(type) {
      if (!props.isAnswer) {
        data.storeTarget = store.state.questionDetails;
      }
      if (props.isAnswer) {
        data.storeTarget = store.state.newAnswer;
      }
      switch (type) {
        case "h1":
          data.storeTarget.content += "# text\n";
          break;
        case "h2":
          data.storeTarget.content += "## text\n";
          break;
        case "h3":
          data.storeTarget.content += "### text\n";
          break;
        case "h4":
          data.storeTarget.content += "#### text\n";
          break;
        case "h5":
          data.storeTarget.content += "##### text\n";
          break;
        case "bold":
          data.storeTarget.content += "**text**\n";
          break;
        case "italic":
          data.storeTarget.content += "*text*\n";
          break;
        case "quot":
          data.storeTarget.content += "> text\n";
          break;
        case "table":
          data.storeTarget.content += "## Tables\nFirst Header | Second Header\n------------ | -------------\nContent from cell 1 | Content from cell 2\nContent in the first column | Content in the second column";
          break;
        case "link":
          data.storeTarget.content += "[タイトル](URL)\n";
          break;
        case "code":
          data.storeTarget.content += "``` language\n```\n";
          break;
        case "clear":
          data.storeTarget.content = "";
          break;
        default:
          break;
      }
    }

    return {
      data,
      input,
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

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: var(--accent-color);
}

.input-tab {
  display: none;
}

@media screen and (max-width: 959px) {
  /* 959px以下に適用されるCSS（タブレット用） */
}
@media screen and (max-width: 480px) {
  /* 480px以下に適用されるCSS（スマホ用） */
  .input-tab {
    display: block;
  }
  .input-preview {
    display: none;
  }
}
</style>
