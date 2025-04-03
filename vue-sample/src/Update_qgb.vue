<template>
  <Layout title="">
    <div :id="'update-k-line-' + interval" class="k-line-chart" />
 
  </Layout>
</template>

<script>
import { dispose, init } from "klinecharts";
import generatedDataList from "./generatedDataList";
import Layout from "./Layout.vue";
import * as U from "./qgb_utils.js";
import { inject } from 'vue';

export default {
  name: "ChartUpdate",
  components: { Layout },
  props: {
    interval: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      update_time:'',
      chart: null,
      lastData: null,
      value: null
    };
  },
  setup() {
    const registerChartUpdate = inject('registerChartUpdate');
    return { registerChartUpdate };
  },
  mounted() {
    this.chart = init('update-k-line-' + this.interval);

    this.chart.setStyles(U.getTooltipOptions('standard', this.interval, this.indicatorShowRule));

    const chartStore = this.chart.getChartStore();
    chartStore.getCustomApi().formatDate = U.customFormatDate;

    this.chart.applyNewData(generatedDataList());
    const d_boll = { 
      name: 'BOLL',
      precision: 3,
      calcParams: [21, 3]
    };
    this.chart.createIndicator(d_boll, false, { id: "candle_pane" });
    this.chart.createIndicator("VOL");
    this.chart.setPriceVolumePrecision(6, 2);

    const dataList = this.chart.getDataList();
    this.lastData = dataList[dataList.length - 2];
    this.value = dataList[dataList.length - 1].close;

    this.registerChartUpdate({ interval: this.interval, update_kline: this.update_kline,
    update_kline_data:this.update_kline_data });
    window.chart=this.chart;

this.chart.subscribeAction('onCrosshairChange', (params) => {
  // console.log('onCrosshairChange',);
  if (window.isKeyTPressed) {
    const newTimestamp = params.kLineData.timestamp;
    let currentHash = window.location.hash.slice(1); // 去除开头的 #

    // 判断是否已存在 ms 参数（逗号分隔）
    const hasMS = /(^|,)ms=\d+/.test(currentHash);
    // console.log(currentHash,hasMS);
    // 处理逻辑
    let newHash;
    if (hasMS) {
      // 替换现有 ms 参数
      newHash = currentHash.replace(/(^|,)ms=\d+/g, `$1ms=${newTimestamp}`);
    } else {
      // 追加新参数（用逗号连接）
      newHash = currentHash ? `${currentHash},ms=${newTimestamp}` : `ms=${newTimestamp}`;
    }

    window.location.hash=newHash;
    // 更新 URL（保留历史记录）
    // window.history.replaceState(null, '', `#${newHash}`);
  }
});



  },
  beforeUnmount() {
    dispose('update-k-line-' + this.interval);
  },
  methods: {
    update_kline(url) {
      // console.log('update_kline debug '+this.interval);
      fetch(url)
        .then(response => response.json())
        .then(dataList => {
          this.chart.applyNewData(dataList);
          this.lastData = dataList[dataList.length - 1];
          const high = Math.max(...dataList.map(k => k.high));
          const low = Math.min(...dataList.map(k => k.low));

          const t = '' + new Date(); // 将日期转换为字符串
          
          this.update_time=t.slice(4,10)+'更新'+t.slice(16, 24)
          this.chart.setStyles(U.getTooltipOptions('standard', this.interval+' '+this.update_time, this.indicatorShowRule));
          console.log(this.lastData);
          window.chart = this.chart;

        });
    },
    update_kline_data(data) {
      data.textContent='update_kline_data'
    }


    

  }
};
</script>