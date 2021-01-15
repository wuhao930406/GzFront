import { List, Tabs, Badge, Calendar } from 'antd-mobile';
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
import { Input, Button } from 'antd';
import moment, { months } from 'moment';
import { connect, useRequest, Link } from 'umi';
import { train_record } from '@/services/factory';

const now = new Date();
const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
  { title: <Badge dot>报名信息</Badge> },
  { title: <Badge>两城宜家</Badge> },
];

export default ({ scrolltop }) => {
  const [shown, setshown] = useState(false),
    [show, cshow] = useState(false),
    [search, setsearch] = useState({
      start: null,
      end: null,
      time: null,
    });
  let tr = useRequest(() => train_record({ is_all: 1 }));

  let Hearder = () => {
    return (
      <div className="rowheader">
        <CloseOutlined style={{ opacity: 0, fontSize: 16 }}></CloseOutlined>
        <span style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
          选择出发日期
        </span>
        <CloseOutlined
          style={{ color: 'red', fontSize: 16 }}
          onClick={() => {
            cshow(false);
          }}
        ></CloseOutlined>
      </div>
    );
  };

  console.log(tr);
  return (
    <div>
      <Calendar
        type="one"
        visible={show}
        onCancel={() => {
          cshow(false);
        }}
        onConfirm={(start, end) => {
          console.log(
            moment(start).format('YYYY-MM-DD HH:mm:ss'),
            moment(end).format('YYYY-MM-DD HH:mm:ss'),
          );
          setsearch({
            ...search,
            time: moment(end).format('YYYY-MM-DD HH:mm:ss'),
          });
          cshow(false);
        }}
        minDate={new Date(+now - 0)}
        maxDate={new Date(+now + 31536000000)}
        renderHeader={Hearder}
      />
      <Tabs
        tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab);
        }}
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
        <div
          style={{
            backgroundColor: '#fff',
            paddingTop: scrolltop > 130 ? 44 : 0,
            paddingBottom: 12,
          }}
        >
          <List className="my-list" style={{ paddingRight: 15, width: '100%' }}>
            <Item extra={'dnf客服'}>岗位</Item>
            <Item extra={'南通鞋厂'}>工厂名称</Item>
            <Item extra={'江苏省南通市'}>工厂地址</Item>
            <Item extra={'13218918820'}>工厂联系方式</Item>
            <Item
              extra={
                <span style={{ color: 'rgb(247, 107, 28)' }}>
                  <b style={{ fontSize: 18 }}>20.0 - 30.0 </b>元
                </span>
              }
            >
              月薪
            </Item>
            <Item
              extra={
                <span style={{ color: 'rgb(247, 107, 28)' }}>
                  <b style={{ fontSize: 18 }}>1 </b>元
                </span>
              }
            >
              时薪
            </Item>
            <Item extra={'免费午餐'}>补贴</Item>
            <Item multipleLine extra={'技术企业 / 操作工'}>
              分类
            </Item>
            <Item extra={'高时薪'}>关键词</Item>
            <Item multipleLine wrap>
              <span className="title">福利</span>
              <Brief>
                毒孩做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五
              </Brief>
            </Item>
            <Item multipleLine>
              <span className="title">招聘条件</span>
              <Brief>熟练缝纫工</Brief>
            </Item>
            <Item multipleLine>
              <span className="title">岗位介绍</span>
              <Brief>做二休五</Brief>
            </Item>
            <Item multipleLine extra={<a>1小时前</a>}>
              报名时间
            </Item>
            <Item multipleLine extra={<a>已报名</a>}>
              报名状态
            </Item>
          </List>
          <Link
            to="/enroll"
            style={{
              padding: 12,
              backgroundColor: '#108ee9',
              fontSize: 16,
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '12px',
            }}
          >
            <div className="center">
              <EyeFilled style={{ marginRight: 4 }}></EyeFilled>
              报名记录
            </div>

            <RightOutlined />
          </Link>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '12px 0px' }}>
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
                    alert(0);
                  }}
                >
                  {search.start ? search.start : '出发地'}
                </a>
                <SwapRightOutlined style={{ margin: '0 4px' }} />
                <a
                  className="diybtn"
                  style={{ flex: 1 }}
                  onClick={() => {
                    alert(0);
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
              >
                查询
              </Button>
            </div>
          </CSSTransition>

          <div style={{ margin: 12 }}>
            <div
              style={{
                padding: 12,
                backgroundColor: '#5ad6e4',
                fontSize: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff',
              }}
            >
              我的车票
              <span>
                {'江苏南通'} <SwapRightOutlined /> {'山西洪洞'}
              </span>
            </div>
            <div
              style={{
                paddingRight: 15,
                backgroundColor: '#fff',
                fontSize: 16,
                paddingTop: 12,
              }}
            >
              <Item extra={'2021-01-28 15:11:00'}>出发时间</Item>
              <Item extra={'江苏省南通市汽车东站'}>上车地点</Item>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
