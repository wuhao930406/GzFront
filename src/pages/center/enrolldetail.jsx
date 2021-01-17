import { List, Tabs, Badge, Calendar } from 'antd-mobile';
import {
  LeftOutlined
} from '@ant-design/icons';
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Empty, Button, Skeleton, Carousel, Row, Col } from 'antd';
import moment, { months } from 'moment';
import { connect, useRequest, Link, history } from 'umi';
import { getenrolldetail } from '@/services/factory';
import Auth from '@/components/Auth';
const Item = List.Item;
const Brief = Item.Brief;

export default ({ scrolltop, location: { query } }) => {


  let { data, loading } = useRequest(() => getenrolldetail(query.id));

  let item = useMemo(() => {
    console.log(data)
    return data
  }, [data])


  return (
    <div>
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
        <span style={{ fontSize: 18, color: '#000' }}>报名详情</span>
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

      < Skeleton active loading={loading} paragraph={{ rows: 20 }
      }>

        <div
          style={{
            backgroundColor: '#fff',
            paddingTop: scrolltop > 130 ? 44 : 0,
            paddingBottom: 12,
          }}
        >
          <List className="my-list" style={{ paddingRight: 15, width: '100%' }}>
            <Item extra={item?.job.name}>岗位</Item>
            <Item extra={item?.factory.name}>工厂名称</Item>
            <Item extra={item?.factory.address}>工厂地址</Item>
            <Item extra={<a href={`tel:${item?.factory.contact}`}>{item?.factory.contact}</a>}>工厂联系方式</Item>
            <Item
              extra={
                <span style={{ color: 'rgb(247, 107, 28)' }}>
                  <b style={{ fontSize: 18 }}>{item?.job.min_month_salary + " - " + item?.job.max_month_salary} </b>元
                      </span>
              }
            >
              月薪
              </Item>
            <Item
              extra={
                <span style={{ color: 'rgb(247, 107, 28)' }}>
                  <b style={{ fontSize: 18 }}>{item?.job.hour_salary} </b>元
                      </span>
              }
            >
              时薪
            </Item>
            <Item extra={item?.job.subsidy}>补贴</Item>
            <Item multipleLine extra={<a>{moment(item?.created_at).format("YYYY-MM-DD HH:mm")}</a>}>
              报名时间
            </Item>
            <Item multipleLine extra={<a>{item?.status_name}</a>}>
              报名状态
            </Item>
            <Item multipleLine wrap className="seto">
              <span className="title">福利</span>
              <Brief style={{ whiteSpace: "pre-wrap" }}>
                {item?.job.welfare}
              </Brief>
            </Item>
            <Item multipleLine className="seto">
              <span className="title">招聘条件</span>
              <Brief style={{ whiteSpace: "pre-wrap" }}>
                {item?.job.condition}
              </Brief>
            </Item>
            <Item multipleLine className="seto">
              <span className="title">岗位介绍</span>
              <Brief style={{ whiteSpace: "pre-wrap" }}>
                {item?.job.job_description}
              </Brief>
            </Item>
            <Item multipleLine className="seto">
              <span className="title">办公环境</span>
              <Brief style={{ width: '100%', whiteSpace: "pre-wrap" }}>
                {item?.factory.factory_image.map((it, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 220,
                      background: `url(${it.preview_url}) no-repeat center`,
                      backgroundSize: 'cover',
                    }}
                  >
                  </div>
                ))}


              </Brief>
            </Item>
          </List>
        </div>

      </Skeleton >
    </div>


  )



}