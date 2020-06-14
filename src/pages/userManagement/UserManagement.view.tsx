import React, { ReactElement } from 'react';
import PageTitle from '@/components/pageTitle/PageTitle.view';
import { UseUserManagementHook } from './UserManagement.hook';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PageForm from '@/components/pageForm/PageForm.view';
import PageTable from '@/components/pageTable/PageTable.view';
import { PageModal } from '@/components/pageModal/PageModal.view';

export const UserManagementView = (): ReactElement => {
  const { add, pageFormRef, pageFormOptions, pageTableOptions, loading, pageModalOptions, showModal, callbackOptions, pageModalFormRef, pageModalFormOptions } = UseUserManagementHook();

  return (
    <div className="user-management">
      <PageTitle name="用户管理">
        <Button type="primary" onClick={add}>
          新增
        </Button>
      </PageTitle>
      <PageForm ref={pageFormRef} options={pageFormOptions} />
      <PageTable options={pageTableOptions} loading={loading} />
      <PageModal options={pageModalOptions} visible={showModal} callbackOptions={callbackOptions}>
        <PageForm ref={pageModalFormRef} options={pageModalFormOptions} />
      </PageModal>
    </div>
  );
};

export const TableTool = (text: string, record: any, index: number, edit: Function, del: Function) => {
  return (
    <React.Fragment>
      <Button type="primary" size="small" onClick={() => edit(text, record, index)}>
        编辑
      </Button>
      &nbsp;&nbsp;
      <Button type="primary" danger size="small" onClick={() => del(text, record, index)}>
        删除
      </Button>
    </React.Fragment>
  );
};

export const ModalIcons = () => <ExclamationCircleOutlined />;

export default UserManagementView;
