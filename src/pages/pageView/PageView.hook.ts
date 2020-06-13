import { useMount, useUnmount, useLocalStorageState, useRequest } from '@umijs/hooks';
import { useGlobalStore } from '@/store/StoreContext';
import CreateSystemMenu from '@/module/createSystemMenu/CreateSystemMenu';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import Http from '@/module/http/Http';
import { CommonProps } from '@/types/CommonProps';
import { Modal } from 'antd';
import { LogoutIcon } from './PageViewHeader.view';
import { useRef, useState } from 'react';

export const usePageViewHook = () => {
  const { globalStore } = useGlobalStore();
  // 请求用户信息
  const GetUserInfoRequest = useRequest((params = {}) => params, {
    manual: true,
    requestMethod: (data: any) => new Http().post(SystemConfig.getUserInfo, data),
    onSuccess: (result) => {
      let systemMenuIns = new CreateSystemMenu().create(result.data.menuList);
      globalStore.setRouterList(systemMenuIns.getRouterList());
      globalStore.setMenuList(systemMenuIns.getMenuList());
      globalStore.setOpenMenuList(systemMenuIns.getMenuList().map(item => item.children && item.children.length ? item.id + '' : null).filter(item => item !== null));
      globalStore.setUserInfo(result.data.userinfo);
    },
  });

  // 组件初始化
  useMount(() => {
    GetUserInfoRequest.run();
  });
};

export const usePageViewHeaderHook = (props: CommonProps): PageViewHeader => {
  // 请求退出登录
  const LogoutRequest = useRequest((params = {}) => params, {
    manual: true,
    requestMethod: (data: any) => new Http().post(SystemConfig.logout, data),
    onSuccess: (result) => {
      localStorage.setItem('isLogin', 'false');
      props.history?.replace('/login');
    },
  });
  const ChangePassword = () => {};
  const Logout = () => {
    Modal.confirm({
      title: '提示',
      icon: LogoutIcon,
      content: '您确定要退出吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => LogoutRequest.run(),
    });
  };

  return {
    ChangePassword,
    Logout,
  };
};

export const usePageViewLeftHook = (props: CommonProps): PageViewLeft => {
  const { globalStore } = useGlobalStore();
  const pageScrollbarRef: any = useRef();
  const [defaultSelectedKeys] = useState(props.location?.pathname ? [props.location?.pathname] : []);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(globalStore.openMenuList);

  const onOpenChange = (openKeys: string[]) => {
    pageScrollbarRef.current && pageScrollbarRef.current.update();
  };

  if(globalStore.openMenuList.length && !defaultOpenKeys.length) {
    setDefaultOpenKeys(globalStore.openMenuList)
  }
  
  return {
    defaultSelectedKeys,
    defaultOpenKeys,
    menuList: globalStore.menuList,
    pageScrollbarRef,
    onOpenChange,
  };
};

export interface PageViewHeader {
  ChangePassword(): void;
  Logout(): void;
}

export interface PageViewLeft {
  defaultSelectedKeys: string[];
  defaultOpenKeys: string[];
  menuList: any[];
  pageScrollbarRef: any;
  onOpenChange(openKeys: string[]): void;
}
