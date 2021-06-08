const config = {
    development:{
        host: 'http://xing.aparcar.cn:7172',
        authhost: 'http://xing.aparcar.cn:7171',
        fileStore: {
            Bucket: 'face-1257614477',
            Region: 'ap-chengdu',
        }
    },
    production:{
        host: 'http://xing.aparcar.cn:7172',
        authhost: 'http://xing.aparcar.cn:7171',
        fileStore: {
            Bucket: 'face-1257614477',
            Region: 'ap-chengdu',
        }
    },
}
window.config = config;