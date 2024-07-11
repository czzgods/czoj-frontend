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
</script>
