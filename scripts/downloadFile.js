
const fs = require('fs')
const request = require('request')
const rp = require('request-promise')

const getAuthToken = () => {
  const options = {
    method: 'POST',
    uri: `${process.env.ROCKETCHAT_URL}/api/v1/login`,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    body: {
      username: process.env.ROCKETCHAT_USER,
      password: process.env.ROCKETCHAT_PASSWORD
    },
    json: true,
  }
  return rp(options)
}


const downloadFile = (fileDlObj, data) => {
  const {authToken: token, userId: botId } = data
  const options = {
    method: 'GET',
    url: fileDlObj.downloadLink,
    headers:{
        Cookie: `rc_uid=${botId}; rc_token=${token};`
    },
    encoding: null
  }
  return new Promise( (resolve, reject) => {
    request(options, function (error, response, body) {
      error ? reject(`\`@doge\` is having trouble downloading the expense you uploaded:${error}`) : ''

      // ALTERNATE OPTION -> pass just the buffer through resolve
      const buffer = new Buffer(body, 'utf-8')

      // resolve(buffer)

      // Take download buffer and write it into a file
      fs.writeFile(`yourFile${fileDlObj.fileType}`, buffer, (err) => {
        if (err) throw err;

        resolve('I have saved the file')
      });
    })
  })
}

module.exports = (robot) => {
  let listeningForDownload = false
  let fileDlObj = {}

  robot.respond(/(download file)/i, function (msg)  {
    listeningForDownload = true
    return msg.reply('I\'m listening for your file upload!')
  })

  robot.hear(/(.*)/i, function (msg) {
    if (listeningForDownload && msg.message.attachment) {
      fileDlObj.fileType = msg.message.attachment.title.substr(msg.message.attachment.title.length - 4)
      fileDlObj.downloadLink = `${process.env.ROCKETCHAT_URL}${msg.message.attachment.title_link}`

      return getAuthToken()
      .then(resp => downloadFile(fileDlObj, resp.data))
      .then(resp => {
        console.log(resp);
        return msg.reply(resp)
      })
      .catch(error => {
        console.log(`I could not download the file: ${error}`);
        return msg.reply(`I could not download the file: ${error}`)
      })
      listeningForDownload = false
    }
  })


}
