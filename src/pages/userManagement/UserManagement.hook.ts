import React, { useState, useRef } from 'react';
import { useRequest, useMount } from '@umijs/hooks';
import { PageFormProps } from '@/components/pageForm/PageForm';
import { PageTableProps } from '@/components/pageTable/PageTable';
import { ModalProps } from 'antd/lib/modal';
import { Modal } from 'antd';
import Http from '@/module/http/Http';
import SystemConfig from '@/module/systemConfig/SystemConfig';
import { TableTool, ModalIcons } from './UserManagement.view';

export const UseUserManagementHook = () => {
  const pageFormRef: React.MutableRefObject<{ getData: () => { [key: string]: any }; setData: (key: string, value: any) => void; restData: () => void }> | any = useRef();
  const pageModalFormRef: React.MutableRefObject<{ getData: () => { [key: string]: any }; setData: (key: string, value: any) => void; restData: () => void }> | any = useRef();

  const defalutPageFormOptions: PageFormProps = {
    options: {
      inline: true,
      config: [
        {
          id: 'userName',
          type: 'input',
          name: '用户名',
          options: {
            value: '',
          },
        },
        {
          id: 'submit',
          type: 'button',
          name: '',
          options: {
            buttonName: '搜索',
            htmlType: 'submit',
            click: () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log('搜索', pageFormRef.current.getData());
                  resolve();
                }, 3000);
              });
            },
          },
        },
        {
          id: 'reset',
          type: 'button',
          name: '',
          options: {
            buttonName: '重置',
            htmlType: 'reset',
            click: () => {
              return new Promise((resolve, reject) => {
                pageFormRef.current.resetData();

                setTimeout(() => {
                  console.log('重置', pageFormRef.current.getData());
                  resolve();
                }, 3000);
              });
            },
          },
        },
      ],
    },
  };
  const defalutPageTableeOptions: PageTableProps<any> = {
    columns: [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center',
      },
      {
        title: '登入账号',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operates',
        key: 'operates',
        align: 'center',
        render(value: any, record: any, index: number) {
          return TableTool(value, record, index, edit, del);
        },
      },
    ],
    dataSource: [],
    pagination: {
      pageSize: 100,
      current: 1,
      total: 1000,
    },
  };
  const defalutPageModalOptions: ModalProps = { title: '用户管理' };
  const defalutPageModalFormOptions: PageFormProps = {
    options: {
      isModal: true,
      inline: false,
      config: [
        {
          id: 'userName',
          type: 'input',
          name: '用户名',
          options: {
            value: '',
          },
        },
        {
          id: 'name',
          type: 'input',
          name: '登录账号',
          options: {
            value: '',
          },
        },
        {
          id: 'password',
          type: 'inputPassword',
          name: '密码',
          options: {
            value: '',
          },
        },
      ],
    },
  };

  const [pageFormOptions] = useState(defalutPageFormOptions.options);
  const [pageModalFormOptions] = useState(defalutPageModalFormOptions.options);
  const [pageTableOptions, setPageTableOptions] = useState(defalutPageTableeOptions);
  const [pageModalOptions] = useState(defalutPageModalOptions);
  const [showModal, setShowModal] = useState(false);
  const [callbackOptions] = useState({
    onCancel() {
      setShowModal(false);
    },
    onOk() {
      setShowModal(false);
      console.log('搜索', pageModalFormRef.current.getData());
    },
  });
  
  const add = () => {
    setShowModal(true);
  };

  const edit = (text: string, record: any, index: number) => {
    setShowModal(true);
    setTimeout(() => {
      defalutPageModalFormOptions.options.config.map((item) => {
        item.options && pageModalFormRef.current.setData(item.id, record[item.id]);
      });
    }, 100);
  };

  const del = (text: string, record: any, index: number) => {
    Modal.confirm({
      title: '您确定删除该条数据吗？',
      icon: ModalIcons(),
      content: '删除后的数据无法恢复,请谨慎操作',
      onOk() {},
      onCancel() {},
    });
  };

  const { loading, run } = useRequest((params = {}) => params, {
    manual: true,
    requestMethod: (data: any) => new Http().post(SystemConfig.getUserList, data),
    onSuccess: (result, params) => {
      setPageTableOptions(Object.assign({}, pageTableOptions, { dataSource: result.data.page.list, pagination: { pageSize: result.data.page.pageSize, current: result.data.page.currPage, total: result.data.page.totalCount } }));
    },
  });

  useMount(() => {
    run();
  });

  return {
    add,
    pageFormRef,
    pageModalFormRef,
    pageFormOptions,
    pageModalFormOptions,
    pageTableOptions,
    setPageTableOptions,
    pageModalOptions,
    showModal,
    setShowModal,
    loading,
    callbackOptions,
  };
};
