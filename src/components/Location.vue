<template>
    <div class="ui-location">
        <el-input :readonly="!location" :size="size || 'small'" placeholder="" v-model="location" :clearable="clearable" @blur="handleBlur" @clear="clearLocation">
            <el-button slot="append" type="primary" icon="el-icon-location-outline" @click="changeMap"></el-button>
        </el-input>
        <el-dialog title="地址标识" :visible.sync="mapShow" width="60%">
            <el-select class="widthP80" v-model.trim="address" filterable remote :remote-method="autoInput" :loading="loading" @change="handleChange" placeholder="输入关键字搜索">
                <el-option v-for="(item,index) in allAddress" :key="index" :label="item.name" :value="{name:item.district,position:[item.location.lng,item.location.lat]}">
                    <div>{{item.name}}<span style="font-size:12px;color:#ccc">（{{item.district}}）</span></div>
                </el-option>
            </el-select>
            <el-button class="widthX120 ml10" type="primary" @click="showLocation">确定</el-button>
            <div id="webMap" ref="webMap" style="width:100%;height:500px;margin-top:10px;"></div>
        </el-dialog>
    </div>
</template>
<script>
import AMap from 'AMap';
export default {
    name: 'ep-location',
    props: ['value','size','placeholder','clearable'],
    data() {
        return {
            mapShow: false,
            location: '',
            address: '',
            map: '',
            allAddress: [],
            loading: false,
            marker:'',
            timer:''
        }
    },
    watch: {
        address(val) {
            if (!val) {
                return;
            }
            this.autoInput();
        }
    },
    mounted() {
        this.timerTask();
    },
    methods: {
        timerTask(){
            this.timer = setInterval(() => {
                if (this.value) {
                    this.location = this.value;
                    const lnglat = this.value.split(',').map(item => parseFloat(item));
                    this.getAddressByCoord(lnglat);
                }
            },500)
        },
        changeMap() {
            this.mapShow = !this.mapShow;
            if (this.mapShow) {
                this.$nextTick(() => {
                    const container = this.$refs.webMap;
                    this.map = new AMap.Map(container, {
                        resizeEnable: true, //是否监控地图容器尺寸变化
                        zoom: 11, //初始地图级别
                    })
                    if (this.location) {
                        this.marker = new AMap.Marker({
                            position: this.location.split(',').map(item => parseFloat(item))
                        })
                        this.map.add(this.marker);
                        this.map.setFitView();
                    }
                })

            }
        },
        autoInput(query) {
            // const _this = this;
            if (query) {
                this.loading = true;
                this.map.plugin('AMap.Autocomplete', () => {
                    // 实例化Autocomplete
                    let autoOptions = {
                        city: '全国'
                    }
                    let autoComplete = new AMap.Autocomplete(autoOptions);
                    autoComplete.search(query, (status, result) => {
                        this.loading = false;
                        // 搜索成功时，result即是对应的匹配数据
                        if (status === 'complete') {
                            this.allAddress = result.tips;
                            this.$forceUpdate();
                        }
                    })
                })
            } else {
                this.allAddress = [];
            }
        },
        getAddressByCoord(position) {
            const geocoder = new AMap.Geocoder();
            geocoder.getAddress(position, (status, result) => {
                if (status === 'complete' && result.regeocode) {
                    clearInterval(this.timer);
                    this.address = result.regeocode.formattedAddress;
                }
            })
        },
        handleChange(val) {
            const location = val;
            window.console.log("选择位置坐标：",location.position)
            this.location = location.position.join(',');
            if(this.marker){
                this.marker.setMap(null);
            }
            this.marker = new AMap.Marker({
                ...location
            })
            
            this.map.add(this.marker);
            this.map.setFitView();
        },
        showLocation() {
            this.mapShow = false;
            this.$emit('input', this.location);
            this.handleBlur();
        },
        clearLocation(){
            this.address = '';
            this.$emit('input','');
        },
        handleBlur(){
            this.$emit('handleBlur')
        }
    },
}
</script>
<style lang="scss" scoped>
    .ui-location{
        ::v-deep{
            .el-input-group__append{
                background-color: #fff;
            }
            .el-input-group__append{
                height:30px;
            }
            .el-button.is-plain:focus,
            .el-button.is-plain:hover{
                color:#666;
                border:none;
                height:100%;
            }
        }
    }
</style>