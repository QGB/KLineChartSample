<script setup>
import { onMounted, ref, provide, inject } from 'vue';
import ChartUpdate from "./Update_qgb.vue";

const chartUpdates = ref([]);
const top = ref(null);


const registerChartUpdate = (chartUpdate) => {
  chartUpdates.value.push(chartUpdate);
};

provide('registerChartUpdate', registerChartUpdate);

const update_all = () => {
  chartUpdates.value.forEach(chartUpdate => {
    if (chartUpdate) {
      const interval = chartUpdate.interval;
      const url = `http://${window.location.hostname}:1133/U.r(binanceT);r=binanceT.get_klines(${document.title}`+
      `,interval='${interval}',kline_range=(-21,979),auto_expand_range=True)`;
      chartUpdate.update_kline(url);
      
    }
  });
  // console.log('update_all  debug')
};

const update_args = () => {
  const currentUrl = window.location.href;
  const hashParams = currentUrl.split('#')[1] || ')#'; // 获取 # 号后面的参数，如果没有则显示 'No Hash Params'
  document.title =hashParams; // 更新页面标题
  if (document.title.endsWith('USDT')) {
    document.title = `'${document.title}'`;
  }


};


onMounted(() => {
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'u') {
      update_all();
    }else if (event.key === 'a') {
      update_args();
    }else if (event.key === 'd') {
      document.title=new Date()
      
    if (top.value) {
      const y = chartUpdates.value;
      top.value.textContent = `len ${y.length} ${JSON.stringify(y[0])} ${y[0].update_kline_data} `;
      y[0].update_kline_data(top.value);
    }

    }
  });
});
</script>

<script>
export default {
  name: 'Test',
  components: { ChartUpdate }
}
</script>

<template>
  <div class="home">

<!-- <div style="position: fixed; right: 20%; top: 0; background-color: #f0f0f0; padding: 10px; z-index: 100; text-align: right;" ref="top">悬浮标签</div> -->

<ChartUpdate :interval="'1s'" style="width: 100%;"/>
<ChartUpdate :interval="'1m'" style="width: 100%;"/>
<!-- <ChartUpdate :interval="'3m'" style="width: 100%;"/>
<ChartUpdate :interval="'5m'" style="width: 100%;"/>
<ChartUpdate :interval="'15m'" style="width: 100%;"/>
<ChartUpdate :interval="'30m'" style="width: 100%;"/> -->
<ChartUpdate :interval="'1h'" style="width: 100%;"/>
<!-- <ChartUpdate :interval="'2h'" style="width: 100%;"/>
<ChartUpdate :interval="'4h'" style="width: 100%;"/>
<ChartUpdate :interval="'6h'" style="width: 100%;"/>
<ChartUpdate :interval="'8h'" style="width: 100%;"/>
<ChartUpdate :interval="'12h'" style="width: 100%;"/>
<ChartUpdate :interval="'1d'" style="width: 100%;"/>
<ChartUpdate :interval="'3d'" style="width: 100%;"/>
<ChartUpdate :interval="'1w'" style="width: 100%;"/>
<ChartUpdate :interval="'1M'" style="width: 100%;"/> -->
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f3f5;
}

div,
p {
  box-sizing: border-box;
}

p {
  margin: 0;
}

.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px;
  width:99.7%;
  /* height:99%; */
}
.k-line-chart-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  border-radius: 0px;
  box-shadow: 0 25px 14px rgba(0, 0, 0, 1);
  background-color: #ffffff;
  width: 100%;
  min-height: 686px;
  height: 100%;
  padding: 0px 0px 16px 16px;
}

.k-line-chart {
  display: flex;
  flex: 1;
}

</style>
