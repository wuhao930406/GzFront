import { TabBar } from 'antd-mobile';
import { history } from 'umi';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import IconFont from '@/components/IconFont';
import { Scrollbars } from 'react-custom-scrollbars';
import { KeepAliveLayout, connect } from 'umi';
import getUserinfo from '@/utils/getUserinfo';

let Rendertopdom = ({ type, istop }) => {
  let iftop = useMemo(() => {
    return istop;
  }, [istop]);

  if (iftop) {
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

let BasicLayout = (props) => {
  let {
    children,
    route,
    location,
    dispatch,
    global: { istop },
  } = props,
    scrollRef = useRef(),
    scrollRefs = useRef(),
    scrollRefc = useRef();

  let [scrolltop, setscroll] = useState(0);

  useEffect(() => {
    getUserinfo(props);

    dispatch({
      type: 'global/keyword',
      payload: { is_all: 1 },
    });
    dispatch({
      type: 'global/classify',
      payload: { is_all: 1 },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'global/postData',
      payload: {
        pageIndex: 1,
      },
    });
  }, [location.pathname]);
  //   scrollRef?.current?.scrollToTop();

  // let handleScroll = (e) => {
  //   setscroll(e.target.istop);
  // };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1000,
        margin: '0 auto',
        overflow: "hidden"
      }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#108ee9"
        barTintColor="white"
        prerenderingSiblingsNumber={0}
        hidden={
          ['/factory', '/service', '/center'].indexOf(location.pathname) == -1
        }
      >
        <TabBar.Item
          title={<Rendertopdom istop={istop}></Rendertopdom>}
          key="factory"
          icon={<IconFont type="icon-factory" style={{ fontSize: 22 }} />}
          selectedIcon={<Rendertopdom type="btn" istop={istop}></Rendertopdom>}
          selected={location.pathname === '/factory'}
          onPress={() => {
            if (istop && location.pathname === '/factory') {
              dispatch({
                type: 'global/istop',
                payload: '0',
              });
            }
            history.push('/factory');
          }}
          data-seed="logId"
        >
          <KeepAliveLayout {...props}>
            <Scrollbars
              thumbMinSize={10}
              autoHide
              ref={scrollRef}
              style={{ width: '100%', height: '100%' }}
              hideTracksWhenNotNeeded={true}
            >
              {children}
            </Scrollbars>
          </KeepAliveLayout>
        </TabBar.Item>

        <TabBar.Item
          title="服务中心"
          key="service"
          icon={<IconFont type="icon-service" style={{ fontSize: 22 }} />}
          selectedIcon={
            <IconFont type="icon-service" style={{ fontSize: 22 }} />
          }
          selected={location.pathname === '/service'}
          onPress={() => {
            history.push('/service');
          }}
        >
          <KeepAliveLayout {...props}>{children}</KeepAliveLayout>
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

export default BasicLayout = connect(({ global, loading }) => ({
  global,
  loading,
}))(BasicLayout);
