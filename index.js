const fs = require('fs')
const mime = require('mime-types')
const venom = require('venom-bot')
venom.create().then((client) => start(client))
function start(client) {
client.onMessage(async (message) => {
    if (message.isMedia && (NUMBERS.includes(Number(message.from.match(/\d+/g)[0])) || (GROUPS.includes(Number(message.from.match(/\d+/g)[1]))))) {
      const buffer = await client.decryptFile(message)
      const fileName = `image.${mime.extension(message.mimetype)}`
      await fs.writeFile(fileName, buffer, async (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('File written successfully')
          await client.sendImageAsSticker(message.from, `./${fileName}`)
            .catch((err) => { })
        }
      })
    }
  })
}
