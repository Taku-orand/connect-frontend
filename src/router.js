import { createRouter, createWebHistory } from "vue-router";
import Signup from "./components/Signup.vue";
import Signin from "./components/Signin.vue";
import Home from "./components/Home.vue";
import MyPage from "./components/MyPage.vue";
import Question from "./components/Question.vue";
import QuestionList from "./components/QuestionList.vue";
import QuestionDetail from "./components/QuestionDetail.vue";
import ReplyAnswer from "./components/ReplyAnswer.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/my_page",
      name: "my_page",
      component: MyPage,
    },
    {
      path: "/question",
      name: "question",
      component: Question,
      children: [
        {
          path: "list",
          name: "question_list",
          component: QuestionList,
        },
        {
          path: "detail/:id",
          name: "question_detail",
          component: QuestionDetail,
        },
        {
          path: "reply_answer/:id",
          name: "reply_answer",
          component: ReplyAnswer,
        },
      ],
    },
  ],
});
