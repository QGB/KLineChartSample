<template>
  <Layout title="实时更新">
    <div id="update-k-line" class="k-line-chart"  />
    <div class="k-line-chart-menu-container">
      <button v-on:click="button_update">10update</button>
      <button
          v-for="{ key, text } in types"
          :key="key"
          v-on:click="setYAxisType(key)"
        >
        {{ text }}
      </button>
      <button v-on:click="button_zoom">zoom</button>
      <input type="checkbox" v-model="isChecked" v-on:click="check_boll" checked> boll    
    </div>
    
    <div>
      <input type="range" v-model="value" @input="handleChange" min=0 max=15000 style="width:100%;" ref="input" >
      <input type="range" @input="input_100_change" min=-100 max=100 style="width:100%;" ref="input_100" >
      <p style="display: inline-block;">{{ value }}</p>
      <input style="display: inline-block;width:86%;" v-model="update_url" placeholder="输入更新地址1">
    </div>
    

    
    
  </Layout>
</template>

<script>
import { dispose, init } from "klinecharts";
import generatedDataList from "../generatedDataList";
import Layout from "../Layout.vue";
import * as U from "../qgb_utils.js";


export default {
  name: "ChartUpdate",
  components: { Layout },
  mounted: function () {
    this.chart = init("update-k-line");

    this.chart.setStyles(U.getTooltipOptions('standard', this.candleShowRule, this.indicatorShowRule));

    // 确保 chartStore 使用自定义的时间格式化函数
    const chartStore = this.chart.getChartStore();
    chartStore.getCustomApi().formatDate = U.customFormatDate;



    this.chart.applyNewData(generatedDataList());
    const d_boll = { 
      name: 'BOLL',
      precision: 3,
      calcParams: [21,3]
    }
    this.chart.createIndicator(d_boll, false, { id: "candle_pane" });
    // this.chart.overrideIndicator({ name: 'BOLL', visible: true})

    // this.input_max = parseInt(this.$refs.input.max);
    // console.log(this.input_max);
    // this.value=this.input_max/2
    this.chart.createIndicator("VOL");
    this.chart.setPriceVolumePrecision(6,2)// 价格 成交量 精度位数

    const dataList = this.chart.getDataList();
    this.lastData = dataList[dataList.length - 2];
    this.value=dataList[dataList.length - 1].close;

    const updateData = () => {
      setTimeout(() => {
        updateData(this.chart);
      }, 1000);
    };
    updateData();
  },
  unmounted: function () {
    dispose("update-k-line");
  },

  data() {

    return {
      value: 0, //this.input_max 不能/2 NaN, 在mounted中设置
      types: [
        { key: "normal", text: "线性轴" },
        { key: "percentage", text: "百分比轴" },
        { key: "log", text: "对数轴" },
      ],
      isChecked: true,// 没有这个默认值，前两次选择没有反应
      update_url: `http://${window.location.hostname}:1133/U.r(binanceT);r=binanceT.get_klines('STG',ms=1733128847000)`,
    }
  },
  methods: {
    check_boll(event) {
     console.log([this.isChecked,this.chart])
     //window.boll=this.chart._chartStore.getIndicatorStore()._instances.get("candle_pane").get('BOLL');
     if (this.isChecked) {
          // 复选框被选中
          //console.log("复选框已选中");
          //window.boll.setVisible(false);
          //this.chart.overriderIndicator({ name: 'BOLL', visible: false })
          this.chart.overrideIndicator({ name: 'BOLL', visible: false })
        } else {
          //window.boll.setVisible(true);
          this.chart.overrideIndicator({ name: 'BOLL', visible: true})
        }
    },
    button_zoom(event) {
      window.chart = this.chart;
      this.chart.getChartStore().getTimeScaleStore().zoom(-0.5)
    },
    button_update(event) {
      window.chart = this.chart;
      // const dataList = generatedDataList();
      // fetch('https://5.vfvf.ml/r=binanceT.get_kline()')
      console.log(this.update_url)
      // fetch('https://10.vfvf.ml/r=binanceT.get_kline_1s(N.geta(),return_json=1)%23-'+window.location.search)
      fetch(this.update_url)
        .then(response => response.json())
        .then(dataList => {
          this.chart.applyNewData(dataList);
          this.lastData = dataList[dataList.length - 1];
          console.log(this.lastData); 
        });
    },
    input_100_change(event) {
      this.$refs.input.value=this.lastData.close+parseInt(event.target.value)
      this.$refs.input.dispatchEvent(new Event("input"));
    },
    handleChange(event) {
      console.log(typeof event.target.value);
      const newData = structuredClone(this.lastData);
      //newData.timestamp = this.lastData.timestamp+ 60 * 1000;
      // newData.timestamp =
      //newData.open=this.lastData.close;
      this.n=parseInt(event.target.value)
      // this.n=parseInt(event.target.value)-(this.input_max/2)
      // this.n2=this.n*this.n
      // if(this.n<0)this.n2=this.n2*-1
      // this.n2=lastData.close+
      newData.close=this.n;
      if(newData.close>newData.high)newData.high=newData.close;
      if(newData.close<newData.low)newData.low=newData.close;
      //newData.close=5000
      this.chart.updateData(newData);
    },
    setYAxisType: function (type) {
      this.chart.setStyles({
        yAxis: { type },
      });
    },
  },
};
</script>
