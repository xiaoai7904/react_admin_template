import React from 'react';
import { observer } from 'mobx-react';
import { Menu, Dropdown } from 'antd';
import { useGlobalStore } from '@/store/StoreContext';
import { DownOutlined } from '@ant-design/icons';
import { usePageViewHeaderHook } from './PageView.hook';
import { CommonProps } from '@/types/CommonProps';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const PageViewHeader = observer((props: CommonProps) => {
  const { globalStore } = useGlobalStore();
  const {ChangePassword, Logout} = usePageViewHeaderHook(props);
  const userIcon = require('@/assets/images/userHeader.png') 
   
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={ChangePassword}>
        <span>修改密码</span>
      </Menu.Item>
      <Menu.Item key="1" onClick={Logout}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="page-view-header">
      <h2 className="page-view-header--left">后台管理系统</h2>
      <div className="page-view-header--right">
        <Dropdown trigger={['click']} overlay={menu}>
          <div className="home-header--right-content">
            <span className="page-view-header--name">
              {globalStore.userInfo.userName}
              <DownOutlined />
            </span>
            <img src={userIcon} className="page-view-header--right-user" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
});

export const LogoutIcon = <ExclamationCircleOutlined/>

export default PageViewHeader;
