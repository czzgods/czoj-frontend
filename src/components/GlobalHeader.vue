<template>
  <div id="globalHeader">
    <a-menu
      mode="horizontal"
      :selected-keys="selectKeys"
      @menu-item-click="doMenuClick"
    >
      <a-menu-item
        key="0"
        :style="{ padding: 0, marginRight: '38px' }"
        disabled
      >
        <div class="title-bar">
          <img class="logo" src="../assets/oj-logo.jpg" />
          <div class="title">澜 OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

//页面路由，页面跳转
const router = useRouter();

//默认当前页
const selectKeys = ref(["/"]);

//路由跳转后，更新选中的菜单项的高亮状态
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});

//菜单栏点击事件，用于实现路径跳转
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}

.title {
  color: #444;
  margin-left: 16px;
}
</style>
