import React from 'react';
import { Button, Modal } from 'antd-mobile';
import { List, Avatar, Spin } from 'antd';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Details from './details';
import { connect, useRequest } from 'umi';
import Auth from '@/components/Auth';
import { code } from '@/services/factory';



let Center = (props) => {
  let [visible, cv] = useState(false),
    {
      global: { userinfo },
    } = props;

  let { data, loading } = useRequest(() => code())


  return (
    <div>
      <Modal
        visible={visible}
        transparent
        maskClosable={true}
        onClose={() => cv(false)}
        title={<a style={{color:"#333",textShadow:"0 2px 2px #999"}}>我的推广码</a>}
        footer={false}
        style={{ width:"70%"}}
      >
        <Spin spinning={loading}>
          <img
            style={{ width: '100%' }}
            src={data}
            alt=""
          />
          <p>长按保存或发送给朋友</p>
        </Spin>

      </Modal>

      <Auth>
        <List.Item
          className="totitle"
          style={{ padding: 24 }}
          onClick={() => {


            cv(true);
          }}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ width: '16vw', height: '16vw' }}
                src={
                  userinfo.head_image
                    ? userinfo.head_image
                    : require('@/assets/user.png')
                }
              />
            }
            title={
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
            }
            description={
              <span style={{ display: 'block', margin: '6px 0', color: '#fff' }}>
                {userinfo.city ? userinfo.city : '中国'}
              </span>
            }
          />
          <div style={{ color: '#fff' }}>
            {!userinfo.is_member ? '未注册' : <QrcodeOutlined style={{ fontSize: 20 }} />}
          </div>
        </List.Item>


      </Auth>
      <div>
        <Details {...props}></Details>
      </div>
    </div>
  );
};
export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Center);
