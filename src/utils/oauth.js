import axios from 'axios';
const $axios = axios.create({
    transformRequest: [function(data) {
        if (!data) return
        let param = '';
        for (let key in data) {
            param = param + `${key}=${data[key]}&`;
        }
        window.console.log('执行完param', param)
        return param
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformResponse: [function(res) {
        return JSON.parse(res);
    }]
});


export default {
    getAccess_token(query) {
        const { code, ts, signature } = query;
        return new Promise((resove, reject) => {
            $axios({
                method: 'post',
                data: {
                    app_id: 'uNoilxyVl7fO0uMKKqCP',
                    grant_type: 'authorization_code',
                    code,
                    ts,
                    signature
                },
                url: `${window.config[process.env.NODE_ENV].authhost}/access_token`,
            }).then(response => {
                if (response.data.code !== 0) {
                    window.console.log("getAccess_toke:", response.data.message)
                }
                resove(response.data);
            }).catch(err => {
                reject(err)
            });
        })
    },
    getUserInfo() {
        return new Promise((resove, reject) => {
            let token = window.localStorage.getItem('ep_access_token');
            $axios({
                method: 'get',
                data: '',
                url: `${window.config[process.env.NODE_ENV].authhost}/userinfo?access_token=${token}`,
            }).then(response => {
                if (response.data.code !== 0) {
                    window.console.log("request:", response.data.message)
                }
                resove(response.data);
            }).catch(err => {
                reject(err)
            });
        })

    }
}