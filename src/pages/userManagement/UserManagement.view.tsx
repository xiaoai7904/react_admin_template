import React, { ReactElement } from 'react';
import PageTitle from '@/components/pageTitle/PageTitle.view';
import { UseUserManagementHook } from './UserManagement.hook';
import { Button } from 'antd';
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

export default UserManagementView;
