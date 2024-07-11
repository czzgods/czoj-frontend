//获取路由信息
import store from "@/store";
import "@/store";
import router from "@/router";
import AccessEnum from "@/access/accessEnum";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);
  //仅管理员可见，并且需要判断当前登录用户是否具有权限
  const loginUser = store.state.user.loginUser;
  //如果之前没登录过，自动登录
  if (!loginUser || !loginUser.userRole) {
    //加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
  }
  //获取用户要跳转的页面所需要的权限信息
  const needAccess = (to.meta?.access as string) ?? AccessEnum.NOT_LOGIN;
  //要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //并且用户没有登录,跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      //直接跳转
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录，但是权限不足
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
