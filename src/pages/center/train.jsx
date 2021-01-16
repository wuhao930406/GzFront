import { SearchBar, Toast, WhiteSpace, Calendar } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Col, Empty, List } from 'antd';
import { connect, history, useRequest } from 'umi';
import {
  LeftOutlined,
  SwapRightOutlined,
  CalendarOutlined,
  CaretRightOutlined,
  CaretLeftOutlined
} from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';
import { trains } from '@/services/factory';
import Hearder from '@/utils/setHeader';

const now = new Date();

let Train = (props) => {
  let {
    global: { train },
    dispatch,
  } = props;

  let [data, cdata] = useState([]), [show, cshow] = useState(false);//日历

  useEffect(() => {
    trains({ is_all: 1, ...train }).then(res => {
      console.log(res)
      cdata(res.data.dataList)
    })

  }, [train])

  return (
    <div className={styles.search}>
      <Calendar
        type="one"
        visible={show}
        onCancel={() => {
          cshow(false);
        }}
        defaultValue={[new Date(train.start_date)]}
        onConfirm={(start, end) => {
          dispatch({
            type: 'global/train',
            payload: {
              start_date: moment(start).startOf("day").format('YYYY-MM-DD HH:mm:ss'),
              end_date: moment(start).endOf("day").format('YYYY-MM-DD HH:mm:ss')
            },
          })
          cshow(false);
        }}
        minDate={new Date(+now - 0)}
        maxDate={new Date(+now + 31536000000)}
        renderHeader={() => Hearder("选择出发日期", (key) => { cshow(key) })}
      />


      <div
        style={{
          backgroundColor: '#fff',
          position: 'fixed',
          zIndex: 99,
          width: '100%',
          display: "flex",
          flexDirection: "column",
          justifyContent: 'space-between',
        }}
      >
        <div className="center"
          style={{
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <div
            className="center"
            style={{ width: 36, height: 54, justifyContent: 'center' }}
            onClick={() => {
              history.go(-1);
            }}
          >
            <LeftOutlined style={{ fontSize: 24, color: '#000' }}></LeftOutlined>
          </div>
          <span style={{ fontSize: 18, color: '#000' }}>车次列表</span>
          <div
            className="center"
            style={{
              width: 36,
              height: 54,
              justifyContent: 'flex-start',
            }}
            onClick={() => {
              cshow(true)
            }}
          >
            <CalendarOutlined style={{ fontSize: 22, color: '#108ee9' }}></CalendarOutlined>
          </div>


        </div>

        <div className="justfy" style={{ padding: 12 }}>
          <a className='center' disabled={moment().format("YYYY-MM-DD") == moment(train.start_date).format("YYYY-MM-DD")} onClick={() => {
            dispatch({
              type: 'global/train',
              payload: {
                end_date: moment(train.start_date).add("day", -1).endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                start_date: moment(train.start_date).add("day", -1).startOf("day").format('YYYY-MM-DD HH:mm:ss'),
              },
            })
          }}>
            <CaretLeftOutlined />
            前一天
          </a>
          <span className='center'>
            {
              moment(train.start_date).format("YYYY-MM-DD")
            }
          </span>
          <a className='center' onClick={() => {
            dispatch({
              type: 'global/train',
              payload: {
                end_date: moment(train.start_date).add("day", 1).endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                start_date: moment(train.start_date).add("day", 1).startOf("day").format('YYYY-MM-DD HH:mm:ss'),
              },
            })
          }}>
            后一天
            <CaretRightOutlined />
          </a>





        </div>
      </div>
      <div style={{ height: 102 }}></div>
      {
        data.length == 0 ? <Empty description="没有匹配的数据" style={{ paddingTop: 60 }}></Empty> :
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item
                style={{ padding: 12, backgroundColor: "white" }}
                onClick={() => {
                  if (item.max_people == item.enroll_people) {
                    Toast.fail("该车次已满", 2, null, false);
                    return
                  }
                  history.push({
                    pathname: "/trainport",
                    query: item
                  })


                }}
              >
                <List.Item.Meta
                  title={
                    <a style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      backgroundColor: "rgb(90, 214, 228)",
                      width: "100%", padding: 12
                    }}>
                      <span className='oneline' style={{ fontSize: 16, display: "block", color: "#fff" }}>{item.name}</span>
                      <span style={{ fontSize: 16, display: "block", width: 88, textAlign: "right", color: "#fff" }} >剩余 {item.max_people - item.enroll_people}座</span>
                    </a>
                  }
                  description={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: 12 }}>
                      <a style={{ color: "#000" }}>
                        <span >{item.start_station}</span>
                        <SwapRightOutlined></SwapRightOutlined>
                        <span >{item.end_station}</span>
                      </a>
                      <div style={{ textAlign: "right", color: "#666", fontSize: 14 }}>
                        发车时间：{moment(item.start_time).format("YYYY-MM-DD HH:mm")}
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          >
          </List>

      }

    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Train);
