import qrcode from 'qrcode-terminal';

import { Client } from 'whatsapp-web.js';

const client = new Client({
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

client.on('message', message => {
  // console.log('message',message);
  console.log('msg', message.body);
  if (message.body == 'ping') {
    client.sendMessage(message.from, 'pong');
  }
});

client.initialize();

console.log('fim 2');
