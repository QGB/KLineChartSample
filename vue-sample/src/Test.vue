<script setup>
import { onMounted, ref, provide, inject } from 'vue';
import ChartUpdate from "./Update_qgb.vue";

const chartUpdates = ref([]);
const top = ref(null);
const inputHash = ref('');  // 绑定输入框的响应式变量

const registerChartUpdate = (chartUpdate) => {
  chartUpdates.value.push(chartUpdate);
};

provide('registerChartUpdate', registerChartUpdate);

// 修改update_args以支持参数传入
const update_args = (hashParam) => {
  // 如果无参数则保留原有URL逻辑
  if (hashParam === undefined) {
    const currentUrl = window.location.href;
    hashParam = currentUrl.split('#')[1] || ')#';
  }
  document.title = hashParam;
  if (document.title.endsWith('USDT')) {
    document.title = `'${document.title}'`;
  }
  inputHash.value = document.title; // 同步更新文本框内容
  window.location.hash =document.title;
};
const update_all = () => {
  chartUpdates.value.forEach(chartUpdate => {
    if (chartUpdate) {
      const interval = chartUpdate.interval;
      const url = `http://${window.location.hostname}:1133/U.r(binanceT);r=binanceT.get_klines(${document.title}`+
      `,interval='${interval}',kline_range=(-500,500),auto_expand_range=True)`;
      chartUpdate.update_kline(url);
    }
  });
};

// 按钮点击处理函数
const handleUpdate = () => {
  update_args(inputHash.value); // 传递输入框内容
  update_all();
};

onMounted(() => {
  update_args();

  document.addEventListener('keydown', (event) => {
    if (event.key === 't') {window.isKeyTPressed=true; } //console.log('t-down');
    if (event.key === 'u') {
      update_all();
    } else if (event.key === 'a') {
      update_args(); // 保留原有URL逻辑
    } else if (event.key === 'd') {
      document.title = new Date()
      if (top.value) {
        const y = chartUpdates.value;
        top.value.textContent = `len ${y.length} ${JSON.stringify(y[0])} ${y[0].update_kline_data} `;
        y[0].update_kline_data(top.value);
      }
    }
  });

  document.addEventListener('keyup', (event) => {
  if (event.key === 't') {window.isKeyTPressed=false; }
  });


});
</script>

<template>
  <div class="home">
    <div style="background-color:rgb(93, 172, 86); display: flex; width: 100%;">
      <input 
        type="text" 
        v-model="inputHash" 
        placeholder="输入参数"
        style="flex: 9; width: 90%;"
      >
      <button 
        @click="handleUpdate"
        style="flex: 1; width: 10%; background-color: #4CAF50; color: white;"
      >
        更新
      </button>
    </div>

<ChartUpdate :interval="'1s'" style="width: 100%;"/>
<ChartUpdate :interval="'1m'" style="width: 100%;"/> <!-- test 3 -->
<ChartUpdate :interval="'3m'" style="width: 100%;"/>
<ChartUpdate :interval="'5m'" style="width: 100%;"/>
<ChartUpdate :interval="'15m'" style="width: 100%;"/>
<ChartUpdate :interval="'30m'" style="width: 100%;"/>
<ChartUpdate :interval="'1h'" style="width: 100%;"/>  <!-- test 3 -->
<ChartUpdate :interval="'2h'" style="width: 100%;"/>
<ChartUpdate :interval="'4h'" style="width: 100%;"/>
<ChartUpdate :interval="'6h'" style="width: 100%;"/>
<ChartUpdate :interval="'8h'" style="width: 100%;"/>
<ChartUpdate :interval="'12h'" style="width: 100%;"/>
<ChartUpdate :interval="'1d'" style="width: 100%;"/>
<ChartUpdate :interval="'3d'" style="width: 100%;"/>
<ChartUpdate :interval="'1w'" style="width: 100%;"/>
<ChartUpdate :interval="'1M'" style="width: 100%;"/>

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
