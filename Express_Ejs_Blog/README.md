# 一个使用Express和Ejs完成的博客


## 需要创建config/default.js来配置mongodbURL

```
  module.exports = {
    mongodb: 'mongodb://localhost:27017/blog'
  }

  git clone
  开发环境: npm start => supervisor index.js
  生成环境: npm run pm2 => pm2 start app.json
```

### 之前托管在码云的私有仓库，现在我已经完成重构，所以把这份源码共享到github