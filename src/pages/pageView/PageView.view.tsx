import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import PageViewLeft from './PageViewLeft.view';
import PageViewHeader from './PageViewHeader.view';
import PageViewContent from './PageViewContent.view';
import { usePageViewHook } from './PageView.hook';
import './PageView.less';

const { Header, Content, Sider } = Layout;

export const PageView = (props: any) => {
  usePageViewHook();
  return (
    <div className="page-view">
      <Layout className="page-view-layout">
        <Header>
          <PageViewHeader {...props}/>
        </Header>
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="0">
            <PageViewLeft {...props}/>
          </Sider>
          <Content>
            <PageViewContent {...props}/>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageView;
