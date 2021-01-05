import { TabBar } from 'antd-mobile';
import { history } from 'umi'
import React, { useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2310877_a90mj15m9b.js',
});


export default ({ children }) => {
    let [selectedTab, settab] = useState("factory")

    return <div style={{ height: "100%", display: "flex", flexDirection: "column", maxWidth: 1000, margin: "0 auto" }}>
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#108ee9"
            barTintColor="white"
        >
            <TabBar.Item
                title="找工作"
                key="factory"
                icon={<IconFont type="icon-factory" style={{ fontSize: 22 }} />}
                selectedIcon={<IconFont type="icon-factory" style={{ fontSize: 22 }} />}
                selected={selectedTab === 'factory'}
                badge={1}
                onPress={() => {
                    settab("factory");
                    history.push("/factory")
                }}
                data-seed="logId"
            >
                {
                    children
                }
            </TabBar.Item>

            <TabBar.Item
                title="服务中心"
                key="service"
                icon={<IconFont type="icon-service" style={{ fontSize: 22 }} />}
                selectedIcon={<IconFont type="icon-service" style={{ fontSize: 22 }} />}
                selected={selectedTab === 'service'}
                badge={1}
                onPress={() => {
                    settab("service");
                    history.push("/service")
                }}
            >
                {
                    children
                }
            </TabBar.Item>

            <TabBar.Item
                title="个人中心"
                key="center"
                icon={<IconFont type="icon-center" style={{ fontSize: 22 }} />}
                selectedIcon={<IconFont type="icon-center" style={{ fontSize: 22 }} />}
                selected={selectedTab === 'center'}
                badge={1}
                onPress={() => {
                    settab("center");
                    history.push("/center")
                }}
            >
                {
                    children
                }
            </TabBar.Item>

     </TabBar>

    </div>


}