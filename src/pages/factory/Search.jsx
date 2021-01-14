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

let Search = (props) => {
  let {
    global: { keyword },
    dispatch,
  } = props;
  let searchref = useRef(),
    [searchistory, changehis] = useState(
      localStorage.getItem('SH') ? JSON.parse(localStorage.getItem('SH')) : [],
    ),
    [postData, changepostdata] = useState(props.global.postData);

  useEffect(() => {
    searchref?.current?.focus();
  }, []);

  function setpostdata(value) {
    dispatch({
      type: 'global/postData',
      payload: {
        name: value,
        pageIndex: 1,
      },
    });
  }
  console.log(postData);

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
        <SearchBar
          style={{ flex: 1 }}
          placeholder="搜索企业名称或关键字"
          ref={searchref}
          cancelText={<span style={{ color: '#000' }}>搜索</span>}
          value={postData.name}
          onChange={(val) => {
            let value = val; //&& val.replace(/\s*/g, '');
            if (value) {
              changepostdata({ name: value });
            } else {
              changepostdata({ name: '' });
            }
          }}
          onCancel={(val) => {
            let value = val; //&& val.replace(/\s*/g, '');
            setpostdata(value);
            if (value) {
              changepostdata({ name: value });
              let newarr = new Set([...searchistory, value]);
              localStorage.setItem('SH', JSON.stringify([...newarr]));
              changehis([...newarr]);
            } else {
              //Toast.info('请输入文字搜索....');
              changepostdata({ name: '' });
            }
          }}
        />
      </div>
      <div style={{ height: 54 }}></div>
      <CSSTransition
        in={searchistory.length > 0 && !postData.name}
        timeout={300}
        classNames="scale"
        unmountOnExit
      >
        <Collapse
          bordered={false}
          activeKey={['1']}
          expandIcon={({ isActive }) => (
            <HistoryOutlined style={{ fontSize: 16, color: '#000' }} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header={<span style={{ fontSize: 16 }}>历史记录</span>}
            key="1"
            extra={
              <DeleteOutlined
                onClick={() => {
                  localStorage.removeItem('SH');
                  changehis([]);
                }}
                style={{ fontSize: 16, color: '#999', marginTop: 6 }}
              />
            }
          >
            <Row gutter={6}>
              {searchistory.map((it, i) => (
                <Col
                  key={i}
                  span={6}
                  onClick={() => {
                    changepostdata({ name: it });
                    setpostdata(it);
                  }}
                >
                  <a
                    style={{ width: '100%', textAlign: 'center' }}
                    className="tag"
                  >
                    {it}
                  </a>
                </Col>
              ))}
            </Row>
          </Panel>
        </Collapse>
      </CSSTransition>
      <CSSTransition
        in={!postData.name}
        timeout={0}
        classNames="alert"
        unmountOnExit
      >
        <Collapse
          bordered={false}
          activeKey={['1']}
          expandIcon={({ isActive }) => (
            <IconFont
              type="icon-hot"
              style={{ fontSize: 16, color: '#f76b1c' }}
            />
          )}
          className="nobordercollapse"
        >
          <Panel
            header={<span style={{ fontSize: 16 }}>热门标签</span>}
            key="1"
            // extra={<a onClick={() => {
            //   changepostdata({ name:''});
            //   setpostdata('');
            // }}>全部</a>}
          >
            <Row gutter={6}>
              {keyword.map((it, i) => (
                <Col
                  key={i}
                  span={6}
                  onClick={() => {
                    changepostdata({ name: it.name });
                    setpostdata(it.name);
                  }}
                >
                  <a
                    style={{ width: '100%', textAlign: 'center' }}
                    className="tag"
                  >
                    {it.name}
                  </a>
                </Col>
              ))}
            </Row>
          </Panel>
        </Collapse>
      </CSSTransition>
    </div>
  );
};

let Header = connect(({ global, loading }) => ({
  global,
  loading,
}))(Search);

export default (props) => {
  return <ResultList Header={Header}></ResultList>;
};
