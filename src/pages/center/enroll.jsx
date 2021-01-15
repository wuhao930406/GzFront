import { SearchBar, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Col, Collapse, Tag } from 'antd';
import { connect, history } from 'umi';
import {
  LeftOutlined,
  HistoryOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import { CSSTransition } from 'react-transition-group';
import ResultList from '@/components/ResultList/result';
import styles from './index.less';

const { Panel } = Collapse;

let Enroll = (props) => {
  let {
    global: { keyword },
    dispatch,
  } = props;

  return (
    <div className={styles.search}>
      <div
        className="center"
        style={{
          backgroundColor: '#fff',
          position: 'fixed',
          backgroundColor: '#fff',
          zIndex: 99999999,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="center"
          style={{ width: 30, height: 54, justifyContent: 'flex-end' }}
          onClick={() => {
            history.go(-1);
          }}
        >
          <LeftOutlined style={{ fontSize: 24, color: '#000' }}></LeftOutlined>
        </div>
        <span style={{ fontSize: 18, color: '#000' }}>报名记录</span>
        <div
          className="center"
          style={{
            width: 30,
            height: 54,
            justifyContent: 'flex-end',
            opacity: 0,
          }}
        >
          <LeftOutlined style={{ fontSize: 24, color: '#000' }}></LeftOutlined>
        </div>
      </div>
      <div style={{ height: 62 }}></div>
    </div>
  );
};

let Header = connect(({ global, loading }) => ({
  global,
  loading,
}))(Enroll);

export default (props) => {
  return <ResultList Header={Header}></ResultList>;
};
