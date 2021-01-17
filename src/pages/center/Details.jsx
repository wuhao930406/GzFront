import { List, Tabs, Badge, Calendar, PickerView, Modal, Toast } from 'antd-mobile';
import {
  RightOutlined,
  SwapRightOutlined,
  SearchOutlined,
  CalendarOutlined,
  CloseOutlined,
  EyeFilled,
} from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, Button, Empty } from 'antd';
import moment, { months } from 'moment';
import { connect, useRequest, Link, history } from 'umi';
import { getrain_record, stations } from '@/services/factory';
import Auth from '@/components/Auth';
import Job from "./components/job"

const now = new Date();
const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
  { title: <Badge>报名信息</Badge> },
  { title: <Badge>两城宜家</Badge> },
];

export default (props) => {
  const { scrolltop, dispatch, global: { train } } = props;
  const [shown, setshown] = useState(false),
    [show, cshow] = useState(false),//日历
    [visible, setvisible] = useState(false),//选择出发目的地
    [search, setsearch] = useState({
      start: train.start_station ? [train.start_station] : null,
      end: train.end_station ? [train.end_station] : null,
      time: train.start_date ? moment(train.start_date).format("YYYY-MM-DD") : null,
      start_date: train.start_date ? train.start_date : null,
      end_date: train.end_date ? train.end_date : null,
      type: "start"
    });
  let tr = useRequest(() => getrain_record({ is_all: 1 })),
    station = useRequest(() => stations())

  function Hearder(type, title) {
    return type == "Calendar" ? (
      <div className="rowheader">
        <CloseOutlined
          style={{ color: 'red', fontSize: 16 }}
          onClick={() => {
            cshow(false);
          }}
        ></CloseOutlined>
        <span style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
          {title}
        </span>
        <CloseOutlined style={{ opacity: 0, fontSize: 16 }}></CloseOutlined>
      </div>
    ) : (
        <div className="rowheader">
          <span onClick={() => {
            setvisible(false);
          }}>取消</span>
          <span style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
            {title}
          </span>
          <a onClick={() => {
            if (!search.select || search.select == '请选择') {
              Toast.info('请选择出发/目的地...', 2, null, false);
              return
            }
            if (search.type == 'start' && JSON.stringify(search.select) == JSON.stringify(search.end)) {
              Toast.info('出发/目的地不可相同...', 2, null, false);
              return
            }
            if (search.type == 'end' && JSON.stringify(search.select) == JSON.stringify(search.start)) {
              Toast.info('出发/目的地不可相同...', 2, null, false);
              return
            }
            setsearch({
              ...search,
              [search.type]: search.select
            })
            setvisible(false);
          }}>
            确定
          </a>
        </div>
      );
  };


  let options = station.data ? ['请选择', ...new Set([...station.data.end_stations, ...station.data.start_stations])] : ['请选择'];

  useEffect(() => {
    setsearch({
      ...search,
      start: train.start_station ? [train.start_station] : null,
      end: train.end_station ? [train.end_station] : null,
      time: train.start_date ? moment(train.start_date).format("YYYY-MM-DD") : null,
      start_date: train.start_date ? train.start_date : null,
      end_date: train.end_date ? train.end_date : null,
    })
  }, [train])


  return (
    <div>
      <Calendar
        type="one"
        visible={show}
        onCancel={() => {
          cshow(false);
        }}
        defaultValue={[new Date(search.time)]}
        onConfirm={(start, end) => {
          setsearch({
            ...search,
            time: moment(start).format('YYYY-MM-DD'),
            start_date: moment(start).startOf("day").format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(start).endOf("day").format('YYYY-MM-DD HH:mm:ss')
          });
          cshow(false);
        }}
        minDate={new Date(+now - 0)}
        maxDate={new Date(+now + 31536000000)}
        renderHeader={() => Hearder("Calendar", "选择出发日期")}
      />

      <Modal
        popup
        visible={visible}
        onClose={() => setvisible(false)}
        animationType="slide-up"
      >
        {Hearder("select", `选择${search.type == 'start' ? "出发地" : "目的地"}`)}
        <PickerView
          onChange={(val) => {
            setsearch({
              ...search,
              select: val
            })
          }}
          value={search['select']}
          data={options.map(it => ({
            label: it, value: it
          }))}
          cascade={false}
        />
      </Modal>


      <Tabs
        tabs={tabs}
        renderTabBar={(props) => {
          return (
            <div
              style={{
                position: scrolltop > 130 ? 'fixed' : 'initial',
                zIndex: 999,
                maxWidth: '1000px',
                width: '100%',
                top: 0,
              }}
            >
              <Tabs.DefaultTabBar {...props} />
            </div>
          );
        }}
      >
        <Job {...props}></Job>
        <div style={{ backgroundColor: '#f9f9f9', padding: '12px 0px' }}>
          <Auth>
            <div
              style={{
                padding: 12,
                backgroundColor: 'rgb(253, 144, 147)',
                fontSize: 16,
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0 12px',
              }}
              onClick={() => {
                setshown(!shown);
              }}
            >
              申请坐车
            <RightOutlined rotate={shown ? -90 : 90} />
            </div>
          </Auth>

          <CSSTransition
            in={shown}
            timeout={300}
            classNames="alerts"
            unmountOnExit
          >
            <div
              style={{
                margin: '0 12px',
                padding: '0 12px',
                border: '1px solid rgb(253, 144, 147)',
                borderTop: 'none',
              }}
            >
              <div className="rows" style={{ paddingTop: 12 }}>
                <a
                  className="diybtn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setsearch({
                      ...search,
                      type: "start",
                      select: search.start
                    })
                    setvisible(true)
                  }}
                >
                  {search.start ? search.start : '出发地'}
                </a>
                <SwapRightOutlined style={{ margin: '0 4px' }} />
                <a
                  className="diybtn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    setsearch({
                      ...search,
                      type: "end",
                      select: search.end
                    })
                    setvisible(true)
                  }}
                >
                  {search.end ? search.end : '目的地'}
                </a>
              </div>
              <div className="rows" style={{ marginTop: 16, marginBottom: 18 }}>
                <a
                  className="diybtn"
                  onClick={() => {
                    cshow(true);
                  }}
                >
                  <CalendarOutlined style={{ marginRight: 6 }} />
                  {search.time ? search.time : '出发日期'}
                </a>
              </div>
              <Button
                size="large"
                icon={<SearchOutlined />}
                type="ghost"
                style={{
                  color: '#fff',
                  backgroundColor: 'rgb(253, 144, 147)',
                  border: 'none',
                  width: '100%',
                  marginBottom: 12,
                }}
                onClick={() => {
                  console.log(search);
                  let { start, end, end_date, start_date } = search;
                  if (!start || !end || !end_date || !start_date) {
                    Toast.info("请先选择坐车信息...", 2, null, false)
                    return
                  }

                  dispatch({
                    type: 'global/train',
                    payload: {
                      end_station: Array.isArray(end) ? end[0] : end,
                      start_station: Array.isArray(start) ? start[0] : start,
                      end_date,
                      start_date
                    },
                  }).then(res => {
                    history.push("/train")
                  });
                }}
              >
                查询
              </Button>
            </div>
          </CSSTransition>
          <p style={{ margin: "12px 24px" }}>我的车票 :</p>

          {
            tr?.data?.dataList ?
              tr.data.dataList.map((it, i) => {
                return <div key={i} style={{ margin: 12 }}>
                  <div
                    style={{
                      padding: 12,
                      backgroundColor: '#fff',
                      fontSize: 16,
                      borderBottom: "#f0f0f0 solid 1px"
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#333',
                      marginBottom: 8
                    }}>
                      <span className='estitle' style={{flex:1}}>
                        {it.train.name}
                      </span>
                      <span style={{ width:88,textAlign:"right", flexShrink:0,color: it.status_name == "待发车" ? "#108ee9" : "#999" }}>
                        {it.status_name}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span className='oneline' style={{flex:1}}>
                        {it.train.start_station} <SwapRightOutlined /> {it.train.end_station}
                      </span>
                      <span style={{width:77,textAlign:"right", flexShrink:0}}>
                        乘客：{it.name}
                      </span>
                    </div>

                  </div>
                  <div
                    style={{
                      paddingRight: 15,
                      backgroundColor: '#fff',
                      fontSize: 16,
                    }}
                  >
                    <Item extra={moment(it.train.start_time).format("YYYY-MM-DD HH:mm")}>出发时间</Item>
                    <Item extra={it.train.start_place} style={{ marginTop: -10 }}>上车地点</Item>
                  </div>
                </div>
              })
              : <Empty description="暂无记录" style={{ padding: "60px 0" }}></Empty>
          }
        </div>
      </Tabs>
    </div>
  );
};
