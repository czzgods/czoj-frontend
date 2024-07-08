//该类表示全局的页面头部布局，就是页面上方导航栏那块
<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
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
            <img class="logo" src="../assets/love.jpg" />
            <div class="title">澜 OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <!--        加了这几个?,搭配上后面的"未登录"，会在store无状态信息的时候显示未登录-->
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

//页面路由，页面跳转
const router = useRouter();

//展示在菜单的路由数组
const visibleRoutes = routes.filter((item, index) => {
  if (item.meta?.hideInMenu) {
    return false;
  }
  return true;
});
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

//通过下面这个方法来获取页面存储的状态信息
const store = useStore();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "怡宝",
    role: "admin",
  });
}, 3000);
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
