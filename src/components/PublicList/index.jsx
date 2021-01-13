/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { connect, history } from 'umi';
import scrollAnimation from '@/utils/scrollAnimation';
import LoadingFooter from '../LoadingFooter';
import { PhoneOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import IconFont from '@/components/IconFont'


class PublicList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      scrolltop: 0,
      refreshing: false,
      dataArr: [],
      isEmpty: false,
      params: { pageIndex: 1 },
    };
  }

  //获取一段分页数据
  getsectiondata(params) {
    let { post } = this.props;
    post(params).then((res) => {
      let dataArr = this.state.dataArr.concat(res.data.list);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataArr),
        isLoading: false,
        refreshing: false,
        hasMore: res.data.hasnextpage,
        dataArr,
        isEmpty: params.pageIndex == 1 && res.data.list.length == 0,
      });
    });
  }

  componentDidMount() {
    this.getsectiondata(this.state.params);
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
        isLoading: true,
        hasMore: true,
        dataArr: [],
        params: {
          pageIndex: 1,
        },
      },
      () => {
        this.getsectiondata(this.state.params);
      },
    );
  };

  onEndReached = (event) => {
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    let pageIndex = this.state.params.pageIndex + 1;
    this.setState(
      {
        isLoading: true,
        params: {
          pageIndex,
        },
      },
      () => {
        this.getsectiondata(this.state.params);
      },
    );
  };

  render() {
    let {
        Header,
        global: { istop },
        dispatch,
        type,
      } = this.props,
      {
        scrolltop,
        dataSource,
        isLoading,
        refreshing,
        hasMore,
        isEmpty,
      } = this.state;

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
        }}
      />
    );
    const row = (rowData) => {
      //let poster = rowData.factory.factory_image.map((it) => it.preview_url);

      return type == 'customer' ? (
        <a key={rowData.id} className="kefuitem" href={`tel:${rowData.tel}`}>
          <div className="center">
            <Avatar
              size="large"
              style={{
                marginRight: 12,
                backgroundColor: '#fd9093',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              icon={<CustomerServiceOutlined style={{ fontSize: 16 }} />}
            ></Avatar>
            <span style={{ fontSize: 16 }}>{rowData.name}</span>
          </div>
          <span>
            <i style={{ color: '#999' }}>
              <PhoneOutlined style={{ marginRight: 6 }} rotate={90} />
              {rowData.tel}
            </i>
          </span>
        </a>
      ) : (
        <a key={rowData.id} className="kefuitem" href={`tel:${rowData.tel}`}>
          <div className="center">
            <Avatar
              size="large"
              style={{
                marginRight: 12,
                backgroundColor: '#1890ff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              icon={<IconFont type="icon-dian" style={{ fontSize: 16 }} />}
            ></Avatar>
            <span style={{ fontSize: 16 }}>{rowData.name}</span>
          </div>
          <span>
            <i style={{ color: '#999' }}>
              <PhoneOutlined style={{ marginRight: 6 }} rotate={90} />
              {rowData.tel}
            </i>
          </span>
        </a>
      );
    };

    return (
      <ListView
        ref={(el) => (this.lv = el)}
        dataSource={dataSource}
        renderHeader={() => (
          <Header scrolltop={scrolltop} scrollRef={this.lv} />
        )}
        renderFooter={() => (
          <LoadingFooter
            isLoading={isLoading && hasMore}
            isEmpty={isEmpty}
          ></LoadingFooter>
        )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          overflow: 'auto',
        }}
        className={scrolltop > 0 ? 'notrans' : 'trans'}
        pageSize={10}
        onScroll={(e) => {
          this.setState({
            scrolltop: e.target.scrollTop,
          });
          if (e.target.scrollTop > 400) {
            if (istop === true) {
            } else {
              dispatch({
                type: 'global/istop',
                payload: true,
              });
            }
          } else {
            if (istop === false) {
            } else {
              dispatch({
                type: 'global/istop',
                payload: false,
              });
            }
          }
        }}
        scrollRenderAheadDistance={800}
        distanceToRefresh={window.devicePixelRatio * 25}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={
          <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      />
    );
  }
}

export default connect(({ global, loading }) => ({
  global,
  loading,
}))(PublicList);
