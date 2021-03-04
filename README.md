# Dodoco
嘟嘟可在哪里

## 说明

    该项目是[蹦蹦炸弹](https://github.com/ChanIok/JumpyDumpty)的更新管理项目
  
## 实现原理

- 蹦蹦炸弹会访问本仓库的目录的updateResources/latest.json获取新版本信息
  - 目前使用jsdelivr进行了加速，稳定性还未知
- 如果有新的版本，蹦蹦炸弹会获取updateResources/对应版本号下的app.asar.gz和script.js文件，放在程序目录的resources/temp文件夹里面
  - app.asar.gz为源码的压缩包，script.js为更新前后需要执行的脚本
- 随后对app.asar.gz进行解压和MD5校验，此时准备工作已完成
- 在蹦蹦炸弹即将退出时，运行程序目录的Dodoco.exe，替换新版本的app.asar，更新完成

## 已知问题

- 在设计更新方案的时候，不是很想用NSIS打包，所以用了这种蹩脚的方案，这种方法不能改变应用程序的版本信息，但似乎也对实际使用的影响不大?
- 访问jsdeliv时似乎因为缓存导致更新不及时，即使是purge后，并且get的时候加了时间戳参数也不一定有效？

  
