const shelljs= require('shelljs')

class Utils{
  /**
   *压缩 本地执行
   * @param {String} localPath
   * @param {Object} zipConfig
   */
  zipAtLocal(localPath,zipConfig) {
    let shellStr = `zip -r ${localPath} ./dist/`
    return new Promise((resolve, reject) => {
      shelljs.exec(shellStr);
      resolve(true);
    });
  }
  /**
   *
   * @param {*} sshClient ssh客户端
   * @param {} str shell脚本
   */
  runShellAtServer(sshClient,str) {
    return new Promise((resolve, reject) => {
      sshClient.exec(str, (err) => {
        resolve(true);
      });
    });
  }
  //解压 服务器端执行
  unzipAtServer(remotePath,) {
    return new Promise(async (resolve, reject) => {
      let makeZipShell = ` unzip -o ${remotePath}
      && mv ./dist/* ./ && rm -rf ./dist
      && rm -rf ${remotePath}`;
      await this.runShellAtServer(makeZipShell)
    });
  }
}

