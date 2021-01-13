import { List, Tabs,Badge } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
    { title: <Badge dot>报名信息</Badge> },
    { title: <Badge dot>两城宜家</Badge> },
];

export default ({scrolltop}) => {
    return <Tabs tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        renderTabBar={(props)=>{
            return <div style={{position:scrolltop>130?"fixed":"initial",zIndex:999,maxWidth:"1000px",width:"100%",top:0}}><Tabs.DefaultTabBar {...props} /></div>
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff',paddingTop:scrolltop>130?44:0 }}>
            
            <List className="my-list">
                <Item extra={'dnf客服'}>岗位</Item>
                <Item extra={'南通鞋厂'}>工厂名称</Item>
                <Item extra={'江苏省南通市'}>工厂地址</Item>
                <Item extra={'13218918820'}>工厂联系方式</Item>
                <Item extra={'20.0 - 30.0元'}>月薪</Item>
                <Item extra={'1元'}>时薪</Item>
                <Item extra={'免费午餐'}>补贴</Item>
                <Item multipleLine extra={'技术企业 / 操作工'}>分类</Item>
                <Item extra={'高时薪'}>关键词</Item>
                <Item multipleLine wrap extra={'毒孩做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五做二休五'}>福利</Item>
                <Item extra={'熟练缝纫工'}>招聘条件</Item>
                <Item multipleLine extra={'做二休五'}>岗位介绍</Item>
                <Item multipleLine extra={'1小时前'}>报名时间</Item>
                <Item multipleLine extra={'已报名'}>报名状态</Item>
            </List>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
            Content of second tab
        </div>

    </Tabs>



}