import React from 'react';
import { Button,Modal } from 'antd-mobile';
import { List, Avatar } from 'antd';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Details from './Details'


export default (props) => {
  let [visible,cv]=useState(false),
      [islogin,changelogin]=useState(false);

  return (
    <div>
      <Modal
        visible={visible}
        transparent
        maskClosable={true}
        onClose={()=>cv(false)}
        title="我的二维码"
        footer={false}
      >
          <img style={{width:"100%"}} src={require("@/assets/qrcode.jpg")} alt=""/>
      </Modal>
      <List.Item className='totitle' style={{  padding: 24 }} onClick={()=>{
        cv(true)
      }}>
        <List.Item.Meta
          avatar={
            <Avatar style={{ width: "20vw", height: "20vw" }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a style={{ fontSize: 22, display: "block", margin: "6px 0",color:"#fff" }}>张三</a>}
          description={<span style={{ display: "block", margin: "6px 0",color:"#fff"  }}>15353698841</span>}
        />
        <div style={{ color: "#fff" }}>{islogin ? "未注册" : <QrcodeOutlined style={{ fontSize: 20 }} />}</div>
      </List.Item>
      <div>
          <Details {...props}></Details>
      </div>    


    </div>
  );
};
