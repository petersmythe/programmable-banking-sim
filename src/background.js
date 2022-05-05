'use strict'

import Store from 'electron-store'
import { setup } from './gui'
import { bootstrap } from './server'
import { ipcMain } from 'electron'

const store = new Store();
if (!store.has('port')) {
  store.set({
    auth: false,
    port: 3001,
    client_id: '',
    client_secret: '',
    token_expiry: 1800,
  });
}

const server = bootstrap(store)
const app = setup(store)

const unsubscribe = store.onDidAnyChange((args) => {
  console.log(args)
  server.listen(args.port, () => console.log(`Programmable banking sim listening on port ${args.port}!`))
})

ipcMain.on("form-submission-event", (event, args) => {
  console.log(args)
  server.listen(args.port, () => {
  console.log(`Programmable banking sim listening on port ${args.port}!`)
  event.reply('status-update', `Programmable banking sim listening on port ${args.port}!`)
  })
});