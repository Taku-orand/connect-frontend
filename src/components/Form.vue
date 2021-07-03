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
    <Md></Md>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
import Md from "./Md.vue";

export default {
  props: {},
  components: {
    Md
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

    function isAnon() {
      store.state.questionDetails.anonymous = !store.state.questionDetails.anonymous;
    }

    return {
      data,
      isAnon,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
