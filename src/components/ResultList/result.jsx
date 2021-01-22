/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { connect, history } from 'umi';
import scrollAnimation from '@/utils/scrollAnimation';
import LoadingFooter from '../LoadingFooter';
import { job } from '@/services/factory';

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      isLoading: true,
      scrolltop: 1,
      refreshing: false,
      draged: false,
      isEmpty: false,
      dataArr: [],
    };
  }

  //获取一段分页数据
  getsectiondata(params) {
    job(params).then((res) => {
      if (!res.data) {
        return;
      }
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
    this.getsectiondata(this.props.global.postData);
  }

  onRefresh = () => {
    let {
      global: { postData },
      dispatch,
    } = this.props;
    this.setState(
      {
        refreshing: true,
        draged: true,
        isLoading: true,
        hasMore: true,
        dataArr: [],
      },
      () => {
        dispatch({
          type: 'global/postData',
          payload: {
            pageIndex: 1,
          },
        }).then((res) => {
          this.getsectiondata(res);
        });
      },
    );
  };

  onEndReached = (event) => {
    let {
      global: { postData },
      dispatch,
    } = this.props;
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    let pageIndex = postData.pageIndex + 1;
    this.setState({ isLoading: true }, () => {
      dispatch({
        type: 'global/postData',
        payload: {
          pageIndex,
        },
      }).then((res) => {
        this.getsectiondata(res);
      });
    });
  };

  componentWillReceiveProps(np) {
    if (this.props.global.istop !== np.global.istop) {
      if (np.global.istop === '0') {
        scrollAnimation(this.state.scrolltop, 0, this.lv);
      }
    }
    let prev = { ...this.props.global.postData },
      next = { ...np.global.postData };
    delete prev.pageIndex;
    delete next.pageIndex;
    if (JSON.stringify(prev) !== JSON.stringify(next)) {
      this.setState(
        {
          isLoading: true,
          hasMore: true,
          dataArr: [],
        },
        () => {
          this.getsectiondata(np.global.postData);
        },
      );
    }
  }

  render() {
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
      let poster = rowData.factory.factory_image.map((it) => it.preview_url);
      return (
        <div
          key={rowData.id}
          style={{ padding: '0 12px' }}
          onClick={() => {
            history.push({
              pathname: '/detail',
              query: {
                id: rowData.id,
              },
            });
          }}
        >
          <div
            style={{
              display: '-webkit-box',
              display: 'flex',
              padding: '12px 0',
            }}
          >
            <div
              style={{
                height: 64,
                width: 64,
                marginRight: '12px',
                background: `url(${poster ? poster[0] : ''}) no-repeat center`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div
              style={{
                lineHeight: 1,
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="oneline" style={{ color: '#000', fontSize: 16 }}>
                {rowData.name}
              </div>
              <div>
                {rowData.keywords.map((it) => it.keyword_name).join(' / ')}
              </div>
              <div>
                <span
                  style={{
                    color: '#f76b1c',
                    fontSize: 15,
                    fontWeight: 'bolder',
                  }}
                >
                  {rowData.min_month_salary + ' - ' + rowData.max_month_salary}
                </span>{' '}
                元/月
              </div>
            </div>
            <div
              style={{
                height: 64,
                width: 64,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span
                style={{ color: '#f76b1c', fontSize: 20, marginBottom: -4 }}
              >
                {rowData.hour_salary}
              </span>
              <span style={{ marginBottom: 4 }}>元/小时</span>
            </div>
          </div>
        </div>
      );
    };
    let {
        Header,
        global: { istop },
        dispatch,
      } = this.props,
      {
        scrolltop,
        dataSource,
        isLoading,
        refreshing,
        draged,
        hasMore,
        isEmpty,
      } = this.state;
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
        className={scrolltop > 0 ? 'notrans' : draged ? 'trans' : 'notrans'}
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
}))(ResultList);
