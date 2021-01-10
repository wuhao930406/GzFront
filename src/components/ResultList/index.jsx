/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { connect } from 'umi';
import scrollAnimation from '@/utils/scrollAnimation'


const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
    tags: ['维修工', '50-55岁', '时薪高'],
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: "McDonald's invites you",
    des: '不是所有的兼职汪都需要风吹日晒',
    tags: ['维修工', '50-55岁', '时薪高'],
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
    tags: ['维修工', '50-55岁', '时薪高'],
  },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let rowIDs = [];

function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i;
    const sectionName = `Section ${ii}`;
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  rowIDs = [...rowIDs];
}

class ResultList extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      scrolltop: 0,
      refreshing: false,
    };
  }

  componentDidMount() {
    // simulate initial Ajax
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          dataBlobs,
          rowIDs,
        ),
        isLoading: false,
        refreshing: false,
      });
    }, 200);
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource,
        refreshing: false,
        isLoading: false,
      });
    }, 200);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          dataBlobs,
          rowIDs,
        ),
        isLoading: false,
      });
    }, 1000);
  };


  
  componentWillReceiveProps(np) {
    if (this.props.global.istop !== np.global.istop) {
      if (np.global.istop === "0") {
        scrollAnimation(this.state.scrolltop,0,this.lv)
      }
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
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 12px' }}>
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
                background: `url(${obj.img}) no-repeat center`,
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
                {obj.des}
              </div>
              <div>{obj.tags.join(' / ')}</div>
              <div>
                <span
                  style={{ color: '#f50', fontSize: 15, fontWeight: 'bolder' }}
                >
                  5600-7100
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
              <span style={{ color: '#f50', fontSize: 20, marginBottom: -4 }}>
                25.5
              </span>
              <span style={{ marginBottom: 4 }}>元/小时</span>
            </div>
          </div>
        </div>
      );
    };
    let { Header, global: { istop }, dispatch } = this.props,
      {
        scrolltop,
        dataSource,
        isLoading,
        refreshing,
      } = this.state;

    return (
      <ListView
        ref={(el) => (this.lv = el)}
        dataSource={dataSource}
        renderHeader={() => (
          <Header
            scrolltop={scrolltop}
            scrollRef={this.lv}
          />
        )}
        renderFooter={() => (
          <div style={{ padding: 30, textAlign: 'center' }}>
            {isLoading ? 'Loading...' : 'Loaded'}
          </div>
        )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          overflow: 'auto',
        }}
        className={scrolltop > 0 ? 'notrans' : 'trans'}
        pageSize={4}
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
}))(ResultList)
