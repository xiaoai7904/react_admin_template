import { useState } from 'react';
import { PageTableProps } from './PageTable';
import useUpdateEffect from '@umijs/hooks/lib/useUpdateEffect';
import { useMount } from '@umijs/hooks';

export const usePageTableHook = (props: PageTableProps<any>) => {
  const [columns, setColumns] = useState(props.columns);

  const onTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {};
  const _getStrLen = (str: any):number => {
    var realLength = 0;
    let charCode;
    for (var i = 0; i < str.toString().length; i++) {
      charCode = str.toString().charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  };
  const _updateColumns = () => {
    if (props.dataSource && props.dataSource.length) {
      let headerObj: { [key: string]: any } = {};
      let newColumns = columns ? columns.slice() : [];

      newColumns.forEach((headerItem:any) => {
        props.dataSource &&
          props.dataSource.map((item: any) => {
            if (headerItem.key) {
              if (!headerObj[headerItem.key]) {
                headerObj[headerItem.key] = [];
              }

              let tableTitle = _getStrLen(headerItem.title) * 2;
              let tableData = item[headerItem.key] ? _getStrLen(item[headerItem.key]) : 1;

              let len = tableTitle > tableData ? tableTitle : tableData;

              headerObj[headerItem.key].push(len * 10);
            }
          });
        if (!headerItem.width) {
          if (!headerObj[headerItem.key]) {
            headerItem.width = 200;
          } else if (headerItem.render) {
            headerItem.width = 150;
          } else {
            headerItem.width = Math.max(...headerObj[headerItem.key]);
          }
        }

        // if (headerItem.sortable === 'custom') {
        //   if (headerItem.key === this.options.sort.key) {
        //     headerItem['sortType'] = Object.keys(this.options.sort).length ? this.options.sort.order : '';
        //   } else {
        //     headerItem['sortType'] = '';
        //   }
        // }
      });
      setColumns(newColumns);
    }
  };
  const _filterHeader = () => {
    let newColumns: any = [];
    columns &&
      columns.forEach((item: any) => {
        if (item.hidden === undefined || (typeof item.hidden === 'boolean' && item.hidden !== true) || (typeof item.hidden === 'function' && !item.hidden())) {
          newColumns.push(item);
        }
      });
    setColumns(newColumns);
  };

  useMount(() => {
    _filterHeader();
  });

  useUpdateEffect(() => {
    _updateColumns();
  }, [props.dataSource]);

  return { onTableChange, columns };
};

export default usePageTableHook;
