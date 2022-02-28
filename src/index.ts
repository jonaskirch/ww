import qrcode from 'qrcode-terminal';

import { Client, LocalAuth, LegacySessionAuth, NoAuth } from 'whatsapp-web.js';
import { saveSession, getSession } from './sessionPersist';

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

client.on('message', message => {
  // console.log('message',message);
  console.log('msg', message.body);
  if (message.body === 'ping') {
    client.sendMessage(message.from, 'pong');
  }
});

client.initialize();
