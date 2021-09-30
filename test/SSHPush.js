


const chalk = require('chalk')
const shelljs = require('shelljs')
const ssh2 = require("ssh2");

const host = Symbol("host");
const account = Symbol("account");
const password = Symbol("password");

const sftp = Symbol("sftp");
const sshClient = Symbol("sshClient");


class SSHPush {

  constructor(opt = {}) {
    /**
     * 连接状态，close:关闭，open:开启
     */
    this.status = 'close'

    //constructor是一个构造方法，用来接收参数
    this[host] = opt.host;

    this[account] = opt.account;
    this[password] = opt.password;

    this[sftp] = {};
    this[sshClient] = new ssh2.Client();



  }
  connect() {
    let result = new Promise((resolve, reject) => {
      this[sshClient]
        .connect({
          host: this[host],
          port: 22,
          username: this[account],
          password: this[password],
        })
        .on("ready", async (err, ssh) => {
          console.log(chalk.green('connect is ok'));
          console.log("ssh", ssh);

          this.status = 'open'
          this[sftp] = await this.getSftpClient()
          resolve(true);

        })
        .on("error", (err) => {
          console.log(chalk.bold.red('connect is error:', err.message));
          reject(false);
        });
    });
    return result;
  }
  put(opt) {
    return new Promise(async (resolve, reject) => {
      this[sftp].fastPut(
        opt.localPath,
        opt.remotePath,
        (err) => this.uploadCallBack(err, opt, resolve, reject)
      );
    })
  }
  //上传回调
  uploadCallBack(err, opt, resolve, reject) {
    if (typeof err !== 'undefined') {
      console.log(chalk.red.bold(err));
      reject(false)
    } else {
      resolve(true)
    }

  }
  //获取sftp客户端 应该是私有方法
  getSftpClient() {
    return new Promise((resolve, reject) => {
      this[sshClient].sftp((err, sftp) => {
        resolve(sftp);
      });
    })
  }


}

module.exports = SSHPush;
