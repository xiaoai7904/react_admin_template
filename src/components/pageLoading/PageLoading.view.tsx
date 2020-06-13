import React, { ReactElement } from 'react';
import { Spin } from 'antd';

export const PageLoading = (): ReactElement => {
  return (
    <Spin tip="Loading...">
      <div style={{ width: '100vw', height: '100vh' }}></div>
    </Spin>
  );
};

export default PageLoading;
