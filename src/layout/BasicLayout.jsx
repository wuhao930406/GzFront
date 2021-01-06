import { TabBar } from 'antd-mobile';
import { history } from 'umi';
import React, { useState, useEffect, useRef } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2310877_p7uwpp11v1.js',
});

export default (props) => {
  let { children, route, location } = props,
    scrollRef = useRef(),
    scrollRefs = useRef(),
    scrollRefc = useRef();

  let [scrolltop, setscroll] = useState(0);

  useEffect(() => {
    scrollRef?.current?.scrollToTop();
    scrollRefs?.current?.scrollToTop();
    scrollRefc?.current?.scrollToTop();
  }, [location]);

  let handleScroll = (e) => {
    setscroll(e.target.scrollTop);
  };

  let rendertopdom = (type) => {
    if (scrolltop > 400) {
      if (type == 'btn') {
        return <IconFont type="icon-top" style={{ fontSize: 22 }} />;
      } else {
        return '返回顶部';
      }
    } else {
      if (type == 'btn') {
        return <IconFont type="icon-factory" style={{ fontSize: 22 }} />;
      } else {
        return '找工作';
      }
    }
  };


  return (
    <div
      style={{
        height: '100%',
        width:"100%",
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1000,
        margin: '0 auto',
        overflow:"hidden"
      }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#108ee9"
        barTintColor="white"
        prerenderingSiblingsNumber={0}
      >
        <TabBar.Item
          title={rendertopdom()}
          key="factory"
          icon={<IconFont type="icon-factory" style={{ fontSize: 22 }} />}
          selectedIcon={rendertopdom('btn')}
          selected={location.pathname === '/factory'}
          badge={1}
          onPress={() => {
            history.push('/factory');
          }}
          data-seed="logId"
          style={{overflow:"hidden"}}
        >
          {/* <Scrollbars
            thumbMinSize={10}
            autoHide
            ref={scrollRef}
            style={{ width: '100%', height: '100%' }}
            hideTracksWhenNotNeeded={true}
            onScroll={handleScroll}
          >
            { React.cloneElement(children, { scrolltop,scrollRef }) }
          </Scrollbars> */}
            {children}

        </TabBar.Item>

        <TabBar.Item
          title="服务中心"
          key="service"
          icon={<IconFont type="icon-service" style={{ fontSize: 22 }} />}
          selectedIcon={
            <IconFont type="icon-service" style={{ fontSize: 22 }} />
          }
          selected={location.pathname === '/service'}
          badge={1}
          onPress={() => {
            history.push('/service');
          }}
        >
          <Scrollbars
            thumbMinSize={10}
            autoHide
            ref={scrollRefs}
            style={{ width: '100%', height: '100%' }}
            hideTracksWhenNotNeeded={true}
          >
            {children}
          </Scrollbars>
        </TabBar.Item>

        <TabBar.Item
          title="个人中心"
          key="center"
          icon={<IconFont type="icon-center" style={{ fontSize: 22 }} />}
          selectedIcon={
            <IconFont type="icon-center" style={{ fontSize: 22 }} />
          }
          selected={location.pathname === '/center'}
          badge={1}
          onPress={() => {
            history.push('/center');
          }}
        >
          <Scrollbars
            thumbMinSize={10}
            autoHide
            ref={scrollRefc}
            style={{ width: '100%', height: '100%' }}
            hideTracksWhenNotNeeded={true}
          >
            {children}
          </Scrollbars>
        </TabBar.Item>
      </TabBar>
    </div>
  );
};
