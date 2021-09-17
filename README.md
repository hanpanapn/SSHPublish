# SSHPublish
基于SSH的发布工具


用法：

```js

let ssh = require("./SSHPublish");
 
let res = new ssh({
  host: "0.0.0.0",
  account: "root",
  password: "xxxx",
}).fastPut({
  localPath: "./",
  remotePath: "/home/test/",
  fileName: "test.zip",
});

```
