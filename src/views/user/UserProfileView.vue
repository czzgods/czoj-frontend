<template>
  <a-card title="用户个人信息" style="width: 400px; margin: 0 auto">
    <a-avatar>
      <img alt="avatar" :src="user.userAvatar" />
    </a-avatar>
    <a-descriptions :column="1" style="margin-top: 20px">
      <a-descriptions-item label="用户ID">{{ user.id }}</a-descriptions-item>
      <a-descriptions-item label="昵称"
        >{{ user.userName }}
      </a-descriptions-item>
      <a-descriptions-item label="简介"
        >{{ user.userProfile }}
      </a-descriptions-item>
      <a-descriptions-item label="角色"
        >{{ user.userRole }}
      </a-descriptions-item>
    </a-descriptions>
    <div style="margin-top: 20px; text-align: center">
      <a-button type="primary" @click="editUserInfo">修改用户信息</a-button>
      <a-button type="danger" @click="logout" style="margin-left: 10px"
        >退出登录
      </a-button>
    </div>
  </a-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  QuestionControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();

const user = ref({
  id: "未登录",
  userAvatar: "默认头像路径",
  userName: "未登录",
  userProfile: "这个用户很懒，什么都没有写。",
  userRole: "未登录",
});
onMounted(() => {
  loadData();
});
const loadData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    user.value = res.data as any;
  } else {
    message.error("加载失败，" + res.message);
  }
};
const editUserInfo = () => {
  router.push("/user/edit");
};

const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    //获取当前登录用户的状态信息
    await store.dispatch("user/getLoginUser");
    //登录成功，跳转主页
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("登录失败" + res.message);
  }
};
</script>

<style scoped>
a-card {
  padding: 20px;
}

a-avatar {
  display: block;
  margin: 0 auto;
}

a-descriptions {
  margin-top: 20px;
}

a-button {
  margin-top: 10px;
}
</style>
