# heimamm_example

## 2019-12-28 

### 后端调整

1. 学科模块
   1. 移除学科编号字段
   2. 阶段与学科树形（一级）
2. 企业模块
   1. 移除企业编号字段
   2. 增加城市字段，城市名即可
3. 题库模块
   1. 移除城市字段
   2. 搜索时间增加范围
4. 登录模块
   1. 用户登录支持邮箱，手机号，用户名
   2. 错误提示不要精确到字段
   3. 已被删除的用户无法登录
5. 刷题模块
   1. 随机刷题接口
      1. 请求方法:get
      2. 请求参数:已刷id
      3. 返回值:
         1. 状态码
         2. 试题

### 前端

1. 刷题模块逻辑
   1. 随机刷题
      1. 获取随机不重复试题
      2. 点击提交
         1. 正确:提示进入下一题
         2. 错误:提示答案，及解析
   2. 考试:
      1. 选择题目数
      2. 点击提交
         1. 正确:提示进入下一题
         2. 错误:提示答案，及解析
      3. 答题完毕
         1. 统计份数
         2. 结束:
         3. 继续答题:



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
