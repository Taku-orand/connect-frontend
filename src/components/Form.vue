<template>
  <div class="form-group m-1">
    <button type="button" class="btn btn-dark btn-sm" @click="isAnon">匿名で投稿する</button>
    <div v-if="$store.state.questionDetails.anonymous">
      <div class="">匿名</div>
    </div>
    <div v-else>
      <div class="">{{ $store.state.user.email }}</div>
    </div>
    <input placeholder="タイトル" id="title" v-model="$store.state.questionDetails.title" />
    <br />
    <textarea placeholder="内容" id="content" v-model="$store.state.questionDetails.content"></textarea>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";

export default {
  props: {},
  components: {},

  setup() {
    const store = useStore();
    const data = reactive({
      title: store.state.questionDetails.title,
      content: store.state.questionDetails.content,
      anonymous: store.state.questionDetails.anonymous,
    });

    onMounted(() => {
      store.dispatch("getTags");
      if (!store.state.questionDetails.anonymous) {
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
