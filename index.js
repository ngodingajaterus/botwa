const { create, vf } = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const left = require('./lib/left')
const welcome = require('./lib/welcome')
const figlet = require('figlet')
const fs = require('fs-extra')
const ms = require('parse-ms')
const HandleMsg = require('./HandleMsg')

const sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
}

const start = async (unholly = new unholly()) => {
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color(figlet.textSync('UnhollyBot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color('[CREATOR]', 'magenta'), color('Aditya Bayu', 'aqua'))
    console.log(color('[STATUS]', 'magenta'), color('UnhollyBot Actived!', 'aqua'))
    console.log(color('[VERSION]', 'magenta'), color('1.0', 'aqua'))
    unholly.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') unholly.forceRefocus()
        if (state === 'UNPAIRED') unholly.forceRefocus()
    })

    unholly.onAddedToGroup(async (chat) => {
        await unholly.sendText(chat.groupMetadata.id, 'Terima kasih sudah memasukkan bot kedalam grup kalian\nKetik /menu untuk menampilkan command')
    })

    unholly.onGlobalParticipantsChanged((async (heuh) => {
        await welcome(unholly, heuh)
        left(unholly, heuh)
    }))

    unholly.onMessage((message) => {
        unholly.getAmountOfLoadedMessages()
        .then(msg => {
          if (msg >= 3000) {
           unholly.cutMsgCache()
         }
      })
      HandleMsg(unholly, message)
    })

    unholly.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await unholly.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n-bot')
            .then(async () => {
		await sleep(3000)
                // bot akan memblock nomor itu
                await unholly.contactBlock(callData.peerJid)
            })
    })
}
create(options(start))
    .then((unholly) => start(unholly))
    .catch((err) => console.error(err))
