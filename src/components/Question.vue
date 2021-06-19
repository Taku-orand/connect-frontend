<template>
  <h2 class="text-center m-5">質問一覧</h2>
  <!-- <template v-for="question in $store.state.questions"></template> -->
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-6">
          <div>質問者</div>
        </div>
        <div class="col-6 text-right">
          <span class="badge badge-secondary p-2">解決済</span>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">タイトル</h5>
      <p class="card-text">質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容質問内容</p>
    </div>
    <div class="card-footer text-muted">
      <div class="row">
        <div class="col-6">
          <div class="mt-2">2021/6/18</div>
        </div>
        <div class="col-6 text-right">
          <button type="button" class="btn btn-primary">いいね <span class="badge badge-light">5</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
// import axios from "axios";
// import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Question",
  props: {},
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    const store = useStore();

    const data = reactive({
      test: Object,
    });

    onMounted(() => {
      store.dispatch("checkSignedIn");
    });

    return {
      data,
    };
  },
};
</script>

<style scoped></style>
