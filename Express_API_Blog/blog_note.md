## webpack

1. 安装 sass npm install sass-loader node-sass --save-dev

2. 配置 webpack.base.conf.js 中的 alias 别名配置路径

3. 代理服务器 
```
  devServer: {
    contentBase: './public', // 本地服务器所加载的页面所在目录
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    proxy: {
      '/api': {
        target: 'http://[::1]:3000',
        secure: false,
        changeOrigin: true
      }
    }
  },
```

4. 打包的时候关闭 sourcemap

## VUE

1. router-link 标签的 tag 属性，可以指定 router-link 最后渲染成什么标签

2. router-link-active 类名

3. 把通用的配置、常量，全部封装成一个 config.js 文件

4. vue 生命周期

5. better-scroll

6. axios 异步请求(ajax)

7. vue-lazyload

8. 可以使用 fastclick 提高移动端的点击性能，降低点击延迟

9. marked 和 reset.css 冲突问题，使用 github-markdown-css 解决

10. vue-bus 做简单状态管理

## JS

1. jsonp

2. 封装jsonp，改写成 promise

## Node.js

1. n nvm 切换 node 版本

2. nrm 切换 npm 镜像源

3. mongodb 数据库 mongoose

4. Robomongo / MongoChef 可视化 MongoDB 管理工具

5. supervisor 重载

6. ejs 模板引擎

7. config-lite 配置文件

8. connect-flash

9. 测试方面 Mocha / supertest / istanbul

10. body-parser 解析 json

11. RESTful 架构

12. connect-mongo express-session 做状态管理

13. express-formidable 提取表单

14. sha1 加密

## 部署

1. 域名服务器、备案

2. 远程登录服务器，并且使用私钥和公钥进行无密码登录

3. 更改端口号，并且禁止使用 root 登录，防火墙配置，阿里云安全组

4. 搭建 nodejs 环境

5. 开启 nginx 反向代理

6. 域名解析

7. mongodb 安装，修改mongodb默认端口号

```
  sudo service mongod start
  mongo --port 27777
  db.createUser({user: 'cenchaochao', pwd: 'chaochao1',
    roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]})
```

8. 创建用户需要先进入 admin 然后登录，再切换到自己想要的数据库进行创建用户

9. 码云私有仓库

10. 放端口要修改防火墙

11. pm2 启动 node 程序

12. ssh root@ip 登录到服务器

13. adduser [name] 添加用户

14. gpasswd -a [name] sudo 将用户添加到 sudo

15. 可以使用 ssh [name]@ip 来登录服务器

16. 使用公钥私钥进行无密码登录

17. 安装 nodejs / nvm / pm2 / nginx

18. 配置 nginx

```
  upstream [appName] {
    server 127.0.0.1:[本机上的端口号]
  }

  server {
    listen 80;
    server_name [服务器ip地址 / 域名];(可以空格分开增加多个例：cenchaochao.com www.cenchaochao.com)

    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-Nginx-Proxy true;

      proxy_pass http://[appName];
      proxy_redirect off;
    }
  }
```

19. 域名解析(二级域名)

20. mongodb配置