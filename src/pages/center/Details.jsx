import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


export default () => {
    return <List renderHeader={() => <h2  style={{padding:8,marginTop:8,fontSize:18}}>我的报名信息:</h2>} className="my-list">
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
}