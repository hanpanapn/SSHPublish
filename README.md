# soldier

## 配置说明

```json
{
   "host": "0.0.0.0",
   "account": "root",
   "password": "xxxx",
   "localPath": "./dist/",
   "remotePath": "/home/test/",
   "fileName": "build.zip"
}
```
运行```soldier push``` 后，会把本地```./dist/```文件夹中的内容压缩成```build.zip```的文件，通过ssh的方式上传到服务器的```/home/test/```目录下


## Install

```bash
$ npm install  soldier --save-dev
```

 