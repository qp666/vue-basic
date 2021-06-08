# 权限管理系统
## 项目介绍
    本项目具有一套通用的权限管理机制，服务于EP停车相关产品的权限模块。
## 技术栈
    vue + axios + scss + jest
## 运行环境相关
> 安装依赖
```
npm install
```
> 开发环境编译
```
npm run dev
```
> 线上环境编译
```
npm run build
```
<!-- > 测试
```
npm run test
```
> 语法检查
```
npm run lint
```
> 单元测试
```
npm run test:unit
```
-->
> 服务器配置
``` 
<!--服务器配置,先配置本地host-->
<!-- 目录和host 可自行根据本地路径进行配置 -->
127.0.0.1 pretender.cn
<!--配置nginx-->
server {
    listen 80;
    set $rootPath '/Users/username/mydata/frontend/UIMS/dist'; 
    root $rootPath;
    index index.html;
    server_name w.eptingche.cn;
    if (!-e $request_filename) {
        rewrite ^/(.*)$ /index.html last;
    }
}

```
> 相关配置
请移步至 [vue-cli相关配置](https://cli.vuejs.org/config/).
### 项目目录结构
```
.
├── README.md                            项目开发说明文档
├── axios.config.js                      后端接口调用axios配置文件
├── babel.config.js                      js规则配置文件
├── design.md                            设计文档
├── jest.config.js                       单元测试框架jest配置
├── package.json                         依赖文件配置
├── public                               静态文件-无需编译
│   ├── favicon.ico                      网页标签图标
│   ├── index.html                       视图承载页面
│   └── js                               全局环境配置
├── src                                  源文件
│   ├── App.vue                          入口文件
│   ├── assets                           静态资源-需编译
│   ├── components                       通用组件
│   ├── const                            通用常量配置
│   ├── directives                       通用指令
│   ├── main.js                          入口配置文件
│   ├── mixins                           通用混入
│   ├── router                           路由管理
│   ├── store                            全局变量管理
│   ├── utils                            通用工具管理
│   └── views                            页面
├── tests                                测试文件
│   └── unit                             单元测试用例
└── vue.config.js                        vue-cli打包相关配置
```
### 命名规范
1. components文件夹下的组件采用大驼峰命名方式，例如：FileUpload、ModuleTree等；

2. view文件夹下的页面文件采用小驼峰命名方式，例如：userMange.vue、roleMange.vue等；

3. 组件样式统一加上"ui-"前缀区分命名空间；

4. 页面样式统一以路由name作为父级class，加上前缀"page-"。

### 格式化

1. 统一采用VSCODE 作为开发IDE；

2. js采用eslint进行管理及格式化；

3. css样式prettier;

4. vue页面采用JS-CSS-HTML Formatter进行管理及格式化。

### 通用配置
1. public/js/config.js     后端授权及API地址、腾讯云COS区域及存储容器等全局配置；
2. src/const/api.js        所有后端API路由
3. src/const/keyValue.js   所有标签所属模块映射关系
4. src/const/filePath.js   腾讯云允许上传的文件夹


