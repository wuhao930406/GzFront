import { List, Tabs, Badge } from 'antd-mobile';
import { RightOutlined, SwapRightOutlined } from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
  { title: <Badge dot>报名信息</Badge> },
  { title: <Badge>两城宜家</Badge> },
];

export default ({ scrolltop }) => {
  const [shown, setshown] = useState(false);

  return (
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
          height: '100%',
          backgroundColor: '#fff',
          paddingTop: scrolltop > 130 ? 44 : 0,
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
              padding: 12,
              border: '1px solid rgb(253, 144, 147)',
              borderTop: 'none',
            }}
          ></div>
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
  );
};
