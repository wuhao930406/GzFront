import React, { useState, useEffect } from 'react';

import { Row, Col, Collapse, Button, Tag } from 'antd';
import { Carousel, Tabs, WhiteSpace } from 'antd-mobile';
import { connect } from 'umi';
import styles from './index.less';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ResultList from '@/components/ResultList';

const { Panel } = Collapse;
const tags = ['不查案底', '工时高', '坐班多', '吃住在厂'];
const tabs = [
  { title: '所有企业', key: 't1' },
  {
    title: '大龄企业',
    key: 't2',
    tags: ['50-55岁', '55-60岁', '60-65岁', '其它'],
  },
  {
    title: '技术企业',
    key: 't3',
    tags: ['维修工', '操作工', '技术工', '其它'],
  },
  { title: '门店自营', key: 't4', tags: ['超市', '旅馆', '清洁工', '保安'] },
];

let Header = ({ scrolltop, scrollRef, isrefreshed }) => {
  const [data, setdata] = useState([
      'AiyWuByWklrrUDlFignR',
      'TekJlZRVCjLFexlOCuWn',
      'IJOtIlfsYdTyaDTRVrLI',
    ]),
    [curtags, setcurtag] = useState({});
  console.log(isrefreshed);
  return (
    <div>
      <Row
        className={styles.header}
        style={{ backgroundColor: `rgba(16,142,233,${scrolltop / 200})` }}
      >
        <Col flex="auto">
          <Button
            size="large"
            icon={<SearchOutlined />}
            className={styles.placebtn}
          >
            搜索企业名称或关键字
          </Button>
        </Col>
        <Col flex="60px" className="center">
          <QrcodeOutlined style={{ fontSize: 36, color: '#fff' }} />
        </Col>
      </Row>
      <Carousel
        autoplay={true}
        infinite
        dotStyle={{
          width: 14,
          height: 4,
          borderRadius: 14,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        dotActiveStyle={{
          width: 14,
          height: 4,
          borderRadius: 14,
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        {data.map((val) => (
          <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: 200,
              background: `url(https://zos.alipayobjects.com/rmsportal/${val}.png) no-repeat center`,
              backgroundSize: 'cover',
            }}
          ></a>
        ))}
      </Carousel>

      <section style={{ marginBottom: 8 }}>
        <Collapse
          bordered={false}
          activeKey={['1']}
          expandIcon={({ isActive }) => (
            <DownSquareOutlined
              style={{ fontSize: 16, color: '#f50' }}
              rotate={isActive ? 180 : 0}
            />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header={<span style={{ fontSize: 16 }}>热门标签</span>}
            key="1"
            extra={<a>更多+</a>}
          >
            {tags.map((it, i) => (
              <a key={i} className="tag">
                {it}
              </a>
            ))}
          </Panel>
        </Collapse>

        <div
          style={{
            position: scrolltop > 240 ? 'fixed' : 'initial',
            top: 64,
            width: '100%',
            maxWidth: 1000,
            zIndex: 999,
          }}
        >
          <Tabs
            tabs={tabs}
            onTabClick={(tab) => {
              setcurtag(tab);
              scrollRef?.scrollTo(0, 245);
            }}
          />

          {curtags.tags && (
            <Row style={{ padding: 8, backgroundColor: '#f9f9f9' }}>
              <Col flex="auto" className="center">
                {curtags.tags
                  .filter((it, i) => i < 4)
                  .map((it, i) => (
                    <a
                      key={i}
                      className="tag"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      {it}
                    </a>
                  ))}
              </Col>
              <Col flex="60px" className="center">
                <a>更多+</a>
              </Col>
            </Row>
          )}
        </div>
        {scrolltop > 240 ? (
          <div
            style={{
              width: '100%',
              height: curtags.key == 't1' || !curtags.key ? 44 : 88,
            }}
          ></div>
        ) : null}
      </section>
    </div>
  );
};

export default (props) => {
  return <ResultList Header={Header}></ResultList>;
};
