<template>
  <div class="user-area mb-3">
    <div class="row">
      <div class="col-2">
        <div>投稿者</div>
      </div>
      <div class="col-6">
        <div v-if="$store.state.questionDetails.anonymous">
          <h4>匿名</h4>
        </div>
        <div v-else>
          <h4>{{ $store.state.user.name }}</h4>
        </div>
      </div>
      <div class="col-4 text-right">
        <button type="button" class="btn btn-secondary" @click="isAnon">匿名で投稿する</button>
      </div>
    </div>
  </div>
  <div class="tag-area mb-3">
    <div class="row">
      <div class="col-1">
        <div>タグ</div>
      </div>
      <div class="col-7">
        <template v-for="(tag, key) in $store.state.tags" :key="key">
          <template v-if="$store.state.selected_tags_id.includes(tag.id)">
            <span class="badge badge-primary p-2 mr-2">{{ tag.name }}</span>
          </template>
        </template>
      </div>
      <div class="col-4 text-right">
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#selectTagModal">
          タグを選択する
        </button>
      </div>
    </div>
  </div>
  <div class="input-">
    <div class="form-group">
      <label for="title">タイトル</label>
      <input v-model="$store.state.questionDetails.title" type="text" class="form-control" id="title" placeholder="タイトルを入力してください。" />
    </div>
    <Md></Md>
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
          <button type="button" class="btn btn-primary" data-dismiss="modal">決定</button>
        </div>
      </div>
    </div>
  </div>
  {{ $store.state.selected_tags_id }}
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
