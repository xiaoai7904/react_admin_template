import React, { useState, useRef } from 'react';
import PageTitle from '@/components/pageTitle/PageTitle.view';
import { Button } from 'antd';
import PageForm from '@/components/pageForm/PageForm.view';
import { PageFormProps } from '@/components/pageForm/PageForm.types';
import PageTable from '@/components/pageTable/PageTable.view';
import { PageTableProps } from '@/components/pageTable/PageTable.types';
import { ModalProps } from 'antd/lib/modal';
import { PageModal } from '@/components/pageModal/PageModal.view';
import { useRequest, useMount } from '@umijs/hooks';

export const Text = () => {
  const _pageFormOptions: PageFormProps = {
    options: {
      inline: true,
      config: [
        {
          id: 'test1',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'test2',
          type: 'select',
          name: '下拉',
          options: {
            value: '',
            list: [
              {
                label: '全部',
                value: 'all',
              },
              {
                label: '启用',
                value: '1',
              },
              {
                label: '禁用',
                value: '2',
              },
            ],
          },
        },
        // {
        //   id: 'test3',
        //   type: 'inputNumber',
        //   name: '数字输入',
        //   options: {
        //     value: '',
        //   },
        // },

        {
          id: 'test5',
          type: 'datePicker',
          name: '日期',
        },
        {
          id: 'test6',
          type: 'rangePicker',
          name: '日期范围',
        },
        {
          id: 'bbavc2vf',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'bgsf323dsa',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'bbbbb',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'csadvsa',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'vbb',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'ccccc',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'dafdaaa',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'vvac',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'adc',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'cc',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'dsa',
          type: 'input',
          name: '输入框',
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
        // {
        //   id: 'test7',
        //   type: 'switch',
        //   name: '开关',
        // },
        // {
        //   id: 'test8',
        //   type: 'radio',
        //   name: '单选框',
        // },
        // {
        //   id: 'test9',
        //   type: 'customRender',
        //   name: '自定义',
        //   options: {
        //     customRender() {
        //       return <div>自定义组件</div>;
        //     },
        //   },
        // },
      ],
    },
  };
  const _pageModalFormOptions: PageFormProps = {
    options: {
      isModal: true,
      inline: false,
      config: [
        {
          id: 'test1',
          type: 'input',
          name: '输入框',
          options: {
            value: '',
          },
        },
        {
          id: 'test2',
          type: 'select',
          name: '下拉',
          options: {
            value: '',
            list: [
              {
                label: '全部',
                value: 'all',
              },
              {
                label: '启用',
                value: '1',
              },
              {
                label: '禁用',
                value: '2',
              },
            ],
          },
        },
        {
          id: 'test3',
          type: 'inputNumber',
          name: '数字输入',
          options: {
            value: '',
          },
        },

        {
          id: 'test5',
          type: 'datePicker',
          name: '日期',
        },
        {
          id: 'test6',
          type: 'rangePicker',
          name: '日期范围',
        },
        {
          id: 'test41',
          type: 'button',
          name: '按钮',
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
        // {
        //   id: 'test42',
        //   type: 'button',
        //   name: '',
        //   options: {
        //     buttonName: '重置',
        //     htmlType: 'reset',
        //     click: () => {
        //       return new Promise((resolve, reject) => {
        //         pageFormRef.current.resetData();

        //         setTimeout(() => {
        //           console.log('重置', pageFormRef.current.getData());
        //           resolve();
        //         }, 3000);
        //       });
        //     },
        //   },
        // },
        {
          id: 'test7',
          type: 'switch',
          name: '开关',
        },
        {
          id: 'test8',
          type: 'radio',
          name: '单选框',
        },
        {
          id: 'test9',
          type: 'customRender',
          name: '自定义',
          options: {
            customRender() {
              return <div>自定义组件</div>;
            },
          },
        },
      ],
    },
  };
  const _pageTableOptions: PageTableProps<any> = {
    columns: [
      {
        title: '1',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '2',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '3',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '4',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '5',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '6',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '7',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '8',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '9',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '10',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '11',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '12',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '13',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '14',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '自定义',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
        ellipsis: true,
        // width: 200,
        render(value: any, record: any, index: number) {
          return <span>自定义{value}</span>;
        },
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
        align: 'center',
        width: 200,
      },
    ],
    dataSource: [],
    pagination: {
      pageSize: 100,
      current: 1,
      total: 1000,
    },
  };
  const _datasource = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '1',
      name: '底部最后一条',
      age: 32,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
    },
  ];
  const _pageModalOptions: ModalProps = {
    title: '弹窗测试',
  };

  const pageFormRef: React.MutableRefObject<{ getData: () => { [key: string]: any }; setData: () => void; restData: () => void }> | any = useRef();
  const pageModalFormRef: React.MutableRefObject<{ getData: () => { [key: string]: any }; setData: () => void; restData: () => void }> | any = useRef();
  const [pageFormOptions] = useState(_pageFormOptions.options);
  const [pageModalFormOptions] = useState(_pageModalFormOptions.options);
  const [pageTableOptions, setPageTableOptions] = useState(_pageTableOptions);
  const [pageModalOptions] = useState(_pageModalOptions);
  const [showModal, setShowModal] = useState(false);
  const [callbackOptions] = useState({
    onCancel() {
      setShowModal(false);
    },
    onOk() {
      // setShowModal(false);
      console.log('搜索', pageModalFormRef.current.getData());
    },
  });
  const add = () => {
    setShowModal(true);
  };

  const getTableList = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(_datasource);
      }, 3000);
    });
  };
  const { loading, run } = useRequest(getTableList, {
    manual: true,
    onSuccess: (result, params) => {
      setPageTableOptions(Object.assign({}, pageTableOptions, { dataSource: result }));
    },
  });
  useMount(() => {
    run();
  });

  return (
    <div className="test">
      <PageTitle name="测试页面">
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

export default Text;
