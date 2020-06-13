import React from 'react';
import { observer } from 'mobx-react';
import { Menu } from 'antd';
import { CommonProps } from '@/types/CommonProps';
import { usePageViewLeftHook } from './PageView.hook';
import { Link } from 'react-router-dom';
import { PageScrollbar } from '@/components/pageScrollbar/PageScrollbar.view';

export const PageViewLeft = observer((props: CommonProps) => {
  const { menuList, defaultSelectedKeys, defaultOpenKeys, pageScrollbarRef, onOpenChange } = usePageViewLeftHook(props);

  return (
    <div className="page-view-left">
      <PageScrollbar ref={pageScrollbarRef} customClassName="page-view-left-scrollbar" options={{ scrollX: false }}>
        <div>
          <Menu theme="dark" mode="inline" style={{ width: 200 }} defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} openKeys={defaultOpenKeys} onOpenChange={onOpenChange}>
            {menuList.map((item: any) => {
              if (item.children && item.children.length === 1) {
                return (
                  <Menu.Item key={item.children[0].path}>
                    <Link to={item.children[0].path}>{item.children[0].name}</Link>
                  </Menu.Item>
                );
              }
              return (
                <Menu.SubMenu title={item.name} key={item.id + ''}>
                  {item.children.map((childrenItem: any) => {
                    return (
                      <Menu.Item key={childrenItem.path}>
                        <Link to={childrenItem.path}>{childrenItem.name}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            })}
          </Menu>
        </div>
      </PageScrollbar>
    </div>
  );
});

export default PageViewLeft;
