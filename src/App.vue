//app.vue是全局文件
<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//获取路由信息
const router = useRouter();
//获取当前登录用户状态信息
const store = useStore();
router.beforeEach((to, from, next) => {
  //仅管理员可见，并且需要判断当前登录用户是否具有权限
  if (to.meta?.access === "canAdmin") {
    if (store.state.user.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
