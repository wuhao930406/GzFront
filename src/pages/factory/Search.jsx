import { SearchBar, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Row, Col, Collapse, Tag } from 'antd';
import { connect,history } from 'umi';
import {
    LeftOutlined, HistoryOutlined, DeleteOutlined
} from '@ant-design/icons';
import IconFont from '@/components/IconFont'


const { Panel } = Collapse;



let Search = ({ global: { postData, keyword }, dispatch }) => {
    let searchref = useRef(),
        [searchistory, changehis] = useState(localStorage.getItem("SH") ? JSON.parse(localStorage.getItem("SH")) : [])
    useEffect(() => {
        searchref?.current?.focus();
    }, []);

    console.log(searchistory)

    function changepostdata(value){
        dispatch({
            type: 'global/postData',
            payload: { name: value },
        });
    }


    return <div className="search">
        <div className="center" style={{ backgroundColor: "#fff" }}>
            <div className="center" style={{ width: 30, height: 54, justifyContent: "flex-end" }} onClick={()=>{history.go(-1)}}><LeftOutlined style={{ fontSize: 24, color: "#000" }}></LeftOutlined></div>
            <SearchBar style={{ flex: 1 }} placeholder="搜索企业名称或关键字" ref={searchref} cancelText={<span style={{ color: "#000" }}>搜索</span>} onCancel={(val) => {
                let value = val && val.replace(/\s*/g, "");
                if (value) {
                    changepostdata(value);
                    let newarr = new Set([...searchistory, value]);
                    localStorage.setItem("searchistory", JSON.stringify([...newarr]));
                    changehis([...newarr]);
                } else {
                    Toast.info("请输入文字搜索....")
                    changepostdata("");
                }
            }} />
        </div>
        {
            searchistory.length > 0 && <Collapse
                bordered={false}
                activeKey={['1']}
                expandIcon={({ isActive }) => (
                    <HistoryOutlined
                        style={{ fontSize: 16, color: '#000' }}
                    />
                )}
                className="site-collapse-custom-collapse"
            >
                <Panel
                    header={<span style={{ fontSize: 16 }}>历史记录</span>}
                    key="1"
                    extra={<DeleteOutlined onClick={() => {
                        localStorage.removeItem("searchistory");
                        changehis([]);
                    }} style={{ fontSize: 16, color: "#999",marginTop:6 }} />}
                >
                    <Row gutter={6}>
                        {searchistory.map((it, i) => (
                            <Col key={i} span={6}>
                                <a style={{ width: "100%", textAlign: "center" }} className="tag">
                                    {it}
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Panel>
            </Collapse>
        }

        <Collapse
            bordered={false}
            activeKey={['1']}
            expandIcon={({ isActive }) => (
                <IconFont
                    type='icon-hot'
                    style={{ fontSize: 16, color: '#f50' }}
                />
            )}
            className="nobordercollapse"
        >
            <Panel
                header={<span style={{ fontSize: 16 }}>热门标签</span>}
                key="1"
            >
                <Row gutter={6}>
                    {keyword.map((it, i) => (
                        <Col key={i} span={6}>
                            <a style={{ width: "100%", textAlign: "center" }} className="tag">
                                {it.name}
                            </a>
                        </Col>
                    ))}
                </Row>
            </Panel>
        </Collapse>


    </div>
}


export default connect(({ global, loading }) => ({
    global,
    loading,
}))(Search)