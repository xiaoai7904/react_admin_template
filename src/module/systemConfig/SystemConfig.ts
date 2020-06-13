export default class SystemConfig {
  // 登录
  static login: string = '/sys/login';
  // 登出
  static logout: string = '/sys/logout';
  // 获取用户信息
  static getUserInfo: string = '/sys/menu/nav';
  // 获取角色管理
  static getRoleList: string = '/sys/role/list';
  // 查询用户
  static getUserList: string = '/sys/user/list';
  // 修改密码
  static commonResetPassword: string = '/sys/user/password';
  // 获取选中角色对应的权限列表·
  static getRoleInfoById: string = '/sys/role/info';
  // 系统日志
  static getLogList: string = '/sys/log/list';
}
