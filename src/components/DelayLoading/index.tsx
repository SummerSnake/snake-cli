import React from 'react';

const DelayLoading = ({ pastDelay, error }) => {
  if (pastDelay) {
    // 加载时间大于 pastDelay（默认 200ms）,目前设置为 3000ms,则显示 Loading...
    return <div>Loading...</div>;
  } else if (error) {
    // 加载错误时的提示模块
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    // 加载时间短于 pastDelay（默认 200ms）,目前设置为 3000ms,则不显示 Loading...
    return null;
  }
};

export default DelayLoading;
