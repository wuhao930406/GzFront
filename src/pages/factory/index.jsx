import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Button, Spin, Skeleton } from 'antd';
import { Carousel, Tabs, WhiteSpace, Modal } from 'antd-mobile';
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

const { Panel } = Collapse;

let Header = ({
  scrolltop,
  scrollRef,
  global: { keyword, classify, params },
  dispatch,
}) => {
  const [curtags, setcurtag] = useState({}),
    [iftype, ciftype] = useState({
      title: '',
      visible: false,
      curlist: [],
      type: '',
    });

  function setpostdata(val) {
    dispatch({
      type: 'global/params',
      payload: val,
    });
  }
  let { data, loading } = useRequest(() => code()),
    banners = useRequest(() => banner());

  return (
    <div>
      <Modal
        visible={iftype.visible}
        width="95%"
        transparent
        maskClosable={true}
        onClose={() => {
          ciftype({
            ...iftype,
            visible: false,
          });
        }}
        title={iftype.title}
        footer={false}
        style={{
          width: iftype.type == 'qrcode' ? '70%' : '95%',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <div>
          {iftype.type == 'qrcode' ? (
            <Spin spinning={loading}>
              <img style={{ width: '100%' }} src={data} alt="" />
              <p>长按保存或发送给朋友</p>
            </Spin>
          ) : (
            iftype.curlist.map((it, i) => (
              <a
                className="oneline"
                style={{
                  textAlign: 'center',
                  color: params.min_classify_id == it.id ? '#108ee9' : '#666',
                }}
                key={i}
                className="tag"
                onClick={() => {
                  ciftype({
                    ...iftype,
                    visible: false,
                  });
                  if (iftype.type == 'keyword') {
                    dispatch({
                      type: 'global/postData',
                      payload: { name: it.name, pageIndex: 1 },
                    }).then(() => {
                      history.push('/search');
                    });
                  } else {
                    if (params.min_classify_id == it.id) {
                      setpostdata({ min_classify_id: '', pageIndex: 1 });
                    } else {
                      setpostdata({ min_classify_id: it.id, pageIndex: 1 });
                      setcurtag((curtags) => {
                        let min_classifies = curtags.min_classifies,
                          res = [
                            ...min_classifies.filter(
                              (item) => item?.id == it.id,
                            ),
                            ...min_classifies.filter(
                              (item) => item?.id !== it.id,
                            ),
                          ];
                        curtags.min_classifies = res;
                        return curtags;
                      });
                    }
                  }
                }}
              >
                {it.name}
              </a>
            ))
          )}
        </div>
      </Modal>
      <Row
        className={[styles.header, 'ifixed']}
        style={{ backgroundColor: `rgba(16,142,233,${scrolltop / 200})` }}
      >
        <Col flex="auto">
          <Button
            size="large"
            icon={<SearchOutlined />}
            className={styles.placebtn}
            onClick={() => {
              history.push('/search');
            }}
          >
            搜索企业名称或关键字
          </Button>
        </Col>
        <Col flex="60px" className="center">
          <Auth>
            <QrcodeOutlined
              style={{ fontSize: 36, color: '#FFF' }}
              onClick={() => {
                ciftype({
                  ...iftype,
                  visible: true,
                  title: (
                    <a style={{ color: '#333', textShadow: '0 2px 2px #999' }}>
                      我的推广码
                    </a>
                  ),
                  type: 'qrcode',
                });
              }}
            />
          </Auth>
        </Col>
      </Row>
      {banners.data ? (
        <Carousel
          autoplay={true}
          infinite
          dotStyle={{
            width: 14,
            height: 4,
            borderRadius: 14,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          dotActiveStyle={{
            width: 14,
            height: 4,
            borderRadius: 14,
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}
          dots={banners.data.length > 1}
        >
          {banners.data.dataList.map((it, i) => (
            <a
              key={i}
              href={it.location_type == 1 ? it.url : null}
              style={{
                display: 'inline-block',
                width: '100%',
                height: 200,
                background: `url(${it.preview_url}) no-repeat center`,
                backgroundSize: 'cover',
              }}
              onClick={() => {
                if (it.query) {
                  history.push({
                    pathname: it.url,
                    query: {
                      id: it.query,
                    },
                  });
                }
              }}
            >
              <span
                style={{ display: 'block', width: '100%', height: 200 }}
              ></span>
            </a>
          ))}
        </Carousel>
      ) : (
        <Skeleton.Image
          style={{ width: '100%' }}
          active={true}
        ></Skeleton.Image>
      )}

      <section style={{ marginBottom: 8 }}>
        <Collapse
          bordered={false}
          activeKey={['1']}
          expandIcon={({ isActive }) => (
            <IconFont
              type="icon-hot"
              style={{ fontSize: 16, color: '#f76b1c' }}
            />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header={<span style={{ fontSize: 16 }}>热门标签</span>}
            key="1"
            extra={
              <a
                style={{
                  color: '#f76b1c',
                  display: keyword.length < 5 ? 'none' : 'block',
                }}
                onClick={() => {
                  ciftype({
                    ...iftype,
                    title: '热门标签',
                    visible: true,
                    curlist: keyword,
                    type: 'keyword',
                  });
                }}
              >
                更多+
              </a>
            }
          >
            <div style={{ display: 'flex' }}>
              {keyword
                .filter((it, i) => i < 4)
                .map((it, i) => (
                  <a
                    className="oneline"
                    style={{
                      width: '25%',
                      textAlign: 'center',
                      color: params.name == it.name ? '#f76b1c' : '#666',
                    }}
                    key={i}
                    className="tag"
                    onClick={() => {
                      //setpostdata({ name: it.name, pageIndex: 1 });
                      dispatch({
                        type: 'global/postData',
                        payload: { name: it.name, pageIndex: 1 },
                      }).then(() => {
                        history.push('/search');
                      });
                    }}
                  >
                    {it.name}
                  </a>
                ))}
            </div>
          </Panel>
        </Collapse>

        <div
          style={{
            position: scrolltop > 245 ? 'fixed' : 'initial',
            top: 64,
            width: '100%',
            maxWidth: 1000,
            zIndex: 999,
            transition: 'all 0.4s',
          }}
        >
          <Tabs
            tabs={[
              { title: '所有企业', key: 0, id: 0 },
              ...classify.map((it) => ({
                ...it,
                title: it.name,
                key: it.id,
              })),
            ]}
            onTabClick={(tab) => {
              setcurtag(tab);
              scrollRef && scrollAnimation(scrolltop, 245, scrollRef);
              setpostdata({
                max_classify_id: tab.id,
                min_classify_id: '',
                pageIndex: 1,
              });
            }}
          />

          {curtags.min_classifies && (
            <Row style={{ padding: 8, backgroundColor: '#f9f9f9' }}>
              <Col
                flex="auto"
                className="center"
                style={{ justifyContent: 'flex-start' }}
              >
                {curtags.min_classifies
                  .filter((it, i) => i < 4)
                  .map((it, i) => (
                    <a
                      key={i}
                      className="tag"
                      style={{
                        width: '25%',
                        textAlign: 'center',
                        marginBottom: 0,
                        color:
                          params.min_classify_id == it.id ? '#108ee9' : '#666',
                      }}
                      onClick={() => {
                        if (params.min_classify_id == it.id) {
                          setpostdata({ min_classify_id: '', pageIndex: 1 });
                        } else {
                          setpostdata({ min_classify_id: it.id, pageIndex: 1 });
                        }
                      }}
                    >
                      {it.name}
                    </a>
                  ))}
              </Col>
              {curtags.min_classifies.length > 4 && (
                <Col
                  flex="60px"
                  className="center"
                  onClick={() => {
                    ciftype({
                      ...iftype,
                      visible: true,
                      title: curtags.title,
                      curlist: curtags.min_classifies,
                      type: 'classify',
                    });
                  }}
                >
                  <a>更多+</a>
                </Col>
              )}
            </Row>
          )}
        </div>
        <div
          style={{
            width: '100%',
            height: scrolltop > 245 ? (!curtags.min_classifies ? 44 : 88) : 0,
          }}
        ></div>
      </section>
    </div>
  );
};

Header = connect(({ global, loading }) => ({
  global,
  loading,
}))(Header);

export default (props) => {
  return <ResultList Header={Header}></ResultList>;
};
