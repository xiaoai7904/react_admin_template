import { observable, action, computed } from 'mobx';
import { staticRouter } from '@/router/RouterConfig';

export class GlobalStore {
  @observable
  userInfo: userInfo = { userName: '' };

  @observable
  routerList = staticRouter;

  @observable
  menuList: any[] = [];

  @observable
  openMenuList: any[] = [];

  @action.bound
  setUserInfo(userInfo: userInfo) {
    this.userInfo = userInfo;
  }

  @action.bound
  setRouterList(routerList: any) {
    this.routerList = routerList;
  }

  @action.bound
  setMenuList(menuList: any) {
    this.menuList = menuList;
  }

  @action.bound
  setOpenMenuList(menuList: any) {
    this.openMenuList = menuList;
  }
}

export default GlobalStore;

export interface userInfo {
  userName: string;
}
