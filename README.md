# KLineChartSample
[KLineChart](https://github.com/liihuu/KLineChart) sample code. Contains multiple front-end framework versions.

## Run
### Vue
```bash
docker run -it -v /root/:/root/ -v /home/qgb/:/home/qgb/ -v /home/qgb/node/usr_local_16.1/:/usr/local/  -w "/home/qgb/github/KLineChartSample/vue-sample" -p 3000:3000 -p 5173:5173 node:16 bash

cd /home/qgb/github/KLineChartSample/vue-sample && npm install &&./node_modules/.bin/vite --host
```


### React
```bash
cd react-sample && npm install && npm run start
```

### Angular
```bash
cd ng-sample && npm install && npm run start
```

## License
[MIT](./LICENSE)
