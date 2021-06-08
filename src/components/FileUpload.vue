<template>
    <div class="ui-file-upload">
        <div class="ui-file-upload-plus" data-index="0" v-if="showType === 'plus'">
            <div class="ui-file-upload-plus__list">
                <div class="ui-file-upload-plus__list-item" v-for="(item,index) in fileList" :key="index">
                    <a :href="item.url" target="_blank"><img :src="item.url" :alt="item.name" /></a>
                    <div class="trash-icon" @click="removePic(item,index)">
                        <i class="el-icon-delete"></i>
                    </div>
                </div>
            </div>
            <div class="ui-file-upload-plus__btn" :class="{'error':hasError}" v-if="fileList.length < limit && initCompelte">
                <input ref="plus" type="file" :accept="accept" :disabled="plusDisabled" @change="uploadFile" />
                <div class="ui-file-upload-plus__btn-icon">
                    <i class="el-icon-plus"></i>
                </div>
                <div class="ui-file-upload-plus__btn-progress" :style="{'height':percent+'%'}"></div>
            </div>
            <div class="ui-file-upload-plus__tips" v-if="fileList.length < limit">
                <el-popover placement="bottom-start" title="温馨提示" width="200" trigger="hover" :content="tips">
                    <i class="el-icon-info" slot="reference"></i>
                </el-popover>
            </div>
        </div>
        <div class="ui-file-upload-oneline" data-index="1" v-else>
            <div class="ui-file-upload-oneline__top">
                <div class="online-top-left">
                    <el-popover popper-class="online-popover" placement="bottom-start" width="400" trigger="click">
                        <div slot="reference">{{fileList.length +'个文件'}}</div>
                        <div class="file-container">
                            <div class="file-item" v-for="(item,index) in fileList" :key="index">
                                <a :href="item.url" target="_blank" :title="item.name">{{item.name}}</a>
                                <el-button type="text">删除</el-button>
                            </div>
                        </div>
                    </el-popover>
                </div>
                <div class="online-top-right">
                    <el-button type="primary" icon="el-icon-upload" :disabled="!initCompelte">上传</el-button>
                    <div class="oneline-top-right__tips" v-if="fileList.length < limit">
                        <el-popover placement="bottom-start" title="温馨提示" width="200" trigger="hover" :content="tips">
                            <i class="el-icon-info" slot="reference"></i>
                        </el-popover>
                    </div>
                </div>

            </div>
        </div>
        <div class="ui-file-upload__error" v-if="hasError">请上传图片</div>
    </div>
