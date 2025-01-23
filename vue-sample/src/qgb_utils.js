
export const customFormatDate = (dateTimeFormat, timestamp, format, type) => {
    const date = new Date(timestamp);
    // return '111';
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '-');
  };


export function getTooltipOptions(candleShowType, msg, indicatorShowRule) {
    return {
      candle: {
        tooltip: {
          showType: candleShowType,
        //   showRule: candleShowRule,
          custom: data => {
            const { prev, current } = data;
            const prevClose = prev?.close ?? current.open;
            const change = ((current.close - prevClose) / prevClose) * 100;
            const oc = ((current.open - current.close) / Math.min(current.open,current.close)) * 100;
            const hlr = ((current.high - current.low) / current.low) * 100;
            return [
              { title: ''+msg+'  ', value: '{time}' },
              { title: 'o: ', value: '{open}' },
              { title: 'h: ', value: '{high}' },
              { title: 'l: ', value: '{low}' },
              { title: 'c: ', value: '{close}' },
              { title: 'v: ', value: '{volume}' },
              {
                title: "PC: ",
                value: {
                  text: `${change.toFixed(2)}%`,
                  color: change < 0 ? "#EF5350" : "#26A69A",
                },
              },
              {
                title: "OC: ",
                value: {
                  text: `${oc.toFixed(2)}%`,
                  color: oc < 0 ? "#EF5350" : "#26A69A",
                },
              },
              {
                title: "HL: ",
                value: {
                  text: `${hlr.toFixed(2)}%`,
                  color: hlr < 0 ? "#EF5350" : "#26A69A",
                },
              },
              {
                title: "T: ",
                value: {
                  text: `${current.timestamp}`,
                },
              },
  
            ];
          },
  
        },
      },
      indicator: {
        tooltip: {
          showRule: indicatorShowRule,
        },
      },
    };
  }