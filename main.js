 

class SSHPublish {
  
  constructor(opt) {
    //constructor是一个构造方法，用来接收参数
    this.host = opt.host;
    this.account = opt.account;
    this.password = opt.password;
    this.chalk = require("chalk");
    this.ssh2 = require("ssh2");
    this.sftp = null;
    this.sshClient = null;
    this.lo;
    this.ssh=null;
  }
  connect() {
    //这是一个类的方法，注意千万不要加上function
    let result = new Promise((resolve, reject) => {
      this.sshClient = new this.ssh2.Client();
      this.sshClient
        .connect({
          host: this.host,
          port: 22,
          username: this.account,
          password: this.password,
        })
        .on("ready", (error, ssh) => {
          this.ssh=ssh
          this.sshClient.sftp((err, sftp) => {
            this.sftp = sftp;
            resolve(true);
          });
        })
        .on("error", (err) => {
          reject(false);
        });
    });
    return result;
  }
  async fastPut(opt) {
    await this.connect();
    let result = new Promise((resolve, reject) => {
      this.sftp.fastPut(
        opt.localPath + opt.fileName,
        opt.remotePath + opt.fileName,
        (err) => {
          this.uploadCallBack(err, opt);
        }
      );
    });
    return result;
  }
  //上传完回调，
  async uploadCallBack(err, opt) {
    if (!err) {
      let res = await this.unzip(opt);
      if (res) {
        console.log(this.chalk.yellow("upload done"));
        this.sshClient.end();
      }
    } else {
    }
  }

  unzip(opt) {
    return new Promise((resolve, reject) => {
      let shellStr = `cd ${opt.remotePath} && unzip -o ${opt.fileName} `;
      //解压
      this.sshClient.exec(shellStr, { ssh: this.ssh }, (err, stdout, stderr) => {
        this.sshClient.exec(`rm -rf ${opt.remotePath + opt.fileName}`, () => {
          resolve(true);
        });
      });
    });
  }
}

module.exports = Person;