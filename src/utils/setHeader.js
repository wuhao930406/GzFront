import {
    CloseOutlined,
} from '@ant-design/icons';


export default function Hearder(title, cshow) {
    return <div className="rowheader">
        <CloseOutlined
            style={{ color: 'red', fontSize: 16 }}
            onClick={() => {
                cshow ? cshow(false) : null;
            }}
        ></CloseOutlined>
        <span style={{ textAlign: 'center', flex: 1, fontSize: 16 }}>
            {title}
        </span>
        <CloseOutlined style={{ opacity: 0, fontSize: 16 }}></CloseOutlined>
    </div>
};