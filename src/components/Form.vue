<template>
  <div class="user-area mb-3">
    <div class="row">
      <div class="col-4 pr-0">
        <p><i class="fas fa-user mr-2"></i>投稿者</p>
      </div>
      <div class="col-2 p-0">
        <div v-if="!isAnswer">
          <div v-if="$store.state.questionDetails.anonymous">
            <p>匿名</p>
          </div>
          <div v-else>
            <p>{{ $store.state.user.name }}</p>
          </div>
        </div>
        <div v-if="isAnswer">
          <div v-if="$store.state.newAnswer.anonymous">
            <p>匿名</p>
          </div>
          <div v-else>
            <p>{{ $store.state.user.name }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 pl-0 text-right">
        <button type="button" class="btn btn-secondary p-1 p-md-2" @click="isAnon">匿名で投稿する</button>
      </div>
    </div>
  </div>
  <div v-if="!isAnswer" class="tag-area mb-3">
    <p><i class="fas fa-tags mr-2"></i>タグ</p>
    <div class="row">
      <div class="col-6 pr-0">
        <template v-for="(tag, key) in $store.state.tags" :key="key">
          <template v-if="$store.state.selected_tags_id.includes(tag.id)">
            <span class="badge badge-primary p-1 p-md-2 mr-1 mr-md-2 mb-1 mb-md-2">{{ tag.name }}</span>
          </template>
        </template>
      </div>
      <div class="col-6 pl-0 text-right">
        <button type="button" class="btn btn-secondary p-1 p-md-2" data-toggle="modal" data-target="#selectTagModal">タグを選択する</button>
      </div>
    </div>
  </div>
  <div v-if="!isAnswer" class="form-group">
    <label for="title"><i class="fas fa-heading mr-2"></i>タイトル</label>
    <input v-model="$store.state.questionDetails.title" type="text" class="form-control" id="title" placeholder="タイトルを入力してください。" />
  </div>
  <Md :isAnswer="isAnswer"></Md>

  <!-- タグ選択モーダル -->
  <div class="modal fade" id="selectTagModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">関連するタグを選択</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <template v-for="(tag, key) in $store.state.tags" :key="key">
            <template v-if="$store.state.selected_tags_id.includes(tag.id)">
              <button @click="selectTag(tag)" class="btn btn-primary mr-2 mb-2"><i class="fas fa-tag mr-1"></i>{{ tag.name }}</button>
            </template>
            <template v-else>
              <button @click="selectTag(tag)" class="btn btn-secondary mr-2 mb-2"><i class="fas fa-tag mr-1"></i>{{ tag.name }}</button>
            </template>
          </template>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">決定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, onMounted } from "vue";
import Md from "./Md.vue";

export default {
  components: {
    Md,
  },
  props: {
    isAnswer: Boolean,
  },
  setup(props) {
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
      if (!props.isAnswer) {
        store.state.questionDetails.anonymous = !store.state.questionDetails.anonymous;
      }
      if (props.isAnswer) {
        store.state.newAnswer.anonymous = !store.state.newAnswer.anonymous;
      }
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
