import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { getRequest } from '@services/api';
import styles from './index.less';

interface InitProps {
  infoId?: string;
}
interface InfoData {
  name: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  hobby?: string;
  [propName: string]: any;
}
function PersonalInfo(props: InitProps) {
  const [infoData, setInfoData] = useState<InfoData>({ name: '*' });
  /**
   * 获取数据
   */
  async function fetchData() {
    const data = await getRequest('/api/get_single_table', null);
    const arr = data['data'];
    if (Array.isArray(arr) && arr.length > 0) {
      arr.forEach(item => {
        if (props.infoId === item.key) {
          setInfoData({ ...infoData, ...item });
        }
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.detailWrap}>
      <div className={styles.topWrap}>
        <div className={styles.titleDom}>
          <span />
          <span>姓名：{infoData.name}</span>
        </div>
        <div className={styles.cardWrap}>
          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="heart" className={styles.iconDom} />
              性别
            </p>
            <p className={styles.cardContent}>{infoData.gender}</p>
          </div>
          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="key" className={styles.iconDom} />
              年龄
            </p>
            <p className={styles.cardContent}>{infoData.age}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="team" className={styles.iconDom} />
              身高
            </p>
            <p className={styles.cardContent}>{infoData.height}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="fire" className={styles.iconDom} />
              体重
            </p>
            <p className={styles.cardContent}>{infoData.weight}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="smile" className={styles.iconDom} />
              爱好
            </p>
            <p className={styles.cardContent}>{infoData.hobby}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <Icon type="slack" className={styles.iconDom} />
              职业
            </p>
            <p className={styles.cardContent}>{infoData.job}</p>
          </div>
        </div>
      </div>

      <div className={styles.midWrap}>
        <div>
          <div className={styles.titleDom}>
            <span />
            <span>工作经历</span>
          </div>
          <div className={styles.conWrap}>
            <div className={styles.itemDom}>
              <p>2000.03 - 2010.03</p>
              <p>市政府</p>
            </div>
            <div className={styles.itemDom}>
              <p>2010.03 - 2015.03</p>
              <p>省政府</p>
            </div>
            <div className={styles.itemDom}>
              <p>2015.03 - 至今</p>
              <p>国务院</p>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.titleDom}>
            <span />
            <span>人物评价</span>
          </div>
          <div className={styles.itemDom}>
            <p style={{ textIndent: '28px' }}>
              毫无保留地把全部精力奉献给了党和人民， 他身上集中体现了中国共产党人的高风亮节。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
