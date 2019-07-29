import React, { useState, useEffect } from 'react';
import Echarts from 'echarts';
import { getRequest } from '@services/api';
import '../../../../../mock/chartsApi';
import styles from './index.less';

interface InitProp {
  loadingCall: any;
}
interface ApiData {
  provinceList: any[];
  pankings: any[];
  repairType: any[];
  pieChart: any[];
}
function Tourist(props: InitProp) {
  const [apiData, setApiData] = useState<ApiData>({
    provinceList: [
      { id: 1, province: '山东', touristType: 1 },
      { id: 2, province: '江苏', touristType: 2 },
      { id: 3, province: '河南', touristType: 3 },
    ],
    pankings: [],
    repairType: ['山东', '江苏', '河南'],
    pieChart: [3, 4, 5],
  });

  async function init() {
    const myChartOne = Echarts.init(document.getElementById('chartDom'));
    // 绘制图表
    myChartOne.setOption({
      color: [
        'rgba(95,196,215,1)',
        'rgba(64,135,222,1)',
        'rgba(111,95,234,1)',
        'rgba(233,86,108,1)',
        'rgba(243,180,74,1)',
        'rgba(98,190,103,1)',
        'rgba(222,125,72,1)',
        'rgba(185,71,147,1)',
      ],
      title: {
        text: '来访游客占比',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        icon: 'diamond',
        itemWidth: 10,
        itemHeight: 10,
        x: '80%',
        y: 'center',
        data: ['山东', '江苏', '河南'],
      },
      series: [
        {
          name: '游客类型',
          type: 'pie',
          radius: '74%',
          center: ['40%', '58%'],
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: apiData.pieChart,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });
    window.onresize = myChartOne.resize;
  }
  useEffect(() => {
    init();
  }, []);
  return (
    <section className={styles.RepairCountWrap}>
      <h3>游客来自省份统计</h3>
      <div>
        <section className={styles.chartDom}>
          <div className={styles.chartTxt}>
            <h4>今日省份统计</h4>
            <div>
              {apiData.provinceList.map(item => (
                <div key={item.id}>
                  <i />
                  <div>
                    <p>{item.province}</p>
                    <p>
                      {item.touristType === 1
                        ? '个人旅行'
                        : item.touristType === 2
                        ? '家庭出游'
                        : '其他'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="chartDom" style={{ height: 300 }} />
        </section>

        <section className={styles.ranking}>
          <h4>城市排名</h4>
          <p>
            <span>排名</span>
            <span>城市</span>
            <span>来访数量</span>
            <span>好评率</span>
            <span>差评率</span>
          </p>
          {apiData.pankings.map((item, index) => {
            return (
              <p key={index.toString()}>
                <span>{index + 1}</span>
                <span>{item.aa}</span>
                <span>
                  {item.aa}&nbsp;&nbsp;&nbsp;({item.aa})
                </span>
                <span>{item.aa}</span>
                <span>{item.aa}</span>
              </p>
            );
          })}
        </section>
      </div>
    </section>
  );
}

export default Tourist;
