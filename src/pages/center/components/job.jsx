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
import { train_record, stations } from '@/services/factory';
import Auth from '@/components/Auth';
const Item = List.Item;
const Brief = Item.Brief;

export default ({scrolltop}) => {


    return <div
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

}