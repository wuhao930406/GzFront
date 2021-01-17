import { SearchBar, Toast, WhiteSpace, InputItem } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Col, Empty, List } from 'antd';
import { connect, history, useRequest } from 'umi';
import {
  LeftOutlined,
  SwapRightOutlined
} from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';


let Train = (props) => {

  let {
    dispatch,
    location: { query },
    loading
  } = props;

  let [post, cpost] = useState({
    phone: "",
    name: "",
  })



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
        <span style={{ fontSize: 18, color: '#000' }}>预定车次</span>
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
      <div style={{ height: 56 }}></div>
      <List.Item
        style={{ padding: 12, backgroundColor: "white", marginBottom: 8 }}
      >
        <List.Item.Meta
          title={
            <a style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderBottom:"#f0f0f0 solid 1px",
              width: "100%", padding: 12
            }}>
              <span className='estitle' style={{ flex:1 }}>{query.name}</span>
              <span style={{  display: "block", width: 88, textAlign: "right",flexShrink:0}} >剩余 {query.max_people - query.enroll_people}座</span>
            </a>
          }
          description={
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 12 }}>
                <a style={{ color: "#000",flex:1}} className="oneline">
                  <span >{query.start_station}</span>
                  <SwapRightOutlined></SwapRightOutlined>
                  <span >{query.end_station}</span>
                </a>
                <div style={{ textAlign: "right", color: "#666", fontSize: 14,width:180,flexShrink:0 }}>
                  发车时间：{moment(query.start_time).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
              <span style={{ width: "100%", padding: "0 12px", textAlign: "right", display: "inline-block" }}>发车地点：{query.start_place}</span>
            </div>
          }
        />
      </List.Item>
      <p style={{ margin: "0 15px 8px 15px" }}>填写个人信息</p>
      <InputItem
        placeholder="请填写真实姓名"
        clear
        moneyKeyboardAlign="left"
        value={post.name}
        onChange={(val) => {
          cpost({
            ...post,
            name: val
          })
        }}
      >姓名</InputItem>

      <InputItem
        type={"phone"}
        placeholder="请填写真实在用的手机号"
        clear
        moneyKeyboardAlign="left"
        value={post.phone}
        onChange={(val) => {
          cpost({
            ...post,
            phone: val
          })
        }}
      >手机号</InputItem>
      <div style={{ margin: "24px 15px" }}>
        <Button loading={loading.effects["global/train_record"]} size='large' type="primary" style={{ width: "100%" }}
          onClick={() => {
            dispatch({
              type: 'global/train_record',
              payload: { train_id:query.id,...post },
            }).then(res=>{
              if(res.code==0){
                Toast.success("预定成功！即将跳转个人中心",2,()=>{
                  history.replace("/center")
                },true)
              }
            })
          }}>立即预定</Button>
      </div>
    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Train);
