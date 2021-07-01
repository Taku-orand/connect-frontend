<template>
  <div class="form-group m-1">
    <button
      type="button"
      class="btn btn-dark btn-sm"
      @click="isAnon"
    >
      匿名
    </button>
    <div v-if="$store.state.questionDetails.anonymous">
      <div class="col-xs-10">匿名</div>
    </div>
    <div v-else>
      <div class="col-xs-10">{{ $store.state.user.email }}</div>
    </div>
    <input
      placeholder="タイトル"
      id="title"
      v-model="$store.state.questionDetails.title"
    />
    <br />
    <div>
      <multiselect
        v-model="$store.state.post_tags_id"
        :options="$store.state.tags"
        :custom-label="inputObject"
        placeholder="Select one"
        label="name"
        track-by="id"
        :searchable="true"
        valueProp="id"
        :taggable="true"
        mode="tags"
      ></multiselect>
    </div>
    <textarea
      placeholder="内容"
      id="content"
      v-model="$store.state.questionDetails.content"
    ></textarea>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";
export default {
  props: {},
  components: {
    Multiselect,
  },

  setup() {
    const store = useStore();
    const data = reactive({
      title: store.state.questionDetails.title,
      content: store.state.questionDetails.content,
      anonymous: store.state.questionDetails.anonymous
    });

    onMounted(() => {
      store.dispatch("getTags");
      if (!store.state.questionDetails.anonymous){
        store.state.questionDetails.anonymous = false;
      }
    });

    function inputObject(id, name) {
      return `${id} - [${name}]`;
    }

    function isAnon() {
      store.state.questionDetails.anonymous = !store.state.questionDetails.anonymous;
    }

    return {
      data,
      isAnon,
      inputObject,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
