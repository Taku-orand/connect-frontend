<template>
  <div class="row mb-3">
    <div class="col">
      <h4>投稿者</h4>
    </div>
    <div class="col">
      <div v-if="$store.state.questionDetails.anonymous">
        <div class="">匿名</div>
      </div>
      <div v-else>
        <h4 class="">{{ $store.state.user.name }}</h4>
      </div>
    </div>
    <div class="col">
      <button type="button" class="btn btn-secondary" @click="isAnon">匿名で投稿する</button>
    </div>
  </div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#selectTagModal">
    タグを選択する
  </button>
  <div class="form-group">
    <label for="title">タイトル</label>
    <input v-model="$store.state.questionDetails.title" type="text" class="form-control" id="title" placeholder="タイトルを入力してください。" />
  </div>
  <div class="form-group">
    <label for="content">内容</label>
    <textarea v-model="$store.state.questionDetails.content" class="form-control" id="content" rows="5" placeholder="質問内容を入力してください。"></textarea>
  </div>

  <!-- タグ選択モーダル -->
  <div class="modal fade" id="selectTagModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">投稿に関連するタグを選択</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <template v-for="(tag, key) in $store.state.tags" :key="key">
            <template v-if="$store.state.selected_tags_id.includes(tag.id)">
              <button @click="selectTag(tag)" class="btn btn-primary mr-2 mb-2">{{ tag.name }}</button>
            </template>
            <template v-else>
              <button @click="selectTag(tag)" class="btn btn-secondary mr-2 mb-2">{{ tag.name }}</button>
            </template>
          </template>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
          <button type="button" class="btn btn-primary">タグを選択</button>
        </div>
      </div>
    </div>
  </div>
  {{ $store.state.selected_tags_id }}
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

    function selectTag(tag) {
      if (store.state.selected_tags_id.includes(tag.id)) {
        store.commit("removeTagId", tag.id);
      } else {
        store.commit("addTagId", tag.id);
      }
    }

    return {
      data,
      isAnon,
      selectTag,
    };
  },
};
</script>
