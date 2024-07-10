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
import ACCESS_ENUM from "@/access/accessEnum";
import { onMounted } from "vue";

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};
/**
 * 该方法可以用于前端页面初始化
 * 在前端页面初始化的时候会去调用我们上面所定义的函数
 */
onMounted(() => {
  doInit();
});
//获取路由信息
const router = useRouter();
//获取当前登录用户状态信息
const store = useStore();
router.beforeEach((to, from, next) => {
  //仅管理员可见，并且需要判断当前登录用户是否具有权限
  if (to.meta?.access === ACCESS_ENUM.ADMIN) {
    if (store.state.user.loginUser?.userRole !== ACCESS_ENUM.ADMIN) {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
