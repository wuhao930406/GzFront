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
import { connect ,useRequest} from "umi"
import {train_record} from '@/services/factory'


let Center = (props) => {
  let [visible,cv]=useState(false),
      [islogin,changelogin]=useState(false),
      {global:{userinfo}} = props;


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
            <Avatar style={{ width: "16vw", height: "16vw" }} src={userinfo.head_image?userinfo.head_image:require("@/assets/user.png")} />
          }
          title={<a style={{ fontSize: 22, display: "block", margin: "0px 0",color:"#fff" }}>{userinfo.name?userinfo.name:"三保打工网"}</a>}
          description={<span style={{ display: "block", margin: "6px 0",color:"#fff"  }}>{userinfo.city?userinfo.city:"中国"}</span>}
        />
        <div style={{ color: "#fff" }}>{islogin ? "未注册" : <QrcodeOutlined style={{ fontSize: 20 }} />}</div>
      </List.Item>
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
