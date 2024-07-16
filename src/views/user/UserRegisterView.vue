<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userAccount"
        tooltip="请输入正确的账号"
        label="账号"
        :rules="[{ required: true, min: 4, message: '账号长度至少为4位' }]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号..." />
      </a-form-item>
      <a-form-item
        field="userPassword"
        tooltip="请输入正确的密码"
        label="密码"
        :rules="[{ required: true, min: 8, message: '密码长度至少为8位' }]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码..."
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        tooltip="请输入正确的密码"
        label="密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码..."
        />
      </a-form-item>
      <a-form-item style="display: flex; justify-content: center">
        <a-button
          type="primary"
          html-type="submit"
          style="width: 120px; display: block; margin: 0 auto"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
  UserRegisterRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单，执行注册
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (form.userPassword !== form.checkPassword) {
    //校验两次输入密码是否一致
    message.error("两次输入密码不一致!");
    return;
  }
  if (res.code === 0) {
    //获取当前登录用户的状态信息
    //await store.dispatch("user/getLoginUser");
    //注册成功，跳转登录页面、
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败" + res.message);
  }
};
</script>
