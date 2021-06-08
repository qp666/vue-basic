import axios from 'axios';
const $axios = axios.create({
    transformRequest: [function(data) {
        var token = window.localStorage.getItem('ep_access_token') ||'random_token' || '';
        var now_time = parseInt(new Date().getTime() / 1000);
        var app_id = "uNoilxyVl7fO0uMKKqCP";
        var param = `app_id=${app_id}&method=${data.method}&format=json&charset=utf8&timestamp=${now_time}&token=${token}&biz_content=`;
        if (data.biz_content) {
            param = `${param}${encodeURIComponent(JSON.stringify(data.biz_content))}`
        }
        return param
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformResponse: [function(res) {
        return JSON.parse(res);
    }]
});

export default $axios;