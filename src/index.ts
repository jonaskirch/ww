import qrcode from 'qrcode-terminal';

import {
  Client,
  LocalAuth,
  LegacySessionAuth,
  NoAuth,
  MessageMedia,
} from 'whatsapp-web.js';
import { saveSession, getSession, removeSession } from './sessionPersist';

const client = new Client({
  // session: getSession(),
  authStrategy: new LegacySessionAuth({
    session: getSession(),
  }),
  puppeteer: {
    // headless: true,
    // timeout: 99999999,
    // args: [
    //   '--no-sandbox',
    //   '--use-gl=swiftshade',
    //   '--disable-software-rasterizer',
    //   '--disable-dev-shm-usage',
    // ],
    // executablePath: "/usr/bin/chromium-browser",
    // ignoreDefaultArgs: ['--disable-extensions'],
  },
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('authenticated', session => {
  saveSession(session);
});

client.on('auth_failure', msg => {
  console.log('Authenticate failure', msg);
  removeSession();
  client.initialize();
});

client.on('change_state', state => {
  console.log('CHANGE STATE', state);
});

client.on('disconnected', reason => {
  console.log('Client was logged out', reason);
});

client.on('message', async message => {
  console.log(message.body);
  if (message.body === '!ping') {
    client.sendMessage(message.from, 'pong');
  }
  if (message.body === '!imageurl') {
    client.sendMessage(
      message.from,
      await MessageMedia.fromUrl('https://picsum.photos/200', {
        unsafeMime: true,
      }),
    );
  }
  if (message.body === '!imagepath') {
    client.sendMessage(
      message.from,
      await MessageMedia.fromFilePath('./src/data/testimage.jpeg'),
    );
  }
});

client.on('message_create', message => {
  if (message.fromMe) {
    console.log(`EU: ${message.body}`);
  }
});

// client.on('message_ack', (msg, ack) => {
//   /*
//       == ACK VALUES ==
//       ACK_ERROR: -1
//       ACK_PENDING: 0
//       ACK_SERVER: 1
//       ACK_DEVICE: 2
//       ACK_READ: 3
//       ACK_PLAYED: 4
//   */
//   console.log(ack);
//   if (ack === 3) {
//     // The message was read
//   }
// });

client.initialize();
