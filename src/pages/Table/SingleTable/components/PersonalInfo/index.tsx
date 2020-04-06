import React, { useState, useEffect } from 'react';

import {
  FireOutlined,
  HeartOutlined,
  KeyOutlined,
  SlackOutlined,
  SmileOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { getRequest } from '@services/api';
import { verArr } from '@utils/util';
import InfoTable from './components/InfoTable';
import styles from './index.less';

interface InitProps {
  readonly infoId: string;
}
interface InfoData {
  name: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  hobby?: string;
  job?: string;
  [propName: string]: any;
}
function PersonalInfo(props: InitProps) {
  const [infoData, setInfoData] = useState<InfoData>({ name: '*' });
  /**
   * @desc 获取数据
   */
  async function fetchData() {
    const data = await getRequest('/api/get_single_table', null);
    const arr = data['data'];
    if (verArr(arr)) {
      arr.forEach((item) => {
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
              <HeartOutlined className={styles.iconDom} />
              性别
            </p>
            <p className={styles.cardContent}>{infoData.gender}</p>
          </div>
          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <KeyOutlined className={styles.iconDom} />
              年龄
            </p>
            <p className={styles.cardContent}>{infoData.age}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <TeamOutlined className={styles.iconDom} />
              身高
            </p>
            <p className={styles.cardContent}>{infoData.height}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <FireOutlined className={styles.iconDom} />
              体重
            </p>
            <p className={styles.cardContent}>{infoData.weight}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <SmileOutlined className={styles.iconDom} />
              爱好
            </p>
            <p className={styles.cardContent}>{infoData.hobby}</p>
          </div>

          <div className={styles.cardDom}>
            <p className={styles.cardTitle}>
              <SlackOutlined className={styles.iconDom} />
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

      <div className={styles.tableWrap}>
        <div className={styles.titleDom}>
          <span />
          <span>个人信息表格</span>
        </div>
        <InfoTable infoData={infoData} />
      </div>
    </div>
  );
}

export default PersonalInfo;
