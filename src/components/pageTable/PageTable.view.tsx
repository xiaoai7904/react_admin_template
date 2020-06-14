import React from 'react';
import { Table } from 'antd';
import usePageTableHook from './PageTable.hook';
import { PageTableProps } from './PageTable';
import './PageTable.less';

export const PageTable = (props: { options: PageTableProps<any>, loading: boolean }) => {
  const { onTableChange, columns } = usePageTableHook(props.options);
  return (
    <div className="page-table">
      <Table rowKey="id" size="small" tableLayout={props.options.tableLayout} columns={columns} pagination={props.options.pagination ? { current: props.options.pagination.current, pageSize: props.options.pagination.pageSize, total: props.options.pagination.total, showTotal: (total) => `共${total}条`, showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100'] } : {}} dataSource={props.options.dataSource} loading={props.loading} onChange={onTableChange} scroll={{ y: 'calc(100vh - 346px)' }} />
    </div>
  );
};

export default PageTable;
