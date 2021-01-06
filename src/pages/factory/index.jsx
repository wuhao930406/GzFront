import React, { useState, useEffect } from 'react';

import { Row, Col, Collapse, Tag } from 'antd';
import { Carousel, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import { connect } from 'umi';
import styles from './index.less';
import { QrcodeOutlined, DownSquareOutlined } from '@ant-design/icons';
import { StickyContainer, Sticky } from 'react-sticky';

const { Panel } = Collapse;
const tags = ['不查案底', '工时高', '坐班多', '吃住在厂'];

export default ({ scrolltop }) => {
  const [data, setdata] = useState([
    'AiyWuByWklrrUDlFignR',
    'TekJlZRVCjLFexlOCuWn',
    'IJOtIlfsYdTyaDTRVrLI',
  ]);

  return (
    <StickyContainer>
      <Row
        className={styles.header}
        style={{ backgroundColor: `rgba(16,142,233,${scrolltop / 200})` }}
      >
        <Col flex="auto">
          <Button icon="search" className={styles.placebtn}>
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

      <section style={{ height: 6000 }}>
        <Collapse
          bordered={false}
          activeKey={['1']}
          expandIcon={({ isActive }) => (
            <DownSquareOutlined
              style={{ fontSize: 16, color: '#108ee9' }}
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
            {tags.map((it) => (
              <a className="tag">{it}</a>
            ))}
          </Panel>
        </Collapse>

        <Sticky topOffset={200} relative={true}>
          {(props) => <div style={props.style}>test</div>}
        </Sticky>
      </section>
    </StickyContainer>
  );
};
