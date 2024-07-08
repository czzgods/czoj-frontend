import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 该类用于定义一个公共的权限校验方法(判定当前用户是否具有某个权限)
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前登录用户的权限,如何没有用户信息，则显示未登录
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  //如果需要用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    //如果用户没有登录
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  //如果当面页面需要管理员权限才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //如果不为管理员，则表示无权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  //如果是除上面这几个条件外的其它条件，直接返回true
  return true;
};

//导出
export default checkAccess;
