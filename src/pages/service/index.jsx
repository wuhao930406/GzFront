import React, { useState, useEffect } from 'react';

import { Row, Col, Collapse, Button, Tag } from 'antd';
import { Carousel, Tabs, WhiteSpace } from 'antd-mobile';
import { connect } from 'umi';
import styles from './index.less';
import IconFont from '@/components/IconFont';
import PublicList from '@/components/PublicList';
import { customer } from '@/services/factory';

const tabs = [
  {
    title: (
      <div className="center">
        <IconFont
          type="icon-kefu"
          style={{ fontSize: 22, marginRight: 6 }}
        ></IconFont>{' '}
        客服电话
      </div>
    ),
  },
  {
    title: (
      <div className="center">
        <IconFont
          type="icon-dian"
          style={{ fontSize: 22, marginRight: 6 }}
        ></IconFont>{' '}
        线下门店
      </div>
    ),
  },
];

let service = (props) => {
  let {} = props;

  return (
    <div style={{ height: '100%' }}>
      <Tabs tabs={tabs} tabBarInactiveTextColor="#666">
        <div style={{ height: '100%' }}>
          <PublicList
            post={customer}
            type="customer"
            Header={() => (
              <img
                src={require('@/assets/service_1.jpg')}
                style={{ width: '100%', marginBottom: 12 }}
              />
            )}
          ></PublicList>
        </div>
        <div style={{ height: '100%' }}>
          <PublicList
            post={customer}
            Header={() => (
              <img
                src={require('@/assets/service_2.jpg')}
                style={{ width: '100%', marginBottom: 12 }}
              />
            )}
          ></PublicList>
        </div>
      </Tabs>
    </div>
  );
};

export default service;
