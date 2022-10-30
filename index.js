const { decryptMedia } = require('@open-wa/wa-automate')
const fs = require('fs')
const venom = require('venom-bot')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
venom.create().then((client) => start(client))
function start(client) {
  client.onMessage(async (message) => {
    if (message.isMedia) {
      const filename = `./input.${message.mimetype.split('/')[1]}`
      fs.writeFileSync(filename, await decryptMedia(message, process.env.UserAgent).catch())
      ffmpeg(filename).size('240x?').aspect('1:1').autopad().fps(30).output('./output.webp').on('end', function () {ffmpeg(filename).size(`240x?`).fps(`${Math.floor(30 * (900000 / fs.statSync('./output.webp').size)) - 1}`).aspect('1:1').autopad().output('./output.webp').on('end', function () {client.sendImageAsStickerGif(message.from, './output.webp')}).run()}).run()
    }
  })
}
