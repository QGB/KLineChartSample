<template>
  <Layout title="实时更新">
    <div id="update-k-line" class="k-line-chart" />
    <div>
      <input type="range" v-model="value" @input="handleChange" max=200 style="width:100%;" ref="input" >
      <p>{{ value }}</p>
    </div>
  </Layout>
</template>

<script>
import { dispose, init } from "klinecharts";
import generatedDataList from "../generatedDataList";
import Layout from "../Layout.vue";

export default {
  name: "ChartUpdate",
  components: { Layout },
  mounted: function () {
    this.chart = init("update-k-line");

    this.chart.applyNewData(generatedDataList());
    const d_boll = { 
      name: 'BOLL',
      precision: 3,
      calcParams: [21,3]
    }
    this.chart.createIndicator(d_boll, false, { id: "candle_pane" });

    this.input_max = parseInt(this.$refs.input.max);
    console.log(this.input_max);
    this.value=this.input_max/2

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
    }
  },
  methods: {
    handleChange(event) {
      console.log(typeof event.target.value);
      const dataList = this.chart.getDataList();
      const lastData = dataList[dataList.length - 2];
      const newData = structuredClone(lastData);
      newData.timestamp = lastData.timestamp+ 60 * 1000;
      // newData.timestamp =
      newData.open=lastData.close;
      newData.close=lastData.close-(this.input_max/2)+ parseInt(event.target.value);
      if(newData.close>newData.high)newData.high=newData.close;
      if(newData.close<newData.low)newData.low=newData.close;
      //newData.close=5000
      this.chart.updateData(newData);
    },
  },
};
</script>
