const Sftp = require('./SSHPush')



let run = async () => {
    const sftp = new Sftp({
        host: '39.107.97.19',
        account: 'root',
        password: 'Mma090630'
    })
    let status = await sftp.connect()
    if (status) {
        let status_sftp = await sftp.put({
            localPath: './a',
            remotePath: '/home/test/a'
        })
        console.log("upload is :", status_sftp);
    }

    console.log("status", status);
}


run()
