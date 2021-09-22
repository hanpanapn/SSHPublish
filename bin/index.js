#! /usr/bin/env node

const program = require("commander");
const fs = require("fs");
const chalk = require('chalk')
const pkg = require("../package.json");
const SSHPush = require("../lib/SSHPush");
//读取配置文件获取配置信息
let path = "./sshpush.json";
let sshConfig = {};
sshConfig = JSON.parse(fs.readFileSync(path))
 
if (
  !sshConfig||
  !sshConfig.host ||
  !sshConfig.account ||
  !sshConfig.password ||
  !sshConfig.localPath ||
  !sshConfig.remotePath ||
  !sshConfig.fileName
) {
  console.warn(chalk.red.bold("配置信息错误"));
  return;
}

let sshclient = new SSHPush({
  host: sshConfig.host,
  account: sshConfig.account,
  password: sshConfig.password,
});

program.version(pkg.version);

program
  .command("push")
  .description("upload file to target server")
  .action(() => {
    sshclient.fastPut({
      localPath: sshConfig.localPath,
      remotePath: sshConfig.remotePath,
      fileName: sshConfig.fileName,
    });
  });

program.parse(process.argv);
