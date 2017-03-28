# webapp demo html5 简介

## 工程初始化

### 开发模式部署
#### 工程初始化
- 开发环境前端实时编译
    - 本示例demo使用webpack + babel作为前端模块化管理和打包工具
        - 执行 npm install 安装相关依赖（仅需在工程第一次初始化时运行）
        - 执行 npm install postcss-cli -g 全局安装postcss命令，用于demo皮肤及个性化样式生成
        - 执行 npm run dev 运行工程打包工作
- 开发环境后端服务
    - 本示例demo使用nodejs作为示例后台服务编程语言
        - 执行 node server 运行后台服务，默认端口为2001，可在main.js文件中修改
        - 浏览器访问http://localhost:2001/index.html

- 开发环境真机调试
	- 执行 npm install weinre -g
	- 进入demo根目录，执行 weinre --httpPort 2002 -boundHost -all-
	- 获取本电脑局域网ip地址(同一路由器网段也可以)，如：192.168.0.146
	- 在index.html文件中加入：
		``` html
		<!-- 192.168.0.146 为举例，填写开发者的局域网IP地址 --> 
		<script src="http://192.168.0.146:8081/target/target-script-min.js#anonymous"></script>
		```
	- 手机访问，例如：http://192.168.0.146:2001网址即可真机调试(此网址为工程web服务地址)
	- [参考资料](https://www.npmjs.com/package/weinre)