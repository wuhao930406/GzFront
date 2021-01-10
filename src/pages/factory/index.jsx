import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse, Button, Tag } from 'antd';
import { Carousel, Tabs, WhiteSpace, Modal } from 'antd-mobile';
import { connect, history } from 'umi';
import styles from './index.less';
import {
  QrcodeOutlined,
  DownSquareOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ResultList from '@/components/ResultList';
import scrollAnimation from '@/utils/scrollAnimation'
import IconFont from '@/components/IconFont'


const { Panel } = Collapse;

let Header = ({ scrolltop, scrollRef, global: { keyword, classify } }) => {
  const [data, setdata] = useState([
    'AiyWuByWklrrUDlFignR',
    'TekJlZRVCjLFexlOCuWn',
    'IJOtIlfsYdTyaDTRVrLI',
  ]),
    [curtags, setcurtag] = useState({}),
    [iftype, ciftype] = useState({
      title: "",
      visible: false,
      curlist: []
    })


  return (
    <div>
      <Modal
        visible={iftype.visible}
        width="95%"
        transparent
        maskClosable={true}
        onClose={() => {
          ciftype({
            ...iftype,
            visible: false
          })
        }}
        title={iftype.title}
        footer={false}
        style={{ width: '95%', borderRadius: 12, overflow: "hidden", }}
      >
        <div>
          {
            iftype.curlist.map((it, i) => <a className="oneline" style={{ textAlign: "center" }} key={i} className="tag">
              {it.name}
            </a>)
          }
        </div>
      </Modal>
      <Row
        className={styles.header}
        style={{ backgroundColor: `rgba(16,142,233,${scrolltop / 200})` }}
      >
        <Col flex="auto">
          <Button
            size="large"
            icon={<SearchOutlined />}
            className={styles.placebtn}
            onClick={() => {
              history.push("/search")
            }}
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
            <IconFont
              type='icon-hot'
              style={{ fontSize: 16, color: '#f50' }}
            />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header={<span style={{ fontSize: 16 }}>热门标签</span>}
            key="1"
            extra={<a style={{ color: '#f50', display: keyword.length < 5 ? "none" : "block" }} onClick={() => {
              ciftype({
                ...iftype,
                title: "热门标签",
                visible: true,
                curlist: keyword,
                type:"keyword"
              })
            }}>更多+</a>}
          >
            <div style={{ display: "flex" }}>
              {keyword.filter((it, i) => i < 4).map((it, i) => (
                <a className="oneline" style={{ width: "25%", textAlign: "center" }} key={i} className="tag">
                  {it.name}
                </a>
              ))}
            </div>
          </Panel>
        </Collapse>

        <div
          style={{
            position: scrolltop > 245 ? 'fixed' : 'initial',
            top: 64,
            width: '100%',
            maxWidth: 1000,
            zIndex: 999,
            transition: "all 0.4s"
          }}
        >
          <Tabs
            tabs={
              [
                { title: '所有企业', key: "-1" },
                ...classify.map(it => ({
                  ...it,
                  title: it.name,
                  key: it.id,
                }))
              ]
            }
            onTabClick={(tab) => {
              setcurtag(tab);
              scrollRef && scrollAnimation(scrolltop, 245, scrollRef)
            }}
          />

          {curtags.min_classifies && (
            <Row style={{ padding: 8, backgroundColor: '#f9f9f9' }}>
              <Col flex="auto" className="center" style={{ justifyContent: "flex-start" }}>
                {curtags.min_classifies
                  .filter((it, i) => i < 4)
                  .map((it, i) => (
                    <a
                      key={i}
                      className="tag"
                      style={{ width: "25%", textAlign: 'center', marginBottom: 0 }}
                    >
                      {it.name}
                    </a>
                  ))}
              </Col>
              {
                curtags.min_classifies.length > 4 && <Col flex="60px" className="center" onClick={()=>{
                  ciftype({
                    ...iftype,
                    visible:true,
                    title:curtags.title,
                    curlist:curtags.min_classifies,
                    type:"classify"
                  })
                }}>
                  <a>更多+</a>
                </Col>
              }

            </Row>
          )}
        </div>
      </section>
    </div>
  );
};

Header = connect(({ global, loading }) => ({
  global,
  loading,
}))(Header)


export default (props) => {
  return <ResultList Header={Header}></ResultList>;
};
