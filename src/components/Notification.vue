<template>
  <div>
    <ul>
      <li v-for="(notification, key) in $store.state.notifications" :key="key">
        {{ notification.visitor.name }}さんが
        <span v-if="notification.action=='answer'">
          <router-link :to="{name: 'question_detail', params: {id: notification.question.id}}">あなたの投稿</router-link>
          にコメントしました。
        </span>
        <span>{{ notification.created_at }}</span>
      </li>
    </ul>
    <!-- <paginate
    :page-count="getPageCount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'＜'"
    :next-text="'＞'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate> -->
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const data = reactive({
      currentPage: 1,
      perPage: 10,
    });

    onMounted(()=>{
      store.dispatch("getNotifications");
    });

    // function getPageCount(){
    //   return Math.ceil(data.items.length / data.parPage);
    // }

    // function clickCallback(page){
    //   data.currentPage = Number(page);
    // }

    return {
      data,
      // getPageCount,
      // clickCallback,
    }
  },
}
</script>