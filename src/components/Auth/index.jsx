import { Modal } from 'antd-mobile';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { KeepAliveLayout, connect } from 'umi';
import { member_card } from '@/services/factory';

let Auth = ({ children, global: { userinfo }, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={style}
      onClick={() => {
        if (!userinfo?.is_member) {
          Modal.alert('您还不是会员', '是否立即注册会员?', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确定',
              onPress: () => {
                member_card().then((res) => {
                  window.location.href = res.data;
                });
              },
            },
          ]);
        }
      }}
    >
      <a disabled={!userinfo?.is_member}>{children}</a>
    </div>
  );
};

export default connect(({ global, loading }) => ({
  global,
  loading,
}))(Auth);