</template>
<script>
import filePath from '../const/filePath';
import COS from 'cos-js-sdk-v5';
import compress from '../utils/compress';
export default {
    name: 'ep-file-upload',
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        },
        tips: {
            type: String,
            default: '单个文件最大只能上传20M。'
        },
        accept: {
            type: String,
            default: 'image/gif,image/jpeg,image/png'
        },
        multiple: {
            type: Boolean,
            default() {
                return false
            }
        },
        limit: {
            type: Number,
            default: 1
        },
        limitSize: {
            type: Number,
            default: 5
        },
        showType: {
            default: 'plus',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['oneline', 'plus'].includes(value)
            }
        },
        uploadPath: {
            default: 'access',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return filePath.pathArr.includes(value)
            }
        },
        hasError: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            plusDisabled: false,
            percent: 0,
            tempTokenInfo: '',
            cos: '',
            fileList: [],
            currentFile: {},
            resourceArr: [],
            initCompelte: false
        }
    },
    watch: {
        value: {
            handler: function (val) {
                if (Array.isArray(val)) {
                    this.initData(val);
                }
            },
            immediate: true
        }
    },
    created() {
        this.getAuthorizationInfo('fileStore').then(res => {
            if (res.code === 0 && res.content) {
                this.tempTokenInfo = res.content;
                this.cosFileInit();
                this.initCompelte = true;
            } else {
                this.$message({
                    type: 'error',
                    message: res.message,
                    showClose: true
                })
            }
        })
    },
    methods: {
        //初始化双向绑定
        initData(val) {
            if (Array.isArray(val) && val.length > 0) {
                val.map((item, index) => {
                    window.console.log(item)
                    this.getFileUrl(item).then(res => {
                        if (res.code === 0 && res.content) {
                            let temObj = {
                                name: res.content.attributes.name,
                                resource_id: item,
                                url: res.content.url
                            }
                            window.console.log("id" + item + ",img" + index, res.content.url);
                            this.$set(this.fileList, index, temObj);
                        } else {
                            if (val.length === 1) {
                                this.fileList = [];
                            } else {
                                this.$set(this.fileList, index, []);
                            }
                        }
                        this.$emit('input', val);
                        this.$emit('change', val);
                    })
                })
            } else {
                this.resourceArr = [];
                this.fileList = [];
            }
        },
        //获取临时凭证
        getAuthorizationInfo(buketKey) {
            let params = {
                bucket: `${window.config[process.env.NODE_ENV][buketKey].Bucket}`,
                region: `${window.config[process.env.NODE_ENV][buketKey].Region}`,
                resource_type: this.uploadPath
            }
            return this.$utils.gateway(this.$utils.api.getTempFileToken, params)
        },
        //文件上传初始化
        cosFileInit() {
            const cos = new COS({
                getAuthorization: (options, callback) => {
                    let credentials = this.tempTokenInfo.token.credentials;
                    let expiredTime = this.tempTokenInfo.token.expiredTime;
                    callback({
                        TmpSecretId: credentials.tmpSecretId,
                        TmpSecretKey: credentials.tmpSecretKey,
                        XCosSecurityToken: credentials.sessionToken,
                        ExpiredTime: expiredTime
                    })
                }
            })
            this.cos = cos;
        },
        checkFileType(file) {
            let typeArr = this.accept.split(',');
            if (typeArr.includes(file.type)) {
                return true;
            } else {
                this.$message({
                    type: 'error',
                    message: '文件格式不正确',
                    showClose: true
                })
                return false;
            }
        },
        checkFileSize(file) {
            if (file.size > this.limitSize * 1024 * 1000) {
                this.$message({
                    type: 'error',
                    message: '文件大小超过限制',
                    showClose: true
                })
                return false;
            } else {
                return true;
            }
        },
        //文件上传
        cosFileUpload({ fileInfo, file, buketKey }, callback) {
            this.currentfileId = '';
            if (file.type.indexOf('image') != -1) {
                compress.resizeImage(file).then((result) => {
                    return typeof result === 'string' ? compress.convertToBlob(result, file.type) : result;
                }).then((blob) => {
                    this.putObject(fileInfo, blob, buketKey, callback)
                });
            } else {
                this.putObject(fileInfo, file, buketKey, callback)
            }
        },
        putObject(fileInfo, blob, buketKey, callback) {
            this.cos.putObject({
                Bucket: `${window.config[process.env.NODE_ENV][buketKey].Bucket}`,
                Region: `${window.config[process.env.NODE_ENV][buketKey].Region}`,
                Key: `${this.tempTokenInfo.path}/${this.tempTokenInfo.name}`,
                Body: blob,
                onProgress: (info) => {
                    window.console.log('info', info)
                    this.setProgress(info)
                }
            }, (err, data) => {
                if (data && data.statusCode === 200) {
                    window.console.log('上传完毕', data)
                    //绑定文件
                    this.fileBind(fileInfo).then((bindres) => {
                        window.console.log('b绑定完毕')
                        callback(bindres.content.resource_id);
                    }).catch((err) => {
                        callback(err);
                    })
                } else {
                    callback(false);
                }
            });
        },
        fileBind(fileInfo) {
            let postData = {
                file_name: `${this.tempTokenInfo.path}/${this.tempTokenInfo.name}`,
                attributes: fileInfo,
                resource_type: this.uploadPath
            }
            return this.$utils.gateway(this.$utils.api.getFileResourceId, postData);
        },
        setProgress(info) {
            this.percent = info.percent * 100;
            window.console.log(this.percent);
        },
        getFileUrl(resource_id) {
            return this.$utils.gateway(this.$utils.api.getFileInfo, { resource_id });
        },
        uploadFile(event) {
            let files = event.target.files;
            if (files.length === 0) {
                return;
            }
            this.currentFile = files[0];
            let { name, lastModified, lastModifiedDate, size, type, webkitRelativePath } = this.currentFile;
            let fileInfo = { name, lastModified, lastModifiedDate, size, type, webkitRelativePath };
            if (this.checkFileType(this.currentFile) && this.checkFileSize(this.currentFile)) {
                this.plusDisabled = true;
                this.cosFileUpload({ fileInfo, file: this.currentFile, buketKey: 'fileStore' }, (resource_id) => {
                    this.plusDisabled = false;
                    this.currentFile = {};
                    this.$refs[this.showType].value = '';
                    if (resource_id) {
                        this.getFileUrl(resource_id).then(res => {
                            if (res.code === 0 && res.content) {
                                if (res.content.url) {
                                    let item = {
                                        name: fileInfo.name,
                                        resource_id,
                                        url: res.content.url
                                    }
                                    this.resourceArr.push(resource_id);
                                    this.fileList.push(item);
                                    this.percent = 0;
                                    window.console.log(this.fileList);
                                    this.$emit('input', this.resourceArr);
                                    this.$emit('change', this.resourceArr);
                                }
                            }
                        })
                    }
                })
            } else {
                this.currentFile = {};
                this.$refs[this.showType].value = '';
            }
        },
        removePic(item, index) {
            this.fileList.splice(index, 1);
            this.resourceArr.splice(index, 1);
            this.$emit('input', this.resourceArr);
            this.$emit('change', this.resourceArr);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/variables.scss";
.ui-file-upload {
    position: relative;
    &-plus {
        width: 100%;
        height: 60px;
        display: flex;
        &__list {
            display: flex;
            &-item {
                position: relative;
                width: 60px;
                height: 60px;
                border: 1px solid #ddd;
                margin-right: 10px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                cursor: pointer;
                overflow: hidden;
                img {
                    max-width: 100%;
                    max-height: 100%;
                }
                .trash-icon {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 60px;
                    background: rgba(0, 0, 0, 0.6);
                    color: $red;
                    font-size: 20px;
                    display: none;
                    z-index: 10;
                }
                &:hover {
                    .trash-icon {
                        display: block;
                    }
                }
            }
        }
        &__btn {
            position: relative;
            width: 60px;
            height: 60px;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            &.error {
                border-color: #f56c6c;
            }
            &:hover {
                border-color: #c0c4cc;
                transition: border-color 0.2s
                    cubic-bezier(0.645, 0.045, 0.355, 1);
                &.error {
                    border-color: #f56c6c;
                }
            }
            input[type="file"] {
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                border: 0;
                text-indent: -9999px;
                z-index: 100;
                background: transparent;
                cursor: pointer;
            }
            &-icon {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                border: 0;
                z-index: 99;
                text-align: center;
                line-height: 60px;
                font-size: 20px;
            }
            &-progress {
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 0;
                background: $theme-color;
            }
        }
        &__tips {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding-left: 5px;
            font-size: 20px;
            color: $theme-color;
        }
    }
    &-oneline {
        width: 100%;
        &__top {
            display: flex;
            justify-content: space-between;
            height: 40px;
            align-items: center;
            .online-top-left {
                flex: 1;
                border: 1px solid $gray;
                border-radius: 2px;
                padding: 0 10px;
                cursor: pointer;
            }
            .online-top-right {
                display: flex;
            }
        }
    }
    &__error {
        position: absolute;
        color: #f56c6c;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
    }
}
</style>
<style lang="scss">
.online-popover {
    .file-container {
        width: 100%;
        .file-item {
            width: 100%;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>