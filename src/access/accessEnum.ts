/**
 * 该类用于定义权限，权限的种类以及枚举
 */
const ACCESS_ENUM = {
  NOT_LOGIN: "notLogin",
  USER: "user",
  ADMIN: "admin",
};

//导出，不然其它文件引用不了
export default ACCESS_ENUM;
