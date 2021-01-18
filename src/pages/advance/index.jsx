import React, { useMemo } from 'react';
import { Button, Modal } from 'antd-mobile';
import { List, Avatar, Spin, Row, Col } from 'antd';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { connect, useRequest } from 'umi';
import Auth from '@/components/Auth';
import { code, promo } from '@/services/factory';
import IconFont from '@/components/IconFont';

function getname(type) {
  if (type) {
    if (type == 'agent') {
      return '经纪人';
    } else if (type == 'promoter') {
      return '推广员';
    } else if (type == 'user') {
      return '普通用户';
    }
  } else {
    return '游客';
  }
}

let Advance = (props) => {
  let [visible, cv] = useState(false),
    [type, ctype] = useState(1),
    {
      global: { userinfo },
    } = props;

  let { data, loading } = useRequest(() => code()),
    promodata = useRequest(() => promo());

  let promolist = useMemo(() => {
    if (promodata) {
      return promodata.data;
    } else {
      return [];
    }
  }, [promodata]);

  return (
    <div>
      <Modal
        visible={visible}
        transparent
        maskClosable={true}
        onClose={() => cv(false)}
        title={
          <a style={{ color: '#333', textShadow: '0 2px 2px #999' }}>
            我的推广码
          </a>
        }
        footer={false}
        style={{ width: '70%' }}
      >
        <Spin spinning={loading}>
          <img style={{ width: '100%' }} src={data} alt="" />
          <p>长按保存或发送给朋友</p>
        </Spin>
      </Modal>

      <Auth>
        <div
          className="totitle"
          style={{
            padding: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
          }}
          onClick={() => {
            cv(true);
          }}
        >
          <Avatar
            style={{ width: '16vw', height: '16vw', marginBottom: 12 }}
            src={
              userinfo.head_image
                ? userinfo.head_image
                : require('@/assets/user.png')
            }
          />
          <div className="center" style={{ alignItems: 'flex-end' }}>
            <a
              style={{
                fontSize: 22,
                display: 'block',
                margin: '0px 0',
                color: '#fff',
              }}
            >
              {userinfo.name ? userinfo.name : '三保打工网'}
            </a>
            <span
              style={{ display: 'block', margin: '0 0 0 12px', color: '#fff' }}
            >
              {userinfo.city ? userinfo.city : '中国'}
            </span>
          </div>
          <div
            className="center"
            style={{
              position: 'absolute',
              left: 40,
              top: 0,
              bottom: 0,
              margin: 'auto',
              color: '#fff',
              padding: '2px 8px',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          >
            {getname(userinfo.identity)}
          </div>
          <div
            style={{
              width: 44,
              height: 24,
              position: 'absolute',
              right: 48,
              top: 0,
              bottom: 0,
              margin: 'auto',
              color: '#fff',
            }}
          >
            {!userinfo.is_member ? (
              '未注册'
            ) : (
              <QrcodeOutlined style={{ fontSize: 24 }} />
            )}
          </div>
        </div>

        <Row style={{ backgroundColor: '#fff', margin: '0px 0px 4px 0px' }}>
          <Col
            onClick={() => {
              ctype(1);
            }}
            className="center"
            style={{
              flexDirection: 'column',
              padding: '10px 0',
              borderBottom:
                type == 1 ? '#ff9c9c solid 4px' : 'transparent solid 4px',
              transition: 'all 0.4s',
            }}
            span={8}
          >
            <div className="center" style={{ height: 36 }}>
              <IconFont
                type="icon-pm"
                style={{ fontSize: 28, color: '#ff9c9c' }}
              ></IconFont>
            </div>
            <span style={{ color: '#333' }}>
              我的排名 <b style={{ fontSize: 18, color: '#ff9c9c' }}>5</b>
            </span>
          </Col>
          <Col
            onClick={() => {
              ctype(2);
            }}
            className="center"
            style={{
              flexDirection: 'column',
              padding: '10px 0',
              borderBottom:
                type == 2 ? '#9cceff solid 4px' : 'transparent solid 4px',
              transition: 'all 0.4s',
            }}
            span={8}
          >
            <div className="center" style={{ height: 36 }}>
              <IconFont
                type="icon-users"
                style={{ fontSize: 28, color: '#9cceff' }}
              ></IconFont>
            </div>
            <span style={{ color: '#333' }}>
              发展的用户 <b style={{ fontSize: 18, color: '#9cceff' }}>5</b>
            </span>
          </Col>

          <Col
            className="center"
            style={{
              flexDirection: 'column',
              padding: '10px 0',
              borderBottom:
                type == 3 ? '#bb9cff solid 4px' : 'transparent solid 4px',
            }}
            span={8}
          >
            <div className="center" style={{ height: 36 }}>
              <IconFont
                type="icon-user"
                style={{ fontSize: 28, color: '#bb9cff' }}
              ></IconFont>
            </div>
            <span style={{ color: '#333' }}>
              全部用户 <b style={{ fontSize: 18, color: '#bb9cff' }}>5</b>
            </span>
          </Col>
        </Row>
      </Auth>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={promolist}
          style={{ backgroundColor: '#fff' }}
          renderItem={(item) => (
            <List.Item style={{ padding: '16px 24px' }}>
              <List.Item.Meta
                avatar={<Avatar src={item.head_image} />}
                title={
                  <a style={{ marginTop: 4, display: 'block' }}>{item.name}</a>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Advance);
