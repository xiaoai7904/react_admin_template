import React, { ReactElement } from 'react';
import { CommonProps } from '@/types/CommonProps';
import { usePageTitleHook } from './PageTitle.hook';
import './PageTitle.less';

export interface PageTitleProps extends CommonProps {
  name?: string;
  render?: () => ReactElement;
  info?: string;
  children?: any
}

export const PageTitle = (props: PageTitleProps) => {
  const { defaultTitle } = usePageTitleHook(props);
  
  return (
    <div className="page-title-view-wrap">
      <div className="page-title-view-item">
        <h4 className="page-title-view-wrap-name">
          {props.name || defaultTitle}
          {props.render && props.render()}
          {(props.info || !props.render) && (
            <div className="page-title-view-wrap-content">
              <i className="el-icons-information" />
            </div>
          )}
        </h4>
        <div className="page-title-view-wrap-setting">{props.children}</div>
      </div>
    </div>
  );
};

export default PageTitle