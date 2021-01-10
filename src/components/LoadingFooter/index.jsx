
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
  } from '@ant-design/icons';

export default ({isLoading}) => (<div style={{ padding: "4px 0 0 0", textAlign: 'center' }}>
{isLoading ? 
<div className='center'>
  <LoadingOutlined style={{marginRight:12}}></LoadingOutlined> 拼命加载中...
</div> : 
'加载完成'}
</div>)