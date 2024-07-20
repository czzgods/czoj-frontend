<template>
  <a-card title="修改用户信息" style="width: 400px; margin: 0 auto">
    <a-form :model="user" @submit="handleSubmit">
      <a-form-item label="用户头像">
        <a-upload
          action="/upload-avatar"
          :file-list="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
          @success="onSuccess"
          @error="onError"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="file && file.url"
              >
                <img :src="file.url" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
                />
              </div>
              <div class="arco-upload-picture-card" v-else>
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">Upload</div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item label="昵称">
        <a-input v-model="user.userName" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item label="简介">
        <a-textarea v-model="user.userProfile" placeholder="请输入简介" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
//import router from "@/router";
const router = useRouter();
const store = useStore();

interface User {
  userAvatar: string;
  userName: string;
  userProfile: string;
}

interface FileItem {
  name: string;
  url: string;
  status?: string;
  percent?: number;
  response?: {
    url: string;
  };
  file?: File;
}

const user = ref<User>({
  userAvatar: "",
  userName: "",
  userProfile: "",
});

const file = ref<FileItem | null>(null);

const loadData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    user.value = res.data as User;
    file.value = {
      name: "avatar",
      url: user.value.userAvatar,
    };
  } else {
    message.error("加载失败，" + res.message);
  }
};

const onChange = (_: any, currentFile: FileItem) => {
  console.log("Current file:", currentFile);
  file.value = {
    ...currentFile,
    url: URL.createObjectURL(currentFile.file!),
  };
};

const onProgress = (currentFile: FileItem) => {
  file.value = currentFile;
};

const onSuccess = (response: { url: string }, currentFile: FileItem) => {
  if (response.url) {
    message.success("上传成功");
    file.value = {
      ...currentFile,
      url: response.url,
    };
    user.value.userAvatar = response.url;
  } else {
    message.error("上传失败：未返回URL");
  }
};

const onError = (error: any) => {
  message.error("上传头像失败：" + error.message);
};

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 文件!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("图片大小不能超过 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const handleSubmit = async () => {
  const res = await UserControllerService.updateUserUsingPost(user.value);
  if (res.code === 0) {
    message.success("更新成功");
    router.push("/user/profile");
  } else {
    message.error("更新失败，" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>
<style>
a-card {
  padding: 20px;
}

a-form-item {
  margin-bottom: 20px;
}

a-button {
  margin-top: 10px;
}
</style>
