import React, { useState, useEffect } from 'react';
import Echarts from 'echarts';
import { getRequest } from '@services/api';
import '../../../../../mock/chartsApi';
import styles from './index.less';

interface InitProp {
  loadingCall: any;
}
interface ApiData {
  todayList: number[];
  hourList: string[];
  dateList: string[];
  numList: number[];
  sortList: any[];
}
function Charts(props: InitProp) {
  const [apiData, setApiData] = useState<ApiData>({
    todayList: [],
    hourList: [],
    dateList: [],
    numList: [],
    sortList: [],
  });
  const [sortType, setSortType] = useState<number>(0);

  function sortDateChange(type: number) {
    setSortType(type);
  }
  /**
   * 图表初始化
   */
  async function init() {
    const myChartOne = Echarts.init(document.getElementById('charts_01'));
    const myChartTwo = Echarts.init(document.getElementById('charts_02'));
    // 绘制图表1
    myChartOne.setOption({
      title: {
        text: '今日统计',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        type: 'showTip',
        formatter(params) {
          return `<span>${params.name}:00</span><br/><span>游客数量：${params.value}</span>`;
        },
      },
      grid: {
        left: '0',
        right: '10px',
        bottom: '0',
        containLabel: true,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: apiData.hourList,
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '游客数量',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#ecace8',
            },
          },
          areaStyle: {
            normal: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#eaa7e6',
                },
                {
                  offset: 1,
                  color: '#f9fbfe',
                },
              ]),
            },
          },
          data: apiData.todayList,
        },
      ],
    });
    window.onresize = myChartOne.resize;

    // 绘制图表2
    myChartTwo.setOption({
      title: {
        text: '近七日统计',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      },
      barWidth: 30,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '0',
        right: '10px',
        bottom: '0',
        containLabel: true,
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: apiData.dateList,
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '游客数量',
          type: 'bar',
          itemStyle: {
            normal: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data: apiData.numList,
        },
      ],
    });
    window.onresize = myChartTwo.resize;
  }

  /**
   * 挂载获取数据
   */
  async function fetchData() {
    props.loadingCall({ isLoading: true });
    const newData = await getRequest('/api/get_charts', null);
    const apiDataStr = JSON.stringify(apiData);
    const newDataStr = JSON.stringify(newData['data']);
    if (apiDataStr !== newDataStr) {
      setApiData({ ...newData['data'] });
    }
    props.loadingCall({ isLoading: false });
  }
  useEffect(() => {
    init();
    fetchData();
  }, [apiData]);

  return (
    <section className={styles.chartsWrap}>
      <h3>游客数量统计</h3>
      <div className={styles.chartsCon}>
        <div>
          <div>
            <div id="charts_01" style={{ height: 240 }} />
          </div>

          <div>
            <div id="charts_02" style={{ height: 240 }} />
          </div>
        </div>

        <div>
          <h5>排行榜</h5>
          <div className={styles.btnGroup}>
            <span
              onClick={() => {
                sortDateChange(1);
              }}
              className={sortType === 1 ? styles.btnActive : null}
            >
              本日
            </span>
            <span
              onClick={() => {
                sortDateChange(2);
              }}
              className={sortType === 2 ? styles.btnActive : null}
            >
              本周
            </span>
            <span
              onClick={() => {
                sortDateChange(3);
              }}
              className={sortType === 3 ? styles.btnActive : null}
            >
              本月
            </span>
          </div>

          <p className={styles.titleWrap}>
            <span>排名</span>
            <span>景点名称</span>
            <span>游客数量</span>
          </p>
          {Array.isArray(apiData.sortList) &&
            apiData.sortList.length > 0 &&
            apiData.sortList.map((item, index) => {
              return (
                <p key={item.id}>
                  <span>{index + 1}</span>
                  <span>{item.name}</span>
                  <span>{item.count}</span>
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Charts;
