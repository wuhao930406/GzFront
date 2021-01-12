import { Carousel, Toast } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Col, Collapse, Tag, Button } from 'antd';
import { connect, history } from 'umi';
import {
  LeftOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import IconFont from '@/components/IconFont';
import { CSSTransition } from 'react-transition-group';
import ResultList from '@/components/ResultList/result';
import styles from './index.less';
import { enroll } from '@/services/factory';

let Detail = (props) => {
  let {
      location: { query },
      dispatch,
    } = props,
    [data, setdata] = useState({});

  useEffect(() => {
    dispatch({
      type: 'global/jobdetail',
      payload: query.id,
    }).then((res) => {
      setdata(res.data);
    });
  }, [query.id]);

  console.log(data);
  const tabs = [
    { title: '薪资福利', key: 't1' },
    { title: '录用条件', key: 't2' },
    { title: '岗位介绍', key: 't3' },
  ];
  return (
    <div className={styles.detail}>
      <Button
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 999999,
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderColor: 'transparent',
        }}
        type="primary"
        shape="circle"
        icon={<LeftOutlined style={{ color: '#000' }} />}
        onClick={() => {
          history.go(-1);
        }}
      />
      <div style={{ position: 'relative' }}>
        {data.factory ? (
          <Carousel
            autoplay={true}
            infinite
            dotStyle={{
              width: 14,
              height: 4,
              borderRadius: 14,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            initialSlideHeight={200}
            dotActiveStyle={{
              width: 14,
              height: 4,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
            dots={data.factory.factory_image.length > 1}
          >
            {data.factory.factory_image.map((it, i) => (
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
                <div style={{ display: 'block', height: 220 }}></div>
              </div>
            ))}
          </Carousel>
        ) : null}
        <div className={styles.zixun}>
          <CustomerServiceOutlined />
          <span>咨询</span>
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <p className={styles.title}>
          {data?.factory?.name}{' '}
          <span style={{ fontSize: 14, color: '#666' }}>{data.name}</span>
        </p>
        <p>
          {data.keywords &&
            data.keywords.map((it) => {
              return <a className="tag">{it.keyword_name}</a>;
            })}
        </p>
        <p>
          补贴
          <span
            style={{
              color: data.subsidy ? '#f76b1c' : '#999',
              paddingLeft: 12,
            }}
          >
            {data.subsidy ? data.subsidy : '无补贴'}
          </span>
        </p>
        <p>
          月薪
          <span style={{ color: '#f76b1c', paddingLeft: 12 }}>
            <b style={{ fontSize: 22 }}>
              {data.min_month_salary + '~' + data.max_month_salary}
            </b>{' '}
            元/月
          </span>
        </p>
        <p>
          时薪
          <span style={{ color: '#f76b1c', paddingLeft: 12 }}>
            <b style={{ fontSize: 22 }}>{data.hour_salary}</b> 元/小时
          </span>
        </p>
        <p>
          分类
          <span style={{ color: '#333', paddingLeft: 12 }}>
            {data.min_classify_name}
          </span>
        </p>
        <p>
          地址
          <span style={{ color: '#333', paddingLeft: 12 }}>
            {data?.factory?.address}
          </span>
        </p>
      </div>
      <div className="slider"></div>
      <div className={styles.sanbao}>
        <p className={styles.title}>薪资福利</p>
        <p className="formart">{data.welfare}</p>
      </div>

      <div className="slider"></div>
      <div className={styles.sanbao}>
        <p className={styles.title}>招聘条件</p>
        <p className="formart">{data.condition}</p>
      </div>

      <div className="slider"></div>
      <div className={styles.sanbao}>
        <p className={styles.title}>岗位介绍</p>
        <p className="formart">{data.job_description}</p>
      </div>

      <div className="slider"></div>
      <div className={styles.sanbao}>
        <p className={styles.title}>公司介绍</p>
        <p className="formart">{data?.factory?.description}</p>
      </div>
      <div className="slider" style={{ height: 'auto', padding: 22 }}>
        <img
          src={require('@/assets/bottom.png')}
          alt=""
          style={{ width: '88%', margin: '0 auto', display: 'block' }}
        />
      </div>

      <div style={{ height: 54, backgroundColor: '#f0f0f0' }}></div>
      <div className={styles.footer}>
        <a className={styles.btn} size="large">
          <PhoneOutlined style={{ marginRight: 6 }} rotate={90} />
          联系客服
        </a>
        <a
          disabled={!data.is_can_enroll}
          className={styles.btn}
          size="large"
          style={{ backgroundColor:data.is_can_enroll? 'rgba(253, 159, 45,1)':"#999" }}
          onClick={() => {
            enroll({ job_id: data.id }).then((res) => {
              if (res.code == 0) {
                Toast.success(
                  '报名成功！可在个人中心查看报名信息',
                  3000,
                  () => {
                    reload();
                  },
                  false,
                );
              }
            });
          }}
        >
          立即报名
        </a>
      </div>
    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Detail);
