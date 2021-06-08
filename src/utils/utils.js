import eptimes from './eptimes';
import api from '../const/api';
import keyValues from '../const/keyValue';
import validators from './validators';
// import compress from './compress';
import store from '../store/index';
import $axios from '../../axios.config';
import { MessageBox } from "element-ui"
const redirectUrl = `${window.config[process.env.NODE_ENV].authhost}/member/login?&scope=uims&state=dd&app_id=uNoilxyVl7fO0uMKKqCP&redirect_uri=${encodeURIComponent(window.location.origin + window.location.pathname)}`;
const utils = {
    gateway(method, biz_content) {
        return new Promise((resove, reject) => {
            $axios({
                method: 'post',
                url: `${window.config[process.env.NODE_ENV].host}/gateway`,
                data: {
                    biz_content,
                    method
                }
            }).then(response => {
                if (response.data.code !== 0) {
                    window.console.log("request:", method, response.data.message)
                }
                if (response.data.code == 90000) {
                    //alert('登录已失效，请重新登录')
                    window.localStorage.setItem('ep_access_token', '');
                    window.location.href = redirectUrl;
                }
                if (response.data.code == 90003) {
                    window.localStorage.setItem('ep_access_token', '');
                    store.commit('setLoginInfo', {});
                    MessageBox({
                        center: true,
                        title: '请重新登录',
                        message: response.data.message,
                        callback: () => {
                            window.location.href = redirectUrl;
                        }
                    })
                }
                resove(response.data);
            }).catch(err => {
                reject(err)
            });
        })

    },
    getMapList(modules) {
        if (!(Array.isArray(modules))) return [];
        let list = modules.map((el) => { return utils.keyValues[el] });
        list = list.toString(',');
        return utils.gateway(api.getTagsByType, { page: 1, pagesize: 9999, module_id: list }).then(res => {
            if (res) {
                if (res.code === 0 && res.content && res.content.lists) {
                    if (res.content.lists) {
                        return res.content.lists
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            } else {
                return ''
            }
        })
    },
    _throttle: function(func, wait, options) {
        var timeout, context, args;
        var previous = 0;
        if (!options) options = {};

        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            func.apply(context, args);
            if (!timeout) context = args = null;
        };

        var throttled = function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = null;
        };

        return throttled;
    },
    _debounce: function(func, wait, immediate) {
        var timeout, result;
        var debounced = function() {
            var context = this;
            var args = arguments;

            if (timeout) clearTimeout(timeout);
            if (immediate) {
                // 如果已经执行过，不再执行
                var callNow = !timeout;
                timeout = setTimeout(function() {
                    timeout = null;
                    func.apply(context, args)
                }, wait);
                if (callNow) result = func.apply(context, args);
            } else {
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            }

            return result;
        };

        debounced.cancel = function() {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    },
}

utils.eptimes = eptimes;
utils.api = api;
utils.keyValues = keyValues;
utils.validators = validators;
export default utils;