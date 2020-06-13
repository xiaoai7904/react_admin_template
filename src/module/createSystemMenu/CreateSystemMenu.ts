import { staticRouter, dynamicRouter } from '@/router/RouterConfig';
import { ReactElement } from 'react';
// import store from '@/store/store';

/**
 * 创建系统菜单
 */
export default class CreateSystemMenu {
  systemMenuList: any[];
  systemRouterList: any[];

  constructor() {
    this.systemMenuList = [];
    this.systemRouterList = [];
    return this;
  }
  create(menuList: any[]) {
    if (!menuList) return this;
    let router: any[] = [];
    let menu: any[] = [];

    menuList.map((item: any) => {
      let menuItemInfo: any = {
        id: item.id,
        name: item.name,
        icon: item.icon,
      };
      let routerItemInfo: routerItemInfo[] = [];

      if (item.list && item.list.length) {
        menuItemInfo.children = [];

        item.list.map((childrenItem: any) => {
          menuItemInfo.children.push({
            id: childrenItem.id,
            name: childrenItem.name,
            icon: childrenItem.icon,
            path: childrenItem.url && childrenItem.url.replace('/sys', ''),
          });
          dynamicRouter[childrenItem.url] &&
            routerItemInfo.push({
              path: childrenItem.url && childrenItem.url.replace('/sys', ''),
              name: childrenItem.name,
              component: dynamicRouter[childrenItem.url].component,
            });
        });
      }
      menu.push(menuItemInfo);
      router = [...router, ...routerItemInfo];
    });

    this.systemMenuList = menu.slice(0);
    this.systemRouterList = router.slice(0);

    return this;
  }
  getMenuList() {
    return this.systemMenuList;
  }
  getRouterList() {
    return [...staticRouter, ...this.systemRouterList];
  }
}

export interface menuItemInfo {
  id: string;
  name: string;
  icon: string;
  children?: any[];
  [key: string]: any;
}

export interface routerItemInfo {
  path: string,
  name: string,
  component?: any
}