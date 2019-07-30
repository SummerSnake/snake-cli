import React from 'react';
import '../../../../../mock/touristApi';
import styles from './index.less';

function Popularity() {
  return (
    <div className={styles.popularityWrap}>
      <h3>景区热度</h3>
      <div className={styles.conWrap}>
        <div>
          <div>
            <p>金沙滩风景区</p>
            <span>99%</span>
          </div>
          <div>
            <p>银沙滩风景区</p>
            <span>98%</span>
          </div>
        </div>

        <div>
          <div>
            <p>唐岛湾公园</p>
            <span>97%</span>
          </div>
          <div>
            <p>大珠山风景区</p>
            <span>96%</span>
          </div>
        </div>

        <div>
          <div>
            <p>栈桥码头</p>
            <span>100%</span>
          </div>
          <div>
            <p>八大关景区</p>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popularity;
