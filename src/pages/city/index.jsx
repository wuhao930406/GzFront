import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Button, Spin, Skeleton } from 'antd';
import { Toast, Tabs, WhiteSpace, Modal, Grid } from 'antd-mobile';
import { connect, history, useRequest } from 'umi';
import styles from './index.less';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ResultList from '@/components/ResultList';
import scrollAnimation from '@/utils/scrollAnimation';
import IconFont from '@/components/IconFont';
import { code, banner } from '@/services/factory';
import Auth from '@/components/Auth';

const data1 = [
  {
    icon: 'bus',
    name: '两城一家',
  },
  {
    icon: 'jia',
    name: '新家安置',
  },
  {
    icon: 'edu',
    name: '教育服务',
  },
  {
    icon: 'fuwu',
    name: '生活服务',
  },
  {
    icon: 'gz',
    name: '工作方案',
  },
];

const City = () => {
  return (
    <div style={{ height: '100%', backgroundColor: '#fff' }}>
      <img
        style={{ width: '100%' }}
        src={require(`@/assets/poster.jpg`)}
        alt=""
      />
      <Grid
        data={data1}
        columnNum={3}
        onClick={(el, index) => {
          if (el.icon == 'bus') {
            history.push('/bus');
          } else {
            Toast.offline('该功能正在努力开发中,敬请期待...', 1);
          }
        }}
        renderItem={(dataItem) => (
          <div style={{ padding: '12.5px' }}>
            <IconFont
              type={'icon-' + dataItem.icon}
              style={{
                fontSize: 36,
                color: dataItem.icon == 'bus' ? 'red' : '#666',
              }}
            ></IconFont>
            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
              <span>{dataItem.name}</span>
            </div>
          </div>
        )}
      />
    </div>
  );
};
export default City;
