//该类是全局状态管理类

import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

/*//initial state: 存储的状态信息，比如用户信息
const state = () => ({
  loginUser: {
    userName: "陈爱国",
  },
});

// getters
const getters = {};

// actions : 执行异步操作，并且触发mutation的更改(actions调用mutation)
const actions = {
  async getLoginUser({ commit, state }, payload) {
    commit("updateUser", { userName: "怡宝" });
  },
};

// mutations : 定义了对变量的更新操作的方法
const mutations = {
  updateUser(state, payload) {
    state.loginUser = payload;
  },
};*/

//上面的那种写法会报错，所以换成下面的这种写法
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      //从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
